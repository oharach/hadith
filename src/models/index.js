import mongoose from 'mongoose';
import User from './user';
import Author from './author';
import Hadith from './hadith';
import Comment from './comment';

const connectDb = () => {
  return mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true});
};
const models = { User, Author, Hadith, Comment };

export { connectDb };
export default models;