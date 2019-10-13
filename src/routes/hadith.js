import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
  const hadiths = await req.context.models.Hadith.find();
  return res.send(hadiths);
});

router.get('/:hadithId', async (req, res) => {
  const hadith = await req.context.models.Hadith.findById(
    req.params.hadithId,
  );
  return res.send(hadith);
});

router.post('/', async (req, res) => {
  const hadith = await req.context.models.Hadith.create({
    text_ar: req.body.text_ar,
    text_en: req.body.text_en,
    text_fr: req.body.text_fr,
    isnad_ar: req.body.isnad_ar,
  });
  return res.send(hadith);
});

router.delete('/:hadithId', async (req, res) => {
  const hadith = await req.context.models.Hadith.findById(
    req.params.hadithId,
  );
  let result = null;
  if (hadith) {
    result = await hadith.remove();
  }
  return res.send(result);
});

export default router;