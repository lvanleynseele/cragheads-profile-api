import { ObjectId } from 'mongodb';
import Likes, { Like } from '../../../Models/Posts/Post.Like';
import postsService from './profile.posts.service';
import Posts from '../../../Models/Posts/Post';

const findByPostId = async (postId: ObjectId | string) => {
  try {
    const likes = await Posts.aggregate([
      {
        $match: {
          _id: new ObjectId(postId),
        },
      },
      {
        $unwind: '$likeIds',
      },
      {
        $addFields: {
          likeId: {
            $toObjectId: '$likeIds',
          },
        },
      },
      {
        $lookup: {
          from: 'likes',
          localField: 'likeId',
          foreignField: '_id',
          as: 'likes',
        },
      },
    ]);

    return likes.flatMap(post => post.likes);
  } catch (error) {
    throw error;
  }
};

const find = async () => {
  try {
    const comments = await Likes.find();

    return comments;
  } catch (error) {
    throw error;
  }
};

const didLike = async (
  postId: string | ObjectId,
  userId: string | ObjectId,
): Promise<boolean> => {
  try {
    //current quesy not returning any results even though they exist
    // const didLike = await Likes.exists({
    //   postId: new ObjectId(postId),
    //   userId: new ObjectId(userId),
    // });

    const likes = await Posts.aggregate([
      {
        $match: {
          _id: new ObjectId(postId),
        },
      },
      {
        $unwind: '$likeIds',
      },
      {
        $addFields: {
          likeId: {
            $toObjectId: '$likeIds',
          },
        },
      },
      {
        $lookup: {
          from: 'likes',
          localField: 'likeId',
          foreignField: '_id',
          as: 'likes',
        },
      },
    ]);

    const didLike = likes
      .flatMap(post => post.likes)
      .find(like => like.userId.toString() === userId.toString());

    return didLike == null ? false : true;
  } catch (error) {
    throw error;
  }
};

const addLike = async (like: Like) => {
  try {
    await Likes.validate(like);
    const alreadyLiked = await didLike(like.postId, like.userId);
    if (alreadyLiked) {
      throw new Error('Already liked');
    }

    const result = await Likes.collection.insertOne(like);
    await postsService.addLike(like.postId, result.insertedId);
    return result;
  } catch (error) {
    throw error;
  }
};

const deleteLike = async (likeId: ObjectId | string) => {
  try {
    const result = await Likes.findByIdAndDelete({ _id: new ObjectId(likeId) });

    if (result) {
      await postsService.removeLike(result.postId, likeId);
    } else {
      throw new Error('Like not found');
    }

    return result;
  } catch (error) {
    throw error;
  }
};

const likesService = {
  findByPostId,
  find,
  addLike,
  deleteLike,
  didLike,
};

export default likesService;
