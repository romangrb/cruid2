(function(){
  
  "use strict";
  
  angular
    .module('galleryApp')
      .controller('createRecCtrl', ['$scope', 'RestService', 'Upload', function ($scope, RestService, Upload) {
      
      $scope.tagline = 'This is Create controler !';
      
      var vm = this;
      vm.submit = function(){ //function to call on form submit
        if (vm.upload_form.file.$valid && vm.file) { //check if from is valid
            vm.upload(vm.file); //call upload function
        }
      }
      
      vm.upload = function (file) {
        Upload.upload({
          url: 'https://ide.c9.io/romangrb/file-upload/upload', //webAPI exposed to upload the file
          data:{file:file} //pass file as data, should be user ng-model
        }).then(function (resp) { //upload function returns a promise
          if(resp.data.error_code === 0){ //validate success
            console.info('Success ' + resp.config.data.file.name + 'uploaded. Response: ');
          } else {
            console.error('an error occured');
          }
        }, function (resp) { //catch error
          console.warn('Error status: ' + resp.status);
          console.error('Error status: ' + resp.status);
        }, function (evt) { 
          //console.log(evt);
          var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
          console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
          vm.progress = 'progress: ' + progressPercentage + '% '; // capture upload progress
        });
      };
     
      
    }]);

})();