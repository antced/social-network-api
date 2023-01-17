const router = require('express').Router();
const {
  getSingleThought,
  getThoughts,
  createThought,
  addReaction,
  deleteReaction
} = require('../../controllers/thoughtController');
// /api/thoughts
router.route('/').get(getThoughts).post(createThought);
// /api/thoughts/:thoughtId
router.route('/:thoughtId').get(getSingleThought);
// /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions').post(addReaction).delete(deleteReaction);

module.exports = router;
