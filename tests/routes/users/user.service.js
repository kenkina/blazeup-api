import "@babel/polyfill";
import axios from 'axios';


const authenticate = async (username, password) => {
  return axios.post('http://localhost:4000/users/authenticate', {
    username: username,
    password: password
  })
    .then(res => res)
    .catch(err => Promise.reject(err));
}

const create = async (userParam) => {
  return axios.get('http://localhost:4000/users/')
    .then(res => res)
    .catch(err => Promise.reject(err));
  ///
}

const getAll = async () => {
  return axios.get('http://localhost:4000/users/')
    .then(res => res)
    .catch(err => Promise.reject(err));
}

const getById = async (id) => {
  return axios.get('http://localhost:4000/users/' + id)
    .then(res => res)
    .catch(err => Promise.reject(err));
}

const getCurrent = (id) => {
  return axios.get('http://localhost:4000/users/current', {
    user: {
      sub: id
    }
  })
    .then(res => res)
    .catch(err => Promise.reject(err));
}

const update = async (id, username, password) => {
  return axios.get('http://localhost:4000/users/' + id, {
    username: username,
    password: password,
    firstName: 'Ray',
    lastName: 'Gracefield'
  })
    .then(res => res)
    .catch(err => Promise.reject(err));
}

const _delete = async (id) => {
  return axios.get('http://localhost:4000/users/')
    .then(res => res)
    .catch(err => Promise.reject(err));
  ///
}


export const userService = {
  authenticate,
  create,
  getAll,
  getById,
  getCurrent,
  update,
  delete: _delete
};