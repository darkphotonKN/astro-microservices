import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

import { User } from '../models/user';
import { RequestValidationError } from '../errors/request-validation-error';

const router = express.Router();

/**
 * @desc Allows user to sign up for a new account.
 * @route POST /api/users/signup
 */
router.post(
  '/api/users/signup',
  [
    // using express-validator middleware for validation
    body('email').isEmail().withMessage('Email must be provided'), // in the body of the request look for the email property
    body('password')
      .trim() // sanitization
      .isLength({ min: 4, max: 20 })
      .withMessage('Passwords must be between 4 to 20 characters'),
  ],
  async (req: Request, res: Response) => {
    // validationResult returns errors if there are any after validation
    const errors = validationResult(req);

    //*** VALIDATION ERROR HANDLING
    // handle any errors that are present after validation
    if (!errors.isEmpty()) {
      // thrown errors will be caught by express and passed to our
      // CUSTOM ERROR HANDLER MIDDLEWARE
      // throw Error('Invalid email or password.'); // old implementation - default way
      // custom way - a "themed" Error so we can differentiate error types
      throw new RequestValidationError(errors.array()); // pass all errors to our custom Error
      // the errors thrown here will be handled by our custom middle ware
      // inside /middlewars/error-handler by express and our CustomError type
    }

    const { email, password } = req.body;

    //*** EXISTING USER HANDLING
    // check if user already exists in our database
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(404).send({ message: 'User already exists!' });
    }

    // *** ACTUAL REGISTRATION + USER CREATION
    // create a new user
    const newUser = User.build({
      email,
      password,
    });
  }
);

export { router as signUpRouter };
