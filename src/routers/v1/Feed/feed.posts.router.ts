import express from 'express';
import feedPostsService from '../../../services/v1/Feed/feed.posts.service';

const feedPostsRouter = express.Router();
feedPostsRouter.use(express.json());

feedPostsRouter.get('/by-profile/:id', async (req, res) => {
  try {
    const profileId = req.params.id;
    const posts = await feedPostsService.getPostsForUser(profileId);
    res.status(200).send(posts);
  } catch (error) {
    res.status(500).send(error);
  }
});

feedPostsRouter.get('/by-id/:id', async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await feedPostsService.getPostById(postId);
    res.status(200).send(post);
  } catch (error) {
    res.status(500);
  }
});

export default feedPostsRouter;
