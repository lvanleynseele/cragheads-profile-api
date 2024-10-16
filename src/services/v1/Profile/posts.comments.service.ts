import { ObjectId } from 'mongodb';
import Comments, { Comment } from '../../../Models/Posts/Post.Comment';
import postsService from './profile.posts.service';
import Posts from '../../../Models/Posts/Post';

const findByPostId = async (postId: ObjectId | string) => {
  try {
    const comments = await Posts.aggregate([
      {
        $match: {
          _id: new ObjectId(postId),
        },
      },
      {
        $unwind: '$commentIds',
      },
      {
        $addFields: {
          commentId: {
            $toObjectId: '$commentIds',
          },
        },
      },
      {
        $lookup: {
          from: 'comments',
          localField: 'commentId',
          foreignField: '_id',
          as: 'comments',
        },
      },
    ]);

    return comments.flatMap(post => post.comments);
  } catch (error) {
    throw error;
  }
};

const findById = async (commentId: ObjectId | string) => {
  try {
    const comment = await Comments.findById(new ObjectId(commentId));

    return comment;
  } catch (error) {
    throw error;
  }
};

const find = async () => {
  try {
    const comments = await Comments.find();

    return comments;
  } catch (error) {
    throw error;
  }
};

const addComment = async (comment: Comment) => {
  try {
    await Comments.validate(comment);

    const result = await Comments.collection.insertOne(comment);

    await postsService.addComment(comment.postId, result.insertedId);

    return result;
  } catch (error) {
    throw error;
  }
};

const updateComment = async (
  commentId: ObjectId | string,
  comment: Comment,
) => {
  try {
    await Comments.validate(comment);

    const result = await Comments.updateOne(
      { _id: new ObjectId(commentId) },
      comment,
    );

    return result;
  } catch (error) {
    throw error;
  }
};

const deleteComment = async (commentId: ObjectId | string) => {
  try {
    const result = await Comments.findByIdAndDelete({
      _id: new ObjectId(commentId),
    });

    if (result) {
      await postsService.removeComment(result.postId, commentId);
    } else {
      throw new Error('Comment not found');
    }

    return result;
  } catch (error) {
    throw error;
  }
};

const postsCommentService = {
  findByPostId,
  findById,
  find,
  addComment,
  updateComment,
  deleteComment,
};

export default postsCommentService;
