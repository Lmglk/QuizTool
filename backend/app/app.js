import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import logger from 'koa-logger';
import cors from '@koa/cors';
import mongoose from 'mongoose';

import { CONFIG } from './config/config';
import routes from './routes';

mongoose.Promise = Promise;

export class App {
  constructor() {
    this.app = new Koa();

    this.connectDB();
    this.app.use(cors());
    this.app.use(logger());
    this.app.use(this.errorHandler);
    this.app.use(bodyParser());

    this.app.use(routes);
  }

  async connectDB() {
    try {
      await mongoose.connect(CONFIG.MONGO_URI, {useNewUrlParser: true});
      console.log('MongoDB connected');
    } catch (e) {
      console.log(e);
      this.stop();
    }
  }

  async errorHandler(ctx, next) {
    try {
      await next();
    } catch ({status = 500, message = 'Server Error', name, errors}) {
      if (name === 'ValidationError') {
        ctx.status = 400;
        ctx.body = {
          errors: Object.values(errors).reduce((acc, currError) => ({
            ...errors,
            [errors.path]: currError.message
          }), {}),
        };
      } else {
        ctx.status = status;
        ctx.body = { status, message };
      }
    }
  }

  start() {
    this.server = this.app.listen(CONFIG.PORT, (err) => {
      if (err) {
        console.log(err);
      }
      console.log(`Server running on port ${CONFIG.PORT}`);
    });
  }

  stop() {
    this.server.close();
  }
}
