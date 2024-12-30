const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    firstName:{type:String, required:true},
    lastName:{type:String, required:true},
    image:{type:String},
    password:{type:String, required:true},
    confirmPassword:{type:String, required:true},
    activeState:{
        type:Boolean,
        required:true
    },


    role: {
        type: String,
        enum: ['admin', 'user'], // Define possible roles here
        default: 'user'
    }
    
    
});

module.exports = mongoose.model('user', UserSchema);