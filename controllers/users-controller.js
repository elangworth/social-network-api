const {User} = require('../models/user');

module.exports = {
    //gets all users
    getUsers(req, res){
        User.find()
        //.populate('user')
        //.populate('thoughts')
        //.populate('reactions')
        .then((user) => res.json(user))
        .catch((err) => {
            console.error({message: err});
            return res.status(500).json(err);
        });
    },
    //get a single user
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.UserId})
        .select('-__v')
        .then(async (user)=>
        !user
        ? res.status(404).json({ message: 'no user exists'})
        : res.json(user)
        )
        .catch((err) => {
            console.error({ message: err });
            return res.status(500).json(err);
          });
    },
    //create a new user
    createUser(req, res) {
        console.log("here");
        User.create(req.body)
        .then((user) => res.json(user))
        .catch((err) => {
            console.error(err);
            res.status(500).json(err.message)
        });
    },
    updateUser(req, res) {
        console.log(req.params);
        User.findOneAndUpdate({ _id: req.params.UserId },
            { $set: { username: req.body.username, email: req.body.email } },
            { new: true })
        .then((updatedUser) => 
        !updatedUser
        ? res.status(404).json({ message: "No user with that id"})
        : res.json(updatedUser)
        )
        .catch((err) => {
            console.error({ message: err});
            return res.status(500).json(err);
        })
    },
    // Delete a user and remove them from the friend list
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.UserId })
        .then((deletedUser) => {
            if(!deletedUser){
                res.status(404).json({ message: 'No such user exists '})
            } else {
            res.status(200).json(deletedUser);
            }
        })
        .catch((err) => {
            console.error({ message: err });
            res.status(500).json(err.message);
        });
    },
    // Add a friend to a user
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.body.friends } },
            { runValidators: true, new: true }
        )
        .then((user) =>
            !user
            ? res
                .status(404)
                .json({ message: 'No user found with that ID' })
            : res.json(user)
        )
        .catch((err) => {
            console.error(err);
            res.status(500).json(err.message)
        });
    },
    // Remove friend from a user
    removeFriend(req, res) {
        console.log(req.params);
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: {friends: {_id: req.params.friendId } }},
            { runValidators: true, new: true }
        )
        .then((user) =>
            !user
            ? res
                .status(404)
                .json({ message: 'No user found with that ID :(' })
            : res.json(user)
        )
        .catch((err) => {
            console.error({message: err});
            res.status(500).json(err)
        });
    },
};