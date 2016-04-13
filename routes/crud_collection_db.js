var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser'); //parses information from POST
var methodOverride = require('method-override'); //used to manipulate POST
var toJSON = require('../services/convert_json');
var DbCrud = require('../services/crud_mongose_db');
var crud_config = require('../model/crud_model_constant');
  
router.use(bodyParser.urlencoded({ extended: true }));
  
router.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));
//build the REST operations at the db for model
router.route('/')
  .get(function(req, res, next) {
    
      DbCrud.findAll().exec(function(err, cb) {
        
        if (err) return console.log(crud_config.DB_CREATE_ERR_MSG);
        
        res.format(toJSON(res, cb));
      });
  })
  .post(function(req, res) {
    
      var name = req.body.name,
       src = req.body.src,
       is_deleted = req.body.is_deleted;
       
      try {
        if (name == null || src == null) throw new Error(crud_config.DB_ATTR_REC_MSG);
          
          DbCrud.create(name, src, is_deleted).save(function (err, cb) {
            
            if (err) throw new Error(crud_config.DB_CREATE_ERR_MSG);
            
            res.format(toJSON(res, cb));
          });
          
        } catch (err) {
          
          res.format(res.format(toJSON(res, err)));
          
          console.log(err.message);
        }
      
  });

router.param('id', function(req, res, next, id) {
      try {
        
        if (id == null) throw new Error(crud_config.DB_ATTR_REC_MSG);
        
          DbCrud.findById(id).exec(function(err, cb) {
            
            if (err) throw new Error(crud_config.DB_FIND_BY_ID_ERR_MSG);
            
            res.format(toJSON(res, cb));
          });
          
        } catch (err) { 
          
          console.log(err.message);
          req.id = id;
          next(); // go to the next fn
        }
});
  
router.route('/:id')
  .get(function(req, res) {
    try {
      
        if (req.id == null) throw new Error(crud_config.DB_ATTR_REC_MSG);
        
            DbCrud.findById(req.id).exec(function(err, cb) {
              
            if (err) throw new Error(crud_config.DB_FIND_BY_ID_ERR_MSG);
            
            res.format(toJSON(res, cb));
          });
          
        } catch (err) { 
          console.log(err.message);
        }
  });


module.exports = router;

console.log("MONGOOSE MODULE IS LOADED");