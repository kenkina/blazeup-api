import mongoose from 'mongoose';

import { User } from '../routes/users/user.model';
import { Category } from '../routes/categories/category.model';
import { Product } from '../routes/products/product.model';

const config = require('./config.json');


mongoose.connect(process.env.MONGODB_URI || config.connectionString, { useNewUrlParser: true });
mongoose.Promise = global.Promise;


export { User, Category, Product };