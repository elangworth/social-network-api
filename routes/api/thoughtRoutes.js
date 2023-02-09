const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  deleteThought,
  addReaction,
  removeReaction,
} = require('../../controllers/thoughts-controller');

// /api/thoughts/
router.route('/').get(getThoughts).post(createThought);

// /api/thoughts/userId.....this was above after getThoughts
//router.route('/').post(createThought);

// /api/thoughts/:thoughtId
router.route('/:thoughtId').get(getSingleThought).delete(deleteThought);

// /api/thoughts/reactions/:thoughtId
router.route('/reactions/:thoughtId').post(addReaction);

// /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

module.exports = router;

