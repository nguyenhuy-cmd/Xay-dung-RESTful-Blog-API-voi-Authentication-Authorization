const mongoose = require('mongoose');

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
     tags:[
        String
     ]
},{
    timestamps: true
});

module.exports = mongoose.model('Post', postSchema);