const { ObjectId } = require('mongoose').Types;
const { User, Thoughts } = require('../models');



module.exports = {


  getallUsers(req, res) {
    User.find()
      .then(async (user) => {
        const UserOB = {
          user,
        //   headCount: await headCount(),
        };
        return res.json(UserOB);
      })
      .catch((err) => {
        console.log("borked", err);
        return res.status(500).json(err);
      });
  },
// below works!!
  getUserbyID(req, res) {
    User.findOne({ _id: req.params.id })
      .select('-__v')
      .then(async (user) =>
        !user
          ? res.status(404).json({ message: 'No such user exists with that ID!' })
          : res.json({
            user
            })
      )
      .catch((err) => {
        console.log("borked", err);
        return res.status(500).json(err);
      });
  },

  // below works
createUser(req, res) {
    User.create(req.body)
      .then((User) => res.json({message: "Wahoo! You created a new user!!", User}))
      .catch((err) => res.status(500).json({message: "Borked!!", err}));
  },

// below works
  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.id })
      .then((user) => 
        !user
          ? res
            .status(404)
            .json({ message: "No such user exists with that ID! " })
          :res.json({message:"Wahoo! That user has been deleted successfully!", user})
      )
      .catch((err) => res.status(500).json({message: "Borked!!", err}));
  },


  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No such user exists with that ID!' })
          : res.json({message:"Wahoo! You have made changes and updated this user successfully!", user})
      )
      .catch((err) => res.status(500).json({message: "Borked!!", err}));
  },


//   adding a friend.
 newFriend(req,res){
    User.findByIdAndUpdate(
        {_id: req.params.id},
        {$push: { friends: req.params.friendId }},
        {runValidators: true, new: true}
        )
        .select('-__v')
        .then((user)=> {
            if(!user){
                res.status(404).json({ message: "No such user exists with that ID!" })
                return;
            }
   
            res.json({message:"Wahoo! You've added a new friend to this user!", user});
        })
        .catch((err)=>{
            res.status(400).json({message: "Borked!!", err})
        })
},

  deleteFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.id },
      { $pull: { friends:req.params.friendId } },
 { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: "No such user exists with that ID!" })
          : res.json({message:"Wahoo! You've deleted a friend from this user!", user})
      )
      .catch((err) => res.status(500).json({message: "Borked!!", err}));
  },
};