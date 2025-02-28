import express from 'express';
import logger from '../../utils/logger';
import profileRouter from './Profile/profile.router';

const mainRouter = express.Router();

mainRouter.use((req, res, next) => {
  logger.info(`Request URL [${req.method}] ${req.originalUrl}`);
  next();
});

mainRouter.get('/health', (req, res) => {
  res.status(200).send('OK');
});

mainRouter.use('/profile', profileRouter);

export default mainRouter;
