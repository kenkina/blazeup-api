import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  description: { type: String, required: true },
  createdDate: { type: Date, default: Date.now }
});

schema.set('toJSON', { virtuals: true });

export const Category = mongoose.model('Category', schema);