import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import errorHandler from './helpers/error-handlers';

import routes from './routes';
import models, { connectDb } from './models';

const app = express();

// adding Helmet to enhance API's security
app.use(helmet());
// enabling CORS for all requests
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// adding morgan to log HTTP requests
app.use(morgan('combined'));

// Custom middleware
app.use((req, res, next) => {
  req.context = {
    models,
  };
  next();
});

// Routes
app.use('/users', routes.user);
app.use('/hadiths', routes.hadith);
app.use('/comments', routes.comment);
app.use('/authors', routes.author);

// Error handling
app.use(errorHandler);

connectDb().then(async () => {
  app.listen(process.env.PORT, () =>
    console.log(`Example app listening on port ${process.env.PORT}!`),
  );
});

const createData = async () => {
  const author1 = new models.Author({
    shortname: 'محمد ناصر الدين الألباني',
    longname: 'أبو عبد الرحمن محمد بن الحاج نوح بن نجاتي بن آدم الأشقودري الألباني الأرنؤوطي',
  });
  const hadith1 = new models.Hadith({
    text_ar: 'عن معاذ بن أنس الجهني رضي الله عنه قال النّبي صلّى الله عليه و سلّم : مَنْ كظمَ غيظًا وهو قادِرٌ علَى أنْ يُنْفِذَهُ دعاه اللهُ علَى رؤوسِ الخلائِقِ حتّى يُخَيِّرَهُ مِنَ الحورِ العينِ يزوِّجَهُ منها ما يشاءُ',
  });
  const comment1 = new models.Comment({
    text: 'صحيح',
    author: author1.id,
    hadith: hadith1.id,
  });
  await author1.save();
  await hadith1.save();
  await comment1.save();
};