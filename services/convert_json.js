module.exports = function (res, cb){
  return  {
    json: function(){
            res.json(cb);
          }
    };
};