import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import { User } from '../../helpers/database';

const config = require('../../helpers/config.json');


const authenticate = async ({ username, password }) => {
  const user = await User.findOne({ username });
  if (user && bcrypt.compareSync(password, user.hash)) {
    const token = jwt.sign({ sub: user.id }, config.jwtSecret, { expiresIn: config.expiresIn });
    return {
      username: user.toObject().username,
      token
    };
  }
}

const create = async (userParam) => {
  if (await User.findOne({ username: userParam.username })) {
    throw 'Username "' + userParam.username + '" is already taken';
  }

  const user = new User(userParam);
  if (userParam.password) {
    user.hash = bcrypt.hashSync(userParam.password, 10);
  }

  return await user.save();
}

const getAll = async (sort, range, filter) => {
  const count = await User.estimatedDocumentCount();
  const q = new RegExp(filter.q, 'i');

  const users = await User.find({
    $or: [
      { username: q },
      { firstName: q },
      { lastName: q }
    ]
  }).sort(sort[1] === 'ASC' ? sort[0] : '-' + sort[0])
    .skip(range[0])
    .limit(range[1] - range[0] + 1)
    .select('-hash');

  return { users, count };
}

const getById = async (id) => {
  return await User.findById(id).select('-hash');
}

const update = async (id, userParam) => {
  const user = await User.findById(id);

  if (!user)
    throw 'User not found';
  if (user.username !== userParam.username && await User.findOne({ username: userParam.username })) {
    throw 'Username "' + userParam.username + '" is already taken';
  }

  if (userParam.password) {
    userParam.hash = bcrypt.hashSync(userParam.password, 10);
  }

  Object.assign(user, userParam);

  return await user.save();
}

const _delete = async (id) => {
  return await User.findByIdAndRemove(id);
}


export const userService = {
  authenticate,
  create,
  getAll,
  getById,
  update,
  delete: _delete
};