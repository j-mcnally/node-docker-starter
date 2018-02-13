import Dotenv from 'dotenv'
import express from 'express'
import bodyParser from 'body-parser'
import AppRouter from './app/routes'
import Models from './app/models'
import Banner from './app/banner'
import ExpressLogging from 'express-logging'
import { URL } from 'url'

Dotenv.config();

(async function() {
  console.log("Connecting to Mongo.....")
  try {
    await Models.load();
  } catch(ex) {
    console.log(ex);
    exit(1);
  }
  console.log("Connected to Mongo");

  let app = express();

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  if (process.env.LOG) {
    app.use(ExpressLogging(console))
  }

  // CORS (Cross origin resource sharing)
  // Probably replace with helmet?
  app.use(function(req, res, next) {
    if (req.headers.origin) {
      let originDomain = new URL(req.headers.origin).host
      let allowed = ["127.0.0.1:4200", "localhost:4200"];
      if (allowed.indexOf(originDomain) > -1) {
        res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
      }
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
      if (req.method == "OPTIONS") {
        return res.end("", 200)
      }
    }
    next();
  });

  AppRouter.map(app, Models)

  const PORT = process.env.PORT || 3000
  app.listen(PORT);
  console.log(Banner);
  console.log(`Running on port ${PORT}...`);
})();