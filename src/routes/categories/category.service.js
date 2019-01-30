import bcrypt from 'bcryptjs';

import { Category } from '../../helpers/database';


const create = async (categoryParam) => {
  if (await Category.findOne({ name: categoryParam.name })) {
    throw 'Category name "' + categoryParam.name + '" is already taken';
  }

  const category = new Category(categoryParam);
  if (categoryParam.password) {
    category.hash = bcrypt.hashSync(categoryParam.password, 10);
  }

  return await category.save();
}

const getAll = async (sort, range, filter) => {
  const count = await Category.estimatedDocumentCount();
  const q = new RegExp(filter.q, 'i');

  const categories = await Category.find({
    $or: [
      { name: q },
      { description: q }
    ]
  }).sort(sort[1] === 'ASC' ? sort[0] : '-' + sort[0])
    .skip(range[0])
    .limit(range[1] - range[0] + 1);
  //.select('-hash');

  return { categories, count };
}

const getById = async (id) => {
  return await Category.findById(id).select('-hash');
}

const update = async (id, categoryParam) => {
  const category = await Category.findById(id);

  if (!category)
    throw 'Category not found';
  if (category.name !== categoryParam.name && await Category.findOne({ name: categoryParam.name })) {
    throw 'Category name "' + categoryParam.name + '" is already taken';
  }

  if (categoryParam.password) {
    categoryParam.hash = bcrypt.hashSync(categoryParam.password, 10);
  }

  Object.assign(category, categoryParam);

  return await category.save();
}

const _delete = async (id) => {
  return await Category.findByIdAndRemove(id);
}


export const categoryService = {
  create,
  getAll,
  getById,
  update,
  delete: _delete
};