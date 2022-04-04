import express from 'express';
const router = express.Router();

/**
 * @desc Signs in user.
 * @route POST /api/users/signin
 */
router.post('/api/users/signin', (req, res) => {
  res.send('Signed in');
});

export { router as signInRouter };
