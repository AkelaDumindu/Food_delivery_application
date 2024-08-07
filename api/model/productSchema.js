const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name:{type:String, required:true},
    description:{type:String, required:true},
    image:{type:String,},
    unitPrice:{type:Number, required:true},
    category:{type:String, required:true},
    
});

module.exports = mongoose.model('product', ProductSchema);