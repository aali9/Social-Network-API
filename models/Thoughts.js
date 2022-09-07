const { Schema, model } = require('mongoose');
const ReactionSchema = require('./Reaction')
const formatDate = require('../utils/formatDate');

const ThoughtsSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280,
        },
        createdAt: {
            type: Date,
            get: createdAtDate => formatDate(createdAtDate)
        },
        username: {
            type: String,
            required: true,

        },
        reactions: [ReactionSchema]
    },
    {
        toJSON: {
          virtual: true,
        },
        id: false,
      }
    );
    
    ThoughtsSchema
      .virtual('reactionCount')
      .get(function () {
        return this.reactions.length;

      });

      const Thoughts = model ("Thoughts", ThoughtsSchema);

      module.exports = Thoughts;
      