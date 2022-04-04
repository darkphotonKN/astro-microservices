import express from 'express';
const router = express.Router();

/**
 * @desc Signs out user.
 * @route POST /api/users/signin
 */
router.post('/api/users/signout', (req, res) => {
  res.send('Signed out');
});

export { router as signOutRouter };
