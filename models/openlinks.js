const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var content = new Schema({
  type: String,
  description: String,
  index:Number,
  longdescription: String
});

var link = new Schema({
  url:{
    type:String,
    required:true,
    unique:true
  },
  goaltitle:{
    type:String
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
