const { Schema, Types } = require('mongoose');

// reaction schema for thoughts
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

// getter method to format timestamp on query
// TODO getter method format date

module.exports = reactionSchema;
