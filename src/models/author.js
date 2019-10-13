import mongoose from 'mongoose';

const authorSchema = new mongoose.Schema({
  shortname: {
    type: String,
    unique: true,
    required: true,
  },
  longname: {
    type: String,
    unique: true,
    required: false,
  },
});

authorSchema.pre('remove', function(next) {
  this.model('Comment').deleteMany({ author: this._id }, next);
});

const Author = mongoose.model('Author', authorSchema);
export default Author;