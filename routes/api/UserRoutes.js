const router = require('express').Router();

const {
  getallUsers,
  getUserbyID,
  createUser,
  updateUser,
  deleteUser,
  newFriend,
  deleteFriend


} = require('../../controllers/userController.js');




// get all the users and GET/POST
router.route('/').get(getallUsers) .post(createUser);

//   get , put delete users 
  router.route('/:id').get(getUserbyID).put(updateUser).delete(deleteUser);


router.route('/:id/friends/:friendId').post(newFriend).delete(deleteFriend);

module.exports = router;