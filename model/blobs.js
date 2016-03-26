var mongoose = require('mongoose');  
var blobSchema = new mongoose.Schema({  
  name: String,
  src: String,
  is_deleted: Boolean
});
mongoose.model('Blob', blobSchema);