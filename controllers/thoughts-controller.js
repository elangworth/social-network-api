const { ObjectId } = require('mongodb');
const {Thoughts} = require('../models/thoughts');
const {User} = require('../models/user');

module.exports = {
    //get all thoughts
    getThoughts(req, res){
        Thoughts.find()
        /*.populate('user')*/
        .then((thoughts) => res.json(thoughts))
        .catch((err) => res.status(500).json(err));
    },
    //get a thought
    getSingleThought(req, res){
        Thoughts.findOne({ _id: req.params.thoughtId })
        .select('-__v')
        .then((thought) => 
            !thought
            ? res.status(400).json({ message: 'No Thought with that id' })
            : res.json(thought)
        )
    },
    //create a thought
    createThought(req, res){
        console.log(req.params);
        Thoughts.create(req.body)
        .then(thought => {
            !thought
                ? res.status(400).json({ message: 'Something went wrong' })
                : res.json(thought)
            User.findOneAndUpdate(
                { username: req.body.username},
                {$push: {thoughts: thought}},
                { new: true })
            .then(user => {
                console.log('Thought has been pushed to user');    
            })
            .catch(err => {
                console.error({ message: err });
                return res.status(500).json(err);
            });
        })
        .catch((err) => {
            console.error({ message: err });
            return res.status(500).json(err);
        });
    },
    //delete a thought
    deleteThought(req, res){
        Thoughts.findOneAndDelete({ _id: req.params.thoughtId })
            .then((deletedThought) => 
            !deletedThought
                ? res.status(400).json({ message: 'There is not thought with this id' })
                : res.status(200).json(deletedThought)
                // : Thoughts.deleteMany({ _id: { $in: thought.reactions } })
            )
            // .then(() => res.json({ message: 'Thought and reactions deleted' }))
            .catch((err) => {
                console.error({ message: err })
                res.status(500).json(err)
            })
    },
    //update a thought
    updateThought(req, res){
        Thoughts.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
        .then((thought) =>
        !thought
            ? res.status(404).json({ message: 'No thought with this id!' })
            : res.json(thought)
        )
        .catch((err) => {
            console.error({ message: err});
            res.status(500).json(err)
        });
    },
    //add a reaction
    addReaction(req, res){
        console.log(req.params);
        console.log(req.body);
        Thoughts.findOneAndUpdate(
            {_id: req.params.thoughtId},
            { $addToSet: { reactions: {
                "reactionBody": req.body.reactionBody,
				"createdAt": req.body.createdAt,
				"username": req.body.username 
            } } },
            { runValidators: true, new: true }
            )
        .then((reaction) => 
        !reaction
        ? res.status(404).json({ message: "No thought found with that ID" })
        : res.json(reaction)
        )
        .catch((err) => {
            console.error({ message: err });
            return res.status(500).json(err);
        });
    },
    //remove a reaction
    removeReaction(req, res){
        console.log(req.params);
        Thoughts.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId }}},
            { runValidators: true, new: true }
            )
        .then((thought) => 
            !thought
                ? res.status(400).json({ message: 'There is not thought with this id' })
                : res.json(thought)
            )
            .catch((err) => {
                console.error({ message: err })
                res.status(500).res.json(err)
            });
    },
};