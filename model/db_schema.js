var up_config = require('../model/crud_model_constant');
var mongoose = require('mongoose');  

var Schema = new mongoose.Schema({  
  name: String,
  src: String,
  is_deleted: Boolean,
  info : Object
});

mongoose.model(up_config.COLLECTION_NAME, Schema);