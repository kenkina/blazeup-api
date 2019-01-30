import { productService } from './product.service';
import { stringToStringArray, stringNumberToNumberArray } from '../../helpers/string-utils';


const create = (req, res, next) => {
  productService.create(req.body)
    .then((product) => res.json(product))
    .catch(err => next(err));
}

const getAll = (req, res, next) => {
  const { sort, range, filter } = req.query;
  const querySort = sort ? stringToStringArray(sort) : ['name', 'ASC'];
  const queryRange = range ? stringNumberToNumberArray(range) : [0, 9];
  const queryFilter = filter ? JSON.parse(filter) : { 'q': '' };

  productService.getAll(querySort, queryRange, queryFilter)
    .then(({ products, count }) => {
      res.set({
        'Content-Range': `products ${queryRange[0]}-${queryRange[1]}/${count}`,
        'Access-Control-Expose-Headers': 'Content-Range'
      });
      res.json(products)
    })
    .catch(err => next(err));
}

const getCurrent = (req, res, next) => {
  productService.getById(req.product.sub)
    .then(product => product ? res.json(product) : res.sendStatus(404))
    .catch(err => next(err));
}

const getById = (req, res, next) => {
  productService.getById(req.params.id)
    .then(product => product ? res.json(product) : res.sendStatus(404))
    .catch(err => next(err));
}

const update = (req, res, next) => {
  productService.update(req.params.id, req.body)
    .then((product) => res.json(product))
    .catch(err => next(err));
}

const _delete = (req, res, next) => {
  productService.delete(req.params.id)
    .then((product) => res.json(product))
    .catch(err => next(err));
}


export const productController = {
  create,
  getAll,
  getCurrent,
  getById,
  update,
  delete: _delete
};