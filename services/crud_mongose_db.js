var mongoose = require('mongoose');
var crud_config = require('../model/crud_model_constant');

var DbCrud = {
  
  create : function (obj) {
    obj['is_deleted'] = obj['is_deleted']||false;
    var RecCollection = mongoose.model(crud_config.COLLECTION_NAME);
    return new RecCollection(obj);
  },
  
  findAll : function () {
    return  mongoose.model(crud_config.COLLECTION_NAME).find({});
  },
  
  findById : function (id) {
    return mongoose.model(crud_config.COLLECTION_NAME).findById(id);
  },
  
  update : function () {
    return  mongoose.model(crud_config.COLLECTION_NAME).update;
  },
  
  updateById : function (id, data) {
    return  mongoose.model(crud_config.COLLECTION_NAME).
      findByIdAndUpdate(id, data, {upsert: false});
  },
  
  delete : function (query) {
    return (!query) ?
     mongoose.model(crud_config.COLLECTION_NAME).remove({}) :
     mongoose.model(crud_config.COLLECTION_NAME).remove(query);
  },
   
  
  
};

function DbCrudPrivProtMethProp(){
  
  var those = this;
  
}

DbCrudPrivProtMethProp.prototype = DbCrud;

var DbCrudService = new DbCrudPrivProtMethProp;

module.exports = DbCrudService;