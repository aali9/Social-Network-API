const { User, Thought } = require("../models");

module.exports = {
  getThoughts(req, res) {
    Thought.find()
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
  },
  //get a thought 
  getThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: "Not found!!  Try again." })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  //creating a thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: thought._id } },
          { new: true }
        );
      })
      .then((user) =>
        !user
          ? res.status(404).json({
              message:
                "ERROR!!. Try again!",
            })
          : res.json("Thought successfully created! ")
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  //update a thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: "No thought found!  Try again." })
          : res.json(thought)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  //delete a thought 
  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: "No thought found!  Try again." })
          : User.findOneAndUpdate(
              { thoughts: req.params.thoughtId },
              { $pull: { thoughts: req.params.thoughtId } },
              { new: true }
            )
      )
      .then((user) =>
        !user
          ? res.status(404).json({
              message:
                "ERROR. Try again!",
            })
          : res.json({ message: "Thought successfully created! " })
      )
      .catch((err) => res.status(500).json(err));
  },
  //adding a reaction
  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { new: true }
    )
      .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: "ERROR!!  Try again." })
          : res.json(thought)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  //removing a reaction by id
  removeReaction(req, res) {
    Thought.findByIdAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({
              message:
                "Error!! Try again!",
            })
          : res.json({ message: "Reaction successfully removed! " })
      )
      .catch((err) => res.status(500).json(err));
  },
};