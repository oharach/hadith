import mongoose from 'mongoose';

const hadithSchema = new mongoose.Schema({
  text_ar: {
    type: String,
    required: true,
    unique: true,
  },
  text_fr: {
    type: String,
    required: false,
  },
  text_en: {
    type: String,
    required: false,
  },
  isnad_ar: {
    type: String,
    required: false,
  },
});

hadithSchema.pre('remove', function(next) {
  this.model('Comment').deleteMany({ hadith: this._id }, next);
});

const Hadith = mongoose.model('Hadith', hadithSchema);
export default Hadith;