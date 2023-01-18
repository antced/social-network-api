const User = require('../models/User');

module.exports = {
  // gets all users
  async getUsers(req, res) {
    try {
      const users = await User.find()
      res.status(200).json(users)
    } catch (error) {
      res.status(500).json(error)
    }
  },
  // gets one user by id
  async getSingleUser(req, res) {
    try {
      const oneUser = await User.findOne({ _id: req.params.userId })
      res.status(200).json(oneUser)
    } catch (error) {
      res.status(500).json(error)
    }
  },
  // create a new user
  async createUser(req, res) {
    try {
      const newUser = await User.create(req.body)
      res.status(200).json(newUser)
    } catch (error) {
      res.status(500).json(error)
    }
  },
  // update user by id
  async updateUser(req, res) {
    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: req.params.userId },
        // set multiple fields
        {
          $set: {
            username: req.body.username,
            email: req.body.email
          }
        },
        { new: true }
      )
      res.status(200).json(updatedUser)
    } catch (error) {
      res.status(500).json(error)
    }
  },
  // delete user by id
  async deleteUser(req, res) {
    try {
      const deletedUser = await User.deleteOne(
        { _id: req.params.userId },
        { new: true }
      )
      res.status(200).json(deletedUser)
    } catch (error) {
      res.status(500).json(error)
    }
  },
  // add friend
  async addFriend(req, res) {
    try {
      const friendship = await User.findOneAndUpdate(
        { _id: req.params.userId },
        // add the friends to the array
        { $addToSet: { friends: req.params.friendId } },
        { new: true }
      )
      res.status(200).json(friendship)
    } catch (error) {
      res.status(500).json(error)
    }
  },
  // delete a friend by id
  async deleteFriend(req, res) {
    try {
      const friendship = await User.findOneAndUpdate(
        { _id: req.params.userId },
        // remove friend from array
        { $pull: { friends: req.params.friendId } },
        { new: true }
      )
      res.status(200).json(friendship)
    } catch (error) {
      res.status(500).json(error)
    }
  }

};
