const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const device = require('express-device');

const port = process.env.PORT || 3000;
const app = express();

const redirectToHTTPS = require('express-http-to-https').redirectToHTTPS;

app.use(redirectToHTTPS([/localhost:(\d{4})/], [/\/insecure/], 301));
app.use(device.capture());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// app.use((req, res, next) => {
//   // Website you wish to allow to connect
//   res.setHeader('Access-Control-Allow-Origin', '*')
//   // Request methods you wish to allow
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
//   // Request headers you wish to allow
//   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
//   // Set to true if you need the website to include cookies in the requests sent
//   // to the API (e.g. in case you use sessions)
//   res.setHeader('Access-Control-Allow-Credentials', true)
//   // Pass to next layer of middleware
//   next()
// })

app.get('/', (req, res) => {
  app.use(express.static(`${__dirname}/dist/pwa-ios/`));
  app.use(express.static(`${__dirname}./`));
  app.use(express.static(`${__dirname}/`));
  res.sendFile(path.join(`${__dirname}/dist/pwa-ios/index.html`));
});

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports = { app };
