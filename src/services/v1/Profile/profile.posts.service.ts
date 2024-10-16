import { ObjectId } from 'mongodb';
import { collections } from '../../utility/database.service';
import Posts, { Post } from '../../../Models/Posts/Post';
import profileService from './profile.service';

const findByPostId = async (postId: string | ObjectId) => {
  const post = await Posts.findById(new ObjectId(postId));
  return post;
};

const findByProfileId = async (profileId: string | ObjectId) => {
  const profile = await profileService.findProfileById(profileId);

  const posts: Post[] = [];

  if (profile && profile.postIds) {
    await Promise.all(
      profile.postIds.map(async postId => {
        const post = await findByPostId(postId);
        if (post) {
          posts.push(post);
        }
      }),
    );
  }

  posts.sort((a, b) => {
    return b.date.getDate() - a.date.getDate();
  });

  return posts;
};

const findAllPosts = async () => {
  return await Posts.find({});
};

const addPost = async (post: Post) => {
  await Posts.validate(post);

  const result = await Posts.collection.insertOne(post);

  const profileId = post.userId;
  if (profileId) {
    await profileService.addPost(profileId, result.insertedId);
  }

  return result;
};

const updatePost = async (id: string | ObjectId, post: Post) => {
  await Posts.validate(post);
  return await Posts.updateOne({ _id: new ObjectId(id) }, { $set: post });
};

const deletePost = async (
  id: string | ObjectId,
  profileId: string | ObjectId,
) => {
  const result = await Posts.deleteOne({
    _id: new ObjectId(id),
  });

  await profileService.removePost(profileId, id);

  return result;
};

const addLike = async (
  postId: string | ObjectId,
  likeId: string | ObjectId,
) => {
  await Posts.updateOne(
    { _id: new ObjectId(postId) },
    { $addToSet: { likeIds: likeId } },
  );
};

const removeLike = async (
  postId: string | ObjectId,
  likeId: string | ObjectId,
) => {
  await Posts.updateOne(
    { _id: new ObjectId(postId) },
    { $pull: { likeIds: new ObjectId(likeId) } as any },
  );
};

const addComment = async (
  postId: string | ObjectId,
  commentId: string | ObjectId,
) => {
  await Posts.updateOne(
    { _id: new ObjectId(postId) },
    { $addToSet: { commentIds: commentId } },
  );
};

const removeComment = async (
  postId: string | ObjectId,
  commentId: string | ObjectId,
) => {
  await Posts.updateOne(
    { _id: new ObjectId(postId) },
    { $pull: { commentIds: new ObjectId(commentId) } as any },
  );
};

const postsService = {
  findByPostId,
  findByProfileId,
  findAllPosts,
  addPost,
  updatePost,
  deletePost,
  addLike,
  removeLike,
  addComment,
  removeComment,
};

export default postsService;
