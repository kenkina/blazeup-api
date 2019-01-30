import mongoose from 'mongoose';

import { User } from '../routes/users/user-model';

const config = require('./config.json');


mongoose.connect(process.env.MONGODB_URI || config.connectionString, { useNewUrlParser: true });
mongoose.Promise = global.Promise;


export { User };