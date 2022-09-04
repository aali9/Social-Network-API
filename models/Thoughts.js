const { Schema, model } = require('mongoose');
const ReacSchema = require('./Reaction')
const formatDate = require('../utils/formatDate');

const ThouSchema = new Schema(
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
        reactions: [ReacSchema]
    },
    {
        toJSON: {
          virtual: true,
        },
        id: false,
      }
    );
    
    ThouSchema
      .virtual('reactionCount')
      .get(function () {
        return this.reactions.length;

      });

      const Thoughts = model ("Thoughts", ThouSchema);

      module.exports = Thoughts;
      