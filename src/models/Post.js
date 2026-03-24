const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const postSchema = new mongoose.Schema({
    title:{
        type: String,
        require: true
    },
    content:{
        type: String,
        require: true
    },
     author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
     },
     image:{
        type:String
     },
     tags:{
        
     }
})