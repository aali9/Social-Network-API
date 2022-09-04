const {User, Thoughts, Types} = require('../models');


module.exports = {


  getallThoughts(req, res) {
    Thoughts.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },


  getThoubyID(req, res) {
    Thoughts.findOne({ _id: req.params.id })
      .select('-__v')
      .then((thoughts) =>
        !thoughts
          ? res.status(404).json({ message: 'No thoughts found with that ID!' })
          : res.json(thoughts)
      )
      .catch((err) => res.status(500).json({message:"Borked!", err}));
  },

  // Create a thought
  createNewThou(req, res) {
    Thoughts.create(req.body)
      .then((thoughts) => res.json({message: "Wahoo! you created a new thought!", thoughts}))
      .catch((err) => {
        console.log(err);
        return res.status(500).json({message:"Borked!", err});
      });
  },

  // Delete a thought
  deleteThou(req, res) {
    Thoughts.findOneAndDelete({ _id: req.params.id })
      .then((thoughts) =>
        !thoughts
          ? res.status(404).json({ message: 'No thought found with that ID!' })
          : res.json({ message: 'Wahoo! You have successfully deleted that thought!', thoughts})
      )
      .catch((err) => res.status(500).json({message:"Borked!", err}));
  },


  // Update a thought 
  updateThou(req, res) {
    Thoughts.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thoughts) =>
        !thoughts
          ? res.status(404).json({ message: 'No thought found with that ID!' })
          : res.json({message: 'Wahoo! You have successfully updated that thought!', thoughts})
      )
      .catch((err) => res.status(500).json({message:"Borked!", err}));
  },

//   create a reaction
  createNewReaction(req, res) {
    Thoughts.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $push: { reactions: req.body } },
        { runValidators: true, new: true }
    )
        .then((thoughts) => {
            if (!thoughts) {
                res.status(404).json({ message: 'No thought found with that ID!' });
                return;
            }
            res.json({message:"Wahoo! You have reacted to this thought!", thoughts});
        })
        .catch(err => res.status(400).json({message:"Borked!", err}))
},


deleteReaction(req, res) {
    Thoughts.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId }}},
        { new: true }
    )
        .then((thoughts) => {
            res.json({message:"Wahoo! You have deleted that reaction!", thoughts})
        })
        .catch(err => res.json({message:"Borked!", err}))
}
};