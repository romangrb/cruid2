var mongoose = require('mongoose');
var crud_config = require('../model/crud_model_constant');

var DbCrud = {
  
  create : function (name, src) {
     
    var RecCollection = mongoose.model(crud_config.COLLECTION_NAME);
    return new RecCollection({name : name, src : src, is_deleted : false});
    
  },
  
  read : function () {
    
    return  mongoose.model(crud_config.COLLECTION_NAME).find({});
    
  }
  
};

function DbCrudPrivProtMethProp(){
  
  var those = this;
  
}

DbCrudPrivProtMethProp.prototype = DbCrud;

var DbCrudService = new DbCrudPrivProtMethProp;

module.exports = DbCrudService;