import express from 'express';
import postsCommentService from '../../../services/v1/Profile/posts.comments.service';

const postsCommentRouter = express.Router();
postsCommentRouter.use(express.json());

postsCommentRouter.get('/by-post/:postId', async (req, res) => {
  try {
    const postId = req.params.postId;
    const comments = await postsCommentService.findByPostId(postId);

    res.status(200).send(comments);
  } catch (error) {
    res.status(500).send(error);
  }
});

postsCommentRouter.get('/by-id/:commentId', async (req, res) => {
  try {
    const commentId = req.params.commentId;
    const comment = await postsCommentService.findById(commentId);

    res.status(200).send(comment);
  } catch (error) {
    res.status(500).send(error);
  }
});

postsCommentRouter.get('/', async (req, res) => {
  try {
    const comments = await postsCommentService.find();
    res.status(200).send(comments);
  } catch (error) {
    res.status(500).send(error);
  }
});

postsCommentRouter.post('/', async (req, res) => {
  try {
    const comment = req.body;
    const result = await postsCommentService.addComment(comment);

    res.status(201).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

postsCommentRouter.put('/:commentId', async (req, res) => {
  try {
    const comment = req.body;
    const result = await postsCommentService.updateComment(
      req.params.commentId,
      comment,
    );

    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

postsCommentRouter.delete('/:commentId', async (req, res) => {
  try {
    const result = await postsCommentService.deleteComment(
      req.params.commentId,
    );

    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default postsCommentRouter;
