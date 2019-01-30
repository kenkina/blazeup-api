import { userService } from './users-service';
import { stringToStringArray, stringNumberToNumberArray } from '../../helpers/string-utils';


const authenticate = (req, res, next) => {
  userService.authenticate(req.body)
    .then(user => user ?
      res.json(user) :
      res.status(401).json({ message: 'Username or password is incorrect' }))
    .catch(err => { next(err) });
}

const register = (req, res, next) => {
  userService.create(req.body)
    .then(() => res.json({}))
    .catch(err => next(err));
}

const getAll = (req, res, next) => {
  const { sort, range, filter } = req.query;
  const querySort = sort ? stringToStringArray(sort) : ['username', 'ASC'];
  const queryRange = range ? stringNumberToNumberArray(range) : [0, 9];
  const queryFilter = filter ? JSON.parse(filter) : { "q": "" };

  userService.getAll(querySort, queryRange, queryFilter)
    .then(({ users, count }) => {
      res.set({
        'Content-Range': `users ${queryRange[0]}-${queryRange[1]}/${count}`,
        'Access-Control-Expose-Headers': 'Content-Range'
      });
      res.json(users)
    }
    )
    .catch(err => next(err));
}

const getCurrent = (req, res, next) => {
  userService.getById(req.user.sub)
    .then(user => user ? res.json(user) : res.sendStatus(404))
    .catch(err => next(err));
}

const getById = (req, res, next) => {
  userService.getById(req.params.id)
    .then(user => user ? res.json(user) : res.sendStatus(404))
    .catch(err => next(err));
}

const update = (req, res, next) => {
  userService.update(req.params.id, req.body)
    .then((user) => res.json(user))
    .catch(err => next(err));
}

const _delete = (req, res, next) => {
  userService.delete(req.params.id)
    .then((user) => res.json(user))
    .catch(err => next(err));
}


export const userController = {
  authenticate,
  register,
  getAll,
  getCurrent,
  getById,
  update,
  delete: _delete
};