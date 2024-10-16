import express from 'express';
import postsService from '../../../services/v1/Profile/profile.posts.service';
import { Post } from '../../../Models/Posts/Post';
import postsCommentRouter from './profile.posts.comments.router';
import postsLikeRouter from './profile.posts.likes.router';

const postsRouter = express.Router();
postsRouter.use(express.json());

postsRouter.use('/comments', postsCommentRouter);
postsRouter.use('/likes', postsLikeRouter);

postsRouter.get('/by-profile/:profileId', async (req, res) => {
  try {
    const profileId = req.params.profileId;
    const posts = await postsService.findByProfileId(profileId);

    res.status(200).send(posts);
  } catch (error) {
    res.status(500).send(error);
  }
});

postsRouter.get('/by-id/:postId', async (req, res) => {
  try {
    const postId = req.params.postId;
    const post = await postsService.findByPostId(postId);

    res.status(200).send(post);
  } catch (error) {
    res.status(500).send(error);
  }
});

postsRouter.get('/', async (req, res) => {
  try {
    const posts = await postsService.findAllPosts();
    res.status(200).send(posts);
  } catch (error) {
    res.status(500).send(error);
  }
});

postsRouter.post('/', async (req, res) => {
  try {
    const result = await postsService.addPost(req.body);
    res.status(201).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

postsRouter.put('/:postId', async (req, res) => {
  try {
    const post = req.body;
    const result = await postsService.updatePost(req.params.postId, post);

    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

postsRouter.delete('/:profileId/:postId', async (req, res) => {
  try {
    const postId = req.params.postId;
    const profileId = req.params.profileId;
    const result = await postsService.deletePost(postId, profileId);

    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default postsRouter;
