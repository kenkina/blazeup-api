# Express Webpack Boilerplate

A boilerplate for express using webpack and babel


## Scripts

Install dependencies
```
npm i
```

Start webpack with _watch mode_ and serve _build/index.js_ with [NodemonPlugin](https://github.com/Izhaki/nodemon-webpack-plugin) at [http://localhost:3000](http://localhost:3000)
```
npm start
```

Serve _build/index.js_ with nodemon at [http://localhost:3000](http://localhost:3000)
```
npm run start-dev
```

Start webpack and use [UglifyJsPlugin](https://github.com/webpack-contrib/uglifyjs-webpack-plugin) for minification
```
npm run build-prod
```

Serve _dist/index.js_ with node at [http://localhost:3000](http://localhost:3000)
```
node dist/index.js
```


## Built With

* [Express](https://github.com/expressjs/express) - A web framework for node.
* [Webpack](https://github.com/webpack/webpack) - A module bundler for JavaScript.
* [Babel](https://github.com/babel/babel) - A JavaScript compiler