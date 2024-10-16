import express from 'express';
import likesService from '../../../services/v1/Profile/posts.likes.service';
import postsRouter from './profile.posts.router';

const postsLikeRouter = express.Router();
postsLikeRouter.use(express.json());

postsLikeRouter.get('/by-post/:postId', async (req, res) => {
  try {
    const postId = req.params.postId;
    const comments = await likesService.findByPostId(postId);

    res.status(200).send(comments);
  } catch (error) {
    res.status(500).send(error);
  }
});

postsLikeRouter.get('/', async (req, res) => {
  try {
    const comments = await likesService.find();
    res.status(200).send(comments);
  } catch (error) {
    res.status(500).send(error);
  }
});

postsLikeRouter.post('/', async (req, res) => {
  try {
    const comment = req.body;
    const result = await likesService.addLike(comment);

    res.status(201).send(result);
  } catch (error) {
    if ((error as Error).message == 'Already liked') {
      res.status(400).send(error);
    }

    res.status(500).send(error);
  }
});

postsLikeRouter.delete('/:likeId', async (req, res) => {
  try {
    const result = await likesService.deleteLike(req.params.likeId);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

postsLikeRouter.get('/did-like/:postId/:userId', async (req, res) => {
  try {
    const postId = req.params.postId;
    const userId = req.params.userId;
    const didLike = await likesService.didLike(postId, userId);

    res.status(200).send(didLike);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default postsLikeRouter;
