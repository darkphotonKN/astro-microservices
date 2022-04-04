import express from 'express';
import { json } from 'body-parser';

import { currentRouterUser } from './routes/current-user';

import { signUpRouter } from './routes/signup';
import { signInRouter } from './routes/signin';
import { signOutRouter } from './routes/signout';
import { errorHandler } from './middlewares/error-handler';

const app = express();
app.use(json());

app.use(currentRouterUser);
app.use(signInRouter);
app.use(signUpRouter);
app.use(signOutRouter);

// custom middleware to handle errors
app.use(errorHandler);

app.listen(3000, () => {
  console.log('Auth service listening on port 3000!');
});
