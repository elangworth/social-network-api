const { Schema, model } = require('mongoose');
const { thoughtSchema } = require('./thoughts');
const { ObjectId } = require('mongoose').Types;

const userSchema = new Schema({
    username: String,
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trimmed: true,
        match: [/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please fill a valid email address'],
    },
    thoughts: [thoughtSchema],
    friends: [ this ],
   },
   {
      toJSON: {
         getters: true,
         virtuals: true,
      },
       id: false,
   },
);

userSchema.virtual('friendCount').get(function(){
   return this.friends.length;
});

const User = model('User', userSchema);
module.exports = {User, userSchema};