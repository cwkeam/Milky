const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var content = new Schema({
  type: String,
  description: String,
  progress: Number
});

var link = new Schema({
  url:{
    type:String,
    required:true,
    unique:true
  },
  username:{
    type:String
  },
  password:{
    type:String
  },
  steps:[content]
});

var Link = module.exports = mongoose.model('link', link, 'links');
