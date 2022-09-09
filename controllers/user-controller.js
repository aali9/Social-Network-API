const {User} = require('../models');

const userController = {
    //get user 
    getUsers(req, res) {
        User.find()
          .select("-__v")
          .then((user) => res.json(user))
          .catch((err) => {
            res.status(500).json(err);
            console.log(err);
          });
      },
      getUser(req, res) {
        User.findOne({ _id: req.params.userId })
          .select("-__v")
          .then((user) =>
            !user
              ? res
                  .status(404)
                  .json({ message: "Error! Please Try again." })
              : res.json(user)
          )
          .catch((err) => res.status(500).json(err));
      }, // creating a new user 
      createUser(req, res) {
        User.create(req.body)
          .then((user) => res.json(user))
          .catch((err) => res.status(500).json(err));
      },// updating a user once a user has been created by id 
      updateUser(req, res) {
        User.findOneAndUpdate(
          { _id: req.params.userId },
          { $set: req.body },
          { new: true }
        )
          .then((user) => {
            if (!user) {
              res
                .status(404)
                .json({ message: "Error! Please Try again." });
              return;
            }
            res.json(user);
          })
          .catch((err) => res.status(400).json(err));
      },// deleting a user with the user id 
      deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
          .then((user) => {
            if (!user) {
              res
                .status(404)
                .json({ message: "Error! Please Try again." });
              return;
            }
            res.json(user);
          })
          .catch((err) => res.status(400).json(err));
      },
      addFriend(req, res) {
        User.findOneAndUpdate(
          { _id: req.params.userId },
          { $addToSet: { friends: req.params.friendsId } },
          { new: true }
        )
          .then((user) =>
            !user
              ? res
                  .status(404)
                  .json({ message: "Error! Please Try again." })
              : res.json(user)
          )
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      },// removing a friend with the id and updating 
      removeFriend(req, res) {
        User.findByIdAndUpdate(
          { _id: req.params.userId },
          { $pull: { friends: { friendId: req.params.friendId } } },
          { new: true }
        )
          .then((user) =>
            !user
              ? res.status(404).json({
                  message: "Error! Please Try again.",
                })
              : res.json({ message: "Removed User! " })
          )
          .catch((err) => res.status(500).json(err));
      },
    };
    


module.exports = userController; 