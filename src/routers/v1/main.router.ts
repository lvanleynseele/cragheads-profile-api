import express from 'express';
import logger from '../../utils/logger';
import profileRouter from './Profile/profile.router';
import feedPostsRouter from './Feed/feed.posts.router';

const mainRouter = express.Router();

mainRouter.use((req, res, next) => {
  logger.info(`Request URL [${req.method}] ${req.originalUrl}`);
  next();
});

mainRouter.use('/profile', profileRouter);
mainRouter.use('/feed/posts', feedPostsRouter);

export default mainRouter;
