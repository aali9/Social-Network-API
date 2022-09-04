const { Schema, model } = require('mongoose');
const ReacSchema = require('./Reaction');


// Schema to create User model
const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      max_length: 50,
    },
    email: {
        type: String,
        required: true,
        unique: true,
      // must match valid email1!!!
    },
    thoughts: [{
              type: Schema.Types.ObjectId,
              ref: 'Thoughts',
            
          },
        ],  
    friends: [{
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],    
  },
  {
    toJSON: {
      virtual: true,
    },
    id: false,
  }
);

UserSchema
  .virtual('friendCount')
  .get(function () {
    return this.friends.length;
  });

const User = model('User', UserSchema);

module.exports = User;