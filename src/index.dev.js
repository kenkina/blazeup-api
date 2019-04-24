import "@babel/polyfill";
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import cors from 'cors';
//import { jwt } from './helpers/jwt';
import expressOasGenerator from 'express-oas-generator';

import { errorHandler } from './helpers/error-handler';

import { userRouter } from "./routes/index";


const app = express();
expressOasGenerator.init(app, {});

// body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// cross-origin resource sharing (CORS)
var whitelist = ['http://localhost:3000'];
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(cors(corsOptions));

// use JWT auth to secure the api
//app.use(jwt());

// static path
app.use(express.static(path.join(__dirname, 'public')));

// api routes
app.use('/users', userRouter);

// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
app.listen(port, () => {
  console.log('[ .- -- Development mode: index.dev.js -- -. ]');
  console.log('Server listening on port ' + port);
});