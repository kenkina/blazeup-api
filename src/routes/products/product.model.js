import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  createdDate: { type: Date, default: Date.now }
});

schema.set('toJSON', { virtuals: true });

export const Product = mongoose.model('Product', schema);