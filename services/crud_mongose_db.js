var mongoose = require('mongoose');
var crud_config = require('../model/crud_model_constant');

var DbCrud = {
  
  create : function (name, src, is_deleted) {
    is_deleted = is_deleted||false;
    var RecCollection = mongoose.model(crud_config.COLLECTION_NAME);
    return new RecCollection({name : name, src : src, is_deleted : is_deleted});
  },
  
  findAll : function () {
    return  mongoose.model(crud_config.COLLECTION_NAME).find({});
  },
  
  findById : function (id) {
    return mongoose.model(crud_config.COLLECTION_NAME).findById(id);
  }
  
};

function DbCrudPrivProtMethProp(){
  
  var those = this;
  
}

DbCrudPrivProtMethProp.prototype = DbCrud;

var DbCrudService = new DbCrudPrivProtMethProp;

module.exports = DbCrudService;