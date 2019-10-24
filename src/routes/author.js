import { Router } from 'express';
import auth from '../middleware/auth';

const router = Router();

router.get('/', async (req, res) => {
  const authors = await req.context.models.Author.find();
  return res.send(authors);
});

router.get('/:authorId', async (req, res) => {
  const author = await req.context.models.Author.findById(
    req.params.authorId,
  );
  return res.send(author);
});

router.post('/', auth, async (req, res) => {
  const author = await req.context.models.Author.create({
    shortname: req.body.shortname,
    longname: req.body.longname,
  });
  return res.send(author);
});

router.delete('/:authorId', auth, async (req, res) => {
  const author = await req.context.models.Author.findById(
    req.params.authorId,
  );
  let result = null;
  if (author) {
    result = await author.remove();
  }
  return res.send(result);
});

export default router;