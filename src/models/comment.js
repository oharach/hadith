import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author' },
  hadith: { type: mongoose.Schema.Types.ObjectId, ref: 'Hadith' },
});
const Comment = mongoose.model('Comment', commentSchema);
export default Comment;