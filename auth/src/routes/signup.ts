import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

const router = express.Router();

/**
 * @desc Allows user to sign up for a new account.
 * @route POST /api/users/signup
 */

router.post(
  '/api/users/signup',
  [
    // using middleware for validation
    body('email').isEmail().withMessage('Email must be provided'), // in the body of the request look for the email property
    body('password')
      .trim() // sanitization
      .isLength({ min: 4, max: 20 })
      .withMessage('Passwords must be between 4 to 20 characters'),
  ],
  (req: Request, res: Response) => {
    const errors = validationResult(req);

    // handle any errors that are present after validation
    if (!errors.isEmpty()) {
      // thrown errors will be caught by express and passed to our
      // CUSTOM ERROR HANDLER MIDDLEWARE
      throw Error('Invalid email or password.');
    }

    throw Error('Error in database.');

    const { email, password } = req.body;

    res.status(200).json({ success: true });
  }
);

export { router as signUpRouter };
