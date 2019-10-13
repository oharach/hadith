import { Router } from 'express';
const router = Router();

router.get('/', async (req, res) => {
  const comments = await req.context.models.Comment.find();
  return res.send(comments);
});

router.get('/:commentId', async (req, res) => {
  const comment = await req.context.models.Comment.findById(
    req.params.commentId,
  );
  return res.send(comment);
});

router.post('/', async (req, res) => {
  const comment = await req.context.models.Comment.create({
    text: req.body.text,
    author: req.body.author,
    hadith: req.body.hadith,
  });
  return res.send(comment);
});

router.delete('/:commentId', async (req, res) => {
  const comment = await req.context.models.Comment.findById(
    req.params.commentId,
  );
  let result = null;
  if (comment) {
    result = await comment.remove();
  }
  return res.send(result);
});

export default router;