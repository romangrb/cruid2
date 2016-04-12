var mongoose = require('mongoose');
var crud_config = require('../model/crud_model_constant');

var DbCrud = {
  
  create : function (name, src) {
     
    mongoose.model(crud_config.COLLECTION_NAME).create({
      name : name,
      src : src,
      is_deleted : false
  }, function (err, data) {
      if (err) {
        console.log(crud_config.DB_CREATE_ERR_MSG);
      } else {
        console.log(crud_config.DB_CREATE_SUCCESS_MSG + data);
      }
    });
    
  },
  
  read : function () {
    
    var collection;
    
    mongoose.model(crud_config.COLLECTION_NAME).find({
      
    }, function (err, data) {
      if (err) {
        console.log(crud_config.DB_CREATE_ERR_MSG);
      } else {
        //console.log(crud_config.DB_CREATE_SUCCESS_MSG + data);
        collection = data;
        return collection;
      }
    });
  }
  
};

function DbCrudPrivProtMethProp(){
  
  var those = this;
  
}

DbCrudPrivProtMethProp.prototype = DbCrud;

var DbCrudService = new DbCrudPrivProtMethProp;

module.exports = DbCrudService;