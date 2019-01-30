import { categoryService } from './category.service';
import { stringToStringArray, stringNumberToNumberArray } from '../../helpers/string-utils';


const create = (req, res, next) => {
  categoryService.create(req.body)
    .then((category) => res.json(category))
    .catch(err => next(err));
}

const getAll = (req, res, next) => {
  const { sort, range, filter } = req.query;
  const querySort = sort ? stringToStringArray(sort) : ['name', 'ASC'];
  const queryRange = range ? stringNumberToNumberArray(range) : [0, 9];
  const queryFilter = filter ? JSON.parse(filter) : { "q": "" };

  categoryService.getAll(querySort, queryRange, queryFilter)
    .then(({ categories, count }) => {
      res.set({
        'Content-Range': `categories ${queryRange[0]}-${queryRange[1]}/${count}`,
        'Access-Control-Expose-Headers': 'Content-Range'
      });
      res.json(categories)
    })
    .catch(err => next(err));
}

const getCurrent = (req, res, next) => {
  categoryService.getById(req.category.sub)
    .then(category => category ? res.json(category) : res.sendStatus(404))
    .catch(err => next(err));
}

const getById = (req, res, next) => {
  categoryService.getById(req.params.id)
    .then(category => category ? res.json(category) : res.sendStatus(404))
    .catch(err => next(err));
}

const update = (req, res, next) => {
  categoryService.update(req.params.id, req.body)
    .then((category) => res.json(category))
    .catch(err => next(err));
}

const _delete = (req, res, next) => {
  categoryService.delete(req.params.id)
    .then((category) => res.json(category))
    .catch(err => next(err));
}


export const categoryController = {
  create,
  getAll,
  getCurrent,
  getById,
  update,
  delete: _delete
};