const router = require('express').Router();
 const { createRequire } = require('module');

const {
  getallThoughts,
  getThoubyID,
  createNewThou,
  updateThou,
  deleteThou,
  createNewReaction,
deleteReaction

} = require('../../controllers/thoughtsController');

// just get all the thoughts
router
.route('/')
 .get(getallThoughts)
.post(createNewThou)

// get a thought by its id, update or delete it
router
.route('/:id')
.get(getThoubyID)
.put(updateThou)
.delete(deleteThou)


// create a new reaction per thought using its id
router
.route('/:thoughtId/reactions')
 .post (createNewReaction)

// delete a reaction to A THOUGHT using its ID
router
.route('/:thoughtId/reactions/:reactionId')
 .delete(deleteReaction)




module.exports = router;