import expressJwt from 'express-jwt';

import { userService } from '../routes/users/users-service';

const config = require('./config.json');

export function jwt() {
  const jwtSecret = config.jwtSecret;
  return expressJwt({ secret: jwtSecret, isRevoked }).unless({
    path: [
      // public routes that don't require authentication
      '/page',
      '/greetings',
      '/image',
      '/file',
      { url: '/users/authenticate', methods: ['POST'] },
      { url: '/users', methods: ['POST'] }
    ]
  });
}

async function isRevoked(req, payload, done) {
  const user = await userService.getById(payload.sub);

  // revoke token if user no longer exists
  if (!user) {
    return done(null, true);
  }

  done();
};