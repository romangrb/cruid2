var mongoose = require('mongoose');
var crud_config = require('../model/crud_model_constant');

var DbCrud = {
  
  create : function (name, src){
     
    mongoose.model(crud_config.COLLECTION_NAME).create({
        name : name,
        src : src,
        is_deleted : false
  }, function (err, data) {
      if (err) {
        console.log("There was a problem adding the information to the database.");
      } else {
        console.log('POST creating new collection: ' + data);
      }
    });
    
  }
};

function DbCrudPrivProtMethProp(){
  
}

DbCrudPrivProtMethProp.prototype = DbCrud;

var DbCrudService = new DbCrudPrivProtMethProp;

module.exports = DbCrudService;