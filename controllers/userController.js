const User = require('../models/User');
// TODO turn everything into try catch block
module.exports = {
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json(err));
  },
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.body.userId },
      { $addToSet: { friends: req.body.friendId } },
      { new: true }
    )
      .then((user) =>
        !user
          ? res
            .status(404)
            .json({ message: 'No user with that ID' })
          : res.json('Created the friendship 🎉')
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
},
  deleteFriend(req, res) {

};
