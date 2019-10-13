import { Router } from 'express';
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

router.post('/', async (req, res) => {
  const author = await req.context.models.Author.create({
    shortname: req.body.shortname,
    longname: req.body.longname,
  });
  return res.send(author);
});

router.delete('/:authorId', async (req, res) => {
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