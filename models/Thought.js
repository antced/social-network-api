const { Schema, model } = require('mongoose');
const Reaction = require('./Reaction');

// Schema to create Thought model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    username: {
      type: String,
      required: true
    },
    reactions: [Reaction],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Virtual property `reactionCount` gets the amount of reactions
thoughtSchema
  .virtual('reactionCount')
  // Getter
  .get(function () {
    return this.reactions.length;
  });

  // getter method to formate date
// TODO getter method format date

// Initialize Thought model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;