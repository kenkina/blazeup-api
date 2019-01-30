import bcrypt from 'bcryptjs';

import { Product } from '../../helpers/database';


const create = async (productParam) => {
  if (await Product.findOne({ name: productParam.name })) {
    throw 'Product name "' + productParam.name + '" is already taken';
  }

  const product = new Product(productParam);
  if (productParam.password) {
    product.hash = bcrypt.hashSync(productParam.password, 10);
  }

  return await product.save();
}

const getAll = async (sort, range, filter) => {
  const count = await Product.estimatedDocumentCount();
  const q = new RegExp(filter.q, 'i');
  delete filter.q;

  let query;

  if (filter) {
    query = Product.find({
      $and: [
        {
          $or: [
            { name: q },
            { description: q }
          ]
        },
        filter
      ]
    });
  } else {
    query = Product.find({
      $or: [
        { name: q },
        { description: q }
      ]
    })
  }

  const products = await query
    .sort(sort[1] === 'ASC' ? sort[0] : '-' + sort[0])
    .skip(range[0])
    .limit(range[1] - range[0] + 1);
  //.select('-hash');

  return { products, count };
}

const getById = async (id) => {
  return await Product.findById(id).select('-hash');
}

const update = async (id, productParam) => {
  const product = await Product.findById(id);

  if (!product)
    throw 'Product not found';
  if (product.name !== productParam.name && await Product.findOne({ name: productParam.name })) {
    throw 'Product name "' + productParam.name + '" is already taken';
  }

  if (productParam.password) {
    productParam.hash = bcrypt.hashSync(productParam.password, 10);
  }

  Object.assign(product, productParam);

  return await product.save();
}

const _delete = async (id) => {
  return await Product.findByIdAndRemove(id);
}


export const productService = {
  create,
  getAll,
  getById,
  update,
  delete: _delete
};