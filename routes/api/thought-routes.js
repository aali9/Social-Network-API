const router = require("express").Router();
const {
  getThoughts,
  getThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,} = require("../../controllers/thought-controller");

// get thoughts
router.route("/").get(getThoughts).post(createThought);
//thought by id 
router
  .route("/:thoughtId").get(getThought).put(updateThought).delete(deleteThought);

router.route("/:thoughtId/reaction").post(addReaction);
//reaction to thought by id 
router.route("/:thoughtId/reaction/:reactionId").delete(removeReaction);

module.exports = router;