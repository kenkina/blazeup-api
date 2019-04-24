import "@babel/polyfill";
import { expect } from 'chai';

//import app from '../../../src/index.dev';
import { userService } from './user.service';


describe('Users', () => {

  describe('GET', () => {

    it('GetAll', async () => {
      try {
        const userId = '5ca7df7c5729210e2430f069';
        const response = await userService.getAll();

        expect(response.status).to.equal(200);
        expect(response.data).to.be.an('array');
        expect(response.data[0].id).to.equal(userId);

      } catch (err) {
        return Promise.reject(err);
      }
    });

    it('GetById', async () => {
      try {
        const userId = '5ca7df7c5729210e2430f069';
        const response = await userService.getById(userId);

        expect(response.status).to.equal(200);
        expect(response.data).to.be.an('object');
        expect(response.data.id).to.equal(userId);
      } catch (err) {
        return Promise.reject(err);
      }
    });

    it('GetById: 404', async () => {
      try {
        const userId = '5ca7df7c5729210e2430faaa';
        await userService.getById(userId);
      } catch (err) {
        expect(err.response.status).to.equal(404);
      }
    });

  });

  describe('POST', () => {

    it('Authenticate', async () => {
      try {
        const userId = '5ca7df7c5729210e2430f069';
        const username = 'ray';
        const password = 'ray';
        const response = await userService.authenticate(username, password);

        expect(response.status).to.equal(200);
        expect(response.data).to.be.an('object');
        expect(response.data.id).to.equal(userId);
        expect(response.data.token).to.be.an('string');

      } catch (err) {
        return Promise.reject(err);
      }
    });

  });

  describe('PUT', () => {

    it('Update', async () => {
      try {
        const userId = '5ca7df7c5729210e2430f069';
        const username = 'ray';
        const password = 'ray';
        const response = await userService.update(userId, username, password);

        expect(response.status).to.equal(200);
        expect(response.data).to.be.an('object');
        expect(response.data.id).to.equal(userId);
        expect(response.data.username).to.equal(username);

      } catch (err) {
        return Promise.reject(err);
      }
    });

  });

});