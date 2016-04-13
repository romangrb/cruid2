var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bodyParser = require('body-parser'); //parses information from POST
var methodOverride = require('method-override'); //used to manipulate POST
var DbCrud = require('../services/crud_mongose_db');
var crud_config = require('../model/crud_model_constant');
  //Any requests to this controller must pass through this 'use' function
  //Copy and pasted from method-override
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
        
        res.format({json: function(){
                      res.json(cb);
                    }
        });
        
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
            
              res.format({json: function(){
                            res.json(cb);
                          }
              });
              
            });
        
        } catch (err) {
          console.log(err.message);
        }
      
  });

// route middleware to validate :id
router.param('id', function(req, res, next, id) {
  //find the ID in the db
  mongoose.model(crud_config.COLLECTION_NAME).findById(id, function (err, data) {
    //if it isn't found, we are going to repond with 404
    if (err) {
      console.log(id + ' was not found');
      res.status(404);
      var err = new Error('Not Found');
      err.status = 404;
      res.format({
          json: function(){
             res.json({message : err.status  + ' ' + err});
           }
      });
    } else {
      //uncomment this next line if you want to see every JSON document response for every GET/PUT/DELETE call
      // once validation is done save the new item in the req
      req.id = id;
      // go to the next thing
      next(); 
    } 
  });
});

router.route('/:id')
  .get(function(req, res) {
    mongoose.model(crud_config.COLLECTION_NAME).findById(req.id, function (err, data) {
      if (err) {
        console.log('GET Error: There was a problem retrieving: ' + err);
      } else {
        console.log('GET Retrieving ID: ' + data._id);
        res.format({
          json: function(){
              res.json(data);
          }
        });
      }
    });
  });

router.route('/next')
  .get(function(req, res) {
    mongoose.model(crud_config.COLLECTION_NAME).findById(req.id, function (err, data) {
      if (err) {
        console.log('GET Error: There was a problem retrieving: ' + err);
      } else {
        console.log('GET Retrieving ID: ' + data._id);
        res.format({
          json: function(){
              res.json(data);
          }
        });
      }
    });
  });

router.route('/:id/edit')
	//GET the individual 'collection' by Mongo ID
	.get(function(req, res) {
    //search for the 'collection' within Mongo
    mongoose.model(crud_config.COLLECTION_NAME).findById(req.id, function (err, data) {
      if (err) {
        console.log('GET Error: There was a problem retrieving: ' + err);
      } else {
        //Return the 'collection'
        console.log('GET Retrieving ID: ' + data._id);
        res.format({
           //JSON response will return the JSON output
          json: function(){
            res.json(data);
           }
        });
      }
    });
	})
	//PUT to update a 'collection' by ID
	.put(function(req, res) {
    // Get our REST or form values. These rely on the "name" attributes
      var name = req.body.name;
      var src = req.body.src;
      var is_deleted = req.body.is_deleted;
      //find the document by ID
      mongoose.model(crud_config.COLLECTION_NAME).findById(req.id, function (err, data) {
        //update it
        data.update({
          name : name,
          src : src,
          is_deleted : is_deleted
        }, function (err, dataID) {
          if (err) {
            res.send("There was a problem updating the information to the database: " + err);
          } else {
            //HTML responds by going back to the page or you can be fancy and create a new view that shows a success page.
            res.format({
               //JSON responds showing the updated values
              json: function(){
                res.json(data);
               }
            });
           }
	        });
	    });
	})
	//DELETE a collection by ID
	.delete(function (req, res){
    //find collection by ID
    mongoose.model(crud_config.COLLECTION_NAME).findById(req.id, function (err, data) {
      if (err) {
        return console.error(err);
      } else {
        //remove it from Mongo
        data.remove(function (err, data) {
          if (err) {
            return console.error(err);
          } else {
            //Returning success messages saying it was deleted
            console.log('DELETE removing ID: ' + data._id);
            res.format({
                 //JSON returns the item with the message that is has been deleted
                json: function(){
                  res.json({message : 'deleted',
                    item : data
                  });
                 }
              });
            }
          });
        }
	    });
	});
	
// https://cruid2-romangrb-1.c9users.io/img/docs?skip=1&lim=0

router.get('/docs*', function(req, res) {
  
  var q = {}, qReq = req.query, skipNum=0, limNum=5;
  
  if (Object.keys(req.query).length){
    q.skip = ((qReq.skip)&&isNumeric(qReq.skip))?parseInt(qReq.skip, 10):skipNum;
    q.limNum = ((qReq.lim)&&isNumeric(qReq.lim))?parseInt(qReq.lim, 10):limNum;
  }
  
  mongoose.model(crud_config.COLLECTION_NAME)
    .find({}, {}, q, function (err, data) {
      if (err) {
        return console.error(err);
      } else {
      res.format({
        json: function(){
          res.json(data);
        }
      });
    }    
  });
});

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}


module.exports = router;

console.log("MONGOOSE MODULE IS LOADED");