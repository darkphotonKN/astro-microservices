import express from 'express';
const router = express.Router();

/**
 * @desc Shows current user
 * @route GET /api/users/currentuser
 */
router.get('/api/users/currentuser', (req, res) => {
  res.send('Routed to current user updated.');
});

export { router as currentRouterUser };
