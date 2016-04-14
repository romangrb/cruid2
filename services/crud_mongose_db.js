var mongoose = require('mongoose');
var crud_config = require('../model/crud_model_constant');

var DbCrud = {
  
  create : function (name, src, is_deleted) {
    is_deleted = is_deleted||false;
    var RecCollection = mongoose.model(crud_config.COLLECTION_NAME);
    return new RecCollection({name : name, src : src, is_deleted : is_deleted});
  },
  
  createNewImg : function (name, path) {
    var RecCollection = mongoose.model(crud_config.COLLECTION_NAME),
      collection = new RecCollection({name:name});
      collection['is_deleted'] = false;
      collection['src'] = path+collection._id;
    return collection;
  },
  
  createNewIdImg : function (obj) {
    var RecCollection = mongoose.model(crud_config.COLLECTION_NAME),
      collection = new RecCollection(obj);
    return collection;
  },
  
  update : function () {
    return  mongoose.model(crud_config.COLLECTION_NAME).update;
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