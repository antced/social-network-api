const { Thought, User } = require('../models');
// exporting all functions from thoughts
module.exports = {
  async getThoughts(req, res) {
    try {
      // find all thoughts
      const thoughts = await Thought.find()
      res.status(200).json(thoughts)
    } catch (error) {
      res.status(500).json(error)
    }
  },
  // find a single thought by id
  async getSingleThought(req, res) {
    try {
      const oneThought = await Thought.findOne({ _id: req.params.thoughtId })
      res.status(200).json(oneThought)
    } catch (error) {
      res.status(500).json(error)
    }
  },
  // create a new thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $addToSet: { thoughts: thought._id } },
          { new: true }
        );
      })
      .then((user) =>
        !user
          ? res
            .status(404)
            .json({ message: 'Thought created, but found no user with that ID' })
          : res.json('Created the thought 🎉')
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // update thought by id
  async updateThought(req, res) {
    try {
      const updatedThought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        // set multiple fields
        { $set: { thoughtText: req.body.thoughtText, username: req.body.username } },
        { new: true }
      )
      res.status(200).json(updatedThought)
    } catch (error) {
      res.status(500).json(error)
    }
  },
  // delete thought by id
  async deleteThought(req, res) {
    try {
      const deletedThought = await Thought.deleteOne(
        { _id: req.params.thoughtId },
        { new: true }
      )
      res.status(200).json(deletedThought)
    } catch (error) {
      res.status(500).json(error)
    }
  },
  // add a new reaction
  async addReaction(req, res) {
    try {
      const reactions = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        // add reaction to array
        { $addToSet: { reactions: req.body } },
        { new: true }
      )
      res.status(200).json(reactions)
    } catch (error) {
      res.status(500).json(error)
    }
  },
  // delete a reaction
  async deleteReaction(req, res) {
    try {
      const reactions = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        // remove reaction from array
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { new: true }
      )
      res.status(200).json(reactions)
    } catch (error) {
      res.status(500).json(error)
    }
  }
};
