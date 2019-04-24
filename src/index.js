import "@babel/polyfill";
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import cors from 'cors';
import { jwt } from './helpers/jwt';

import { errorHandler } from './helpers/error-handler';

import publicFile from './public/files/index.zip';
import publicImage from './public/images/template.png';
import publicPage from './public/pages/index.html';
import { userRouter, categoryRouter, productRouter } from "./routes/index";

//const config = require('./helpers/config.json');

const app = express();

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
app.use(jwt());

// static path
app.use(express.static(path.join(__dirname, 'public')));

// api routes
app.use('/users', userRouter);
app.use('/categories', categoryRouter);
app.use('/products', productRouter);

app.use('/publicCategories', categoryRouter);
app.use('/publicProducts', productRouter);

// global error handler
app.use(errorHandler);


const greetings = [
  {
    "es": "hola"
  },
  {
    "de": "hallo"
  },
  {
    "zh": "ni hao"
  }
];

app.get('/greetings', (req, res) => {
  res.json({
    greeting: greetings
  });
});

app.get('/page', (req, res) => {
  res.sendFile(path.join(__dirname + publicPage));
});

app.get('/image', (req, res) => {
  res.sendFile(__dirname + publicImage);
});

app.get('/file', (req, res) => {
  res.sendFile(__dirname + publicFile);
});

app.all('*', (req, res) => {
  res.json({
    boilerplate: true
  });
});


// start server
const port = 8080;
app.listen(port, () => {

  if (process.env.NODE_ENV !== 'production') {
    console.log('[ .- -- Development mode -- -. ]');
  }

  console.log('Server listening on port ' + port);
})