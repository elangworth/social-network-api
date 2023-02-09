const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require('../../controllers/users-controller');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:UserId
router.route('/:UserId').get(getSingleUser).delete(deleteUser).put(updateUser);

// /api/users/:userId/friends
router.route('/:userId/friends').post(addFriend);

// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').delete(removeFriend);

module.exports = router;

