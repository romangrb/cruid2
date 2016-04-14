module.exports = function (str){
  
  var n = str.indexOf('.');
  
  return (n>0)? str.slice(n, str.length) : '.tmp';
  
};