const { Schema, Types, model } = require("mongoose");
const { isEmail } = require("validator");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
      type: String,
      required: true,
      unique: true,
      validate: [isEmail, "invalid email"],
  },
  thoughts: [
    {
      type: Types.ObjectId, 
      ref: "Thought",
    },
  ],
  friends: [
    {
      type: Types.ObjectId,
      ref: "User",
    },
  ],
},
{
  toJSON: {
    virtuals: true,
    getters: true,
  },
  id: false,
}
);

/* Create a virtual called friendCount that retrieves the length of the user's friends array field on query */
userSchema.virtual('friendCount').get(function() {
  return this.friends.length
})

const User = model("User", userSchema);

module.exports = User;