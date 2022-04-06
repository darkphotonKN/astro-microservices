import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import mongoose from 'mongoose';

import { currentRouterUser } from './routes/current-user';

import { signUpRouter } from './routes/signup';
import { signInRouter } from './routes/signin';
import { signOutRouter } from './routes/signout';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';

const app = express();
app.use(json());

app.use(currentRouterUser);
app.use(signInRouter);
app.use(signUpRouter);
app.use(signOutRouter);

// catch any undefined routes and throw custom NOT FOUND error
app.all('*', async () => {
  throw new NotFoundError();
});

// custom middleware to handle errors
app.use(errorHandler);

const start = async () => {
  try {
    // mongodb uri format: mongodb://domain(use name of k8s service):port(default 27017)/dbName(mongodb creates one for you if this db name wasn't already present)
    await mongoose.connect('mongodb://auth-monogo-srv:27017/auth');
    console.log('Connected to mongoDB');
  } catch (err) {
    console.log('Error while connection to mongoDB:', err);
  }

  app.listen(3000, () => {
    console.log('Auth service listening on port 3000!');
  });
};

// initiate database setup, connection, and initializing server
start();
