import express from 'express';
import { json } from 'body-parser';

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
app.all('*', () => {
  throw new NotFoundError();
});

// custom middleware to handle errors
app.use(errorHandler);

app.listen(3000, () => {
  console.log('Auth service listening on port 3000!');
});
