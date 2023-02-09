const { Schema, model } = require('mongoose');
const reactionSchema = require('./reaction');
const { ObjectId } = require('mongoose').Types;

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        min: 1,
        max: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (date) => {
            if (date) return date.toISOString().split("T") [0];
          },
    },
    username: {
        type: String,
        required: true 
    },
    reactions: [reactionSchema],
},
{
    toJSON: {
       getters: true,
       virtuals: true,
    },
     id: false,
 },
);

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thoughts = model('Thoughts', thoughtSchema);
module.exports =  {Thoughts, thoughtSchema};
