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
      default: Date.now,
      get: formatDate
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
function formatDate(createdAt) {
  return createdAt.toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"})
}

module.exports = reactionSchema;
