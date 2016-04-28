(function(angular, $){
  
  "use strict";
  
  angular
    .module('galleryApp')
      .controller('createRecCtrl', ['$scope', '$timeout', 'RestService', 'Upload',  'constant', 'imgEditService', 'random', function ($scope, $timeout,RestService, Upload, c, imgEditService, random) {
      
        // initiate upload service
        var upload = {},
        // init edit service
         EditImg = new imgEditService(), 
        // upload data temp link
         uploadLink = null,
        // init hash for modul edit
         targetObj = {  
           
            data : {
              'imgTrumbBitD' : null, 
              'imgAng' : 0, 
              'imgTrumbAng' : 0 
            }
            
          };
        
          $scope.image = {
             trumbImg: null,
             trumbCroppedImg: null
          };
        
        // init wather for autogener id
      	  $scope.tmpid = null; 
         	  
      	// for directive eather drag is supported or not
          $scope.isDroppable = true;
          	
        $scope.rotate = function ( id, upTarget ) {
          	
          if (!id) return;
          
          EditImg.rotate(id);	
          
          $scope.angle = EditImg.rotateGetVal(id);
          $scope.tmpid = upTarget.tmpId;
         
          upTarget[c.DATA_NAME].angle = EditImg.rotateGetVal(id);
          
        };
          
        $scope.changeName = function( file_data, value ){
          
          if ( !file_data && !value ) return;
          
          file_data.data[c.DATA_IMG_NAME] = value;
          
        };
            
        $scope.upload = function( key, file_data ){
             var b = {};
          if (file_data == null || key == null) return;
            // add additionall crop data
          if (!file_data.data['imgTrumbBitD']) {
          
            EditImg.getDecodeToStr(file_data).done(function(cb) {
              
              file_data.data['imgTrumbBitD'] = cb;
             
            }).fail(cropErrListener);
             
          }
           
            console.log(2, b);
          //console.log(file_data);
            /*upload[key] = Upload.upload({
              url: c.UPLOAD_URL,
              data:{files:file_data}
            });
            
          $scope.getRequest(key);*/
          
        };
        
        $scope.uploadAll = function( files ){
         
          if (files == null) return;
          
          angular.forEach(files, function(value, key) {
            
            if (!value.data[c.CROP_KEY]) {
              EditImg.getDecodeToStr(value).done(function(cb) {
                value.data = cb; 
              }).fail(cropErrListener);
            }
            upload[key] = Upload.upload({
              url: c.UPLOAD_URL,
              data:{files:value}
            });
          
          $scope.getRequest(key);
          //console.log(value);
          });
          
        };
        
        $scope.cancel = function ( key ) {
          
          if (key == null || upload[key] == null) return;
          
          upload[key].abort();
          
        };
        
        $scope.cancelAll = function () {
          
          if (Object.keys(upload).length === 0) return;
          
          angular.forEach(upload, function(upload_value) {
            upload_value.abort();
          });
          
        };
        
        $scope.getRequest = function( key ) {
         
          upload[key].then(function (resp) {
            
            if(resp.data.error_code === 0){
              console.info('upload response  : ' + resp.config.data.files.name);
            } else if (resp.data.status>=200&&resp.data.status<300){
              console.info('file : ', resp.config.data.files.name, 'is uploaded');
                if (upload[key]) delete upload[key];
              } else {
                console.error('Error : ', resp.data);
                if (upload[key]) delete upload[key];
              }
          }, function (resp) {
             console.info('file : ', resp.config.data.files.name, 
             'aborted', '\n'+ 'status code', resp.status);
              if (upload[key]) delete upload[key];
          }, function (evt) { 
            
            var progress = parseInt(100.0 * evt.loaded / evt.total);
            
            console.log(progress + '% ' + evt.config.data.files.name);
            $scope.progress = 'progress: ' + progress + '% ';
          });
        
        };
        
        $scope.showFiles = function( data ) {
          
          upload = {};
          
          $scope.file_collection = createImgCollection(data);
          
        };
        
        function createImgCollection( data ) {
          
          if (!angular.isArray(data)||data.length<1) return;
          
          var dataHash = {};
          
          angular.forEach(data, function(value, key) {
            value[c.TMP_ID_NAME] = random.makeId();
            value[c.DATA_NAME] = {},
            this[key] = value;
          }, dataHash);
          
          return dataHash;
        }
        
        $scope.closeModule = function( key ) {
          var id = '#'+key;
          $(id).closeModal({
            
            complete: function() {
              
              if ($scope.image.trumbCroppedImg) targetObj.imgTrumbBitD = $scope.image.trumbCroppedImg, uploadLink[c.DATA_NAME]['imgTrumbBitD'] = targetObj.imgTrumbBitD;//, uploadLink[c.DATA_NAME] = targetObj.imgTrumbBitD;
              
              $scope.cropListener = null;
              $scope.trumbAngle = 0;
              $scope.image.trumbImg = null;
              $scope.image.trumbCroppedImg = null;
              
              EditImg.rotateClearId(c.DFLT_TRUMB_ID);	
            // remove module from view in ng-repeat
              var el = $(id).find(c.MODULE_VIEW_CLASS_NAME)[0];
              
              $(el).remove();
             
            }
          });
          
        };
        
        $scope.openModule = function( key, data ) {
        
         var id = '#'+key;
         // init current data link
         uploadLink = data;
          
          $(id).openModal({
            
            dismissible: true, // Modal can be dismissed by clicking outside of the modal
            
            ready: function() {
              $scope.cropListener = key;
              
              var getThumbnaiView = function(file){
                
                var reader = new FileReader();
               
                reader.onload = function (evt) {
                  $timeout(function(){
                    $scope.image.trumbImg = evt.target.result;
                  }, 0);
                };
                
                reader.readAsDataURL(file);
              };
              // run file Reader
              if (data && Object.keys(data).length !=0 ) getThumbnaiView(data);
                // rotate Thumbnail
              $scope.tmpId = null;
              
              $scope.rotateThumbnail = function () {
                	
                EditImg.rotate(c.DFLT_TRUMB_ID);	
                
                $scope.trumbAngle = EditImg.rotateGetVal(c.DFLT_TRUMB_ID);
                targetObj['imgTrumbAng'] = EditImg.rotateGetVal(c.DFLT_TRUMB_ID);
                // view crop in module
                uploadLink.data['imgTrumbAng'] = targetObj['imgTrumbAng'];
                
              };
                
            },
            // Callback for Modal close
            complete: function() {
              
             var el = $(id).find(c.MODULE_VIEW_CLASS_NAME)[0];
              $(el).remove();
              
              $scope.cropListener = null;
              $scope.image.trumbImg = null;
              $scope.image.trumbCroppedImg = null;
              
              EditImg.rotateClearId(c.DFLT_TRUMB_ID);	
            } 
          });
           
        };
        
        function cropErrListener(textStatus, errorThrown ) {
          console.error( 'Crop error: ' + errorThrown);
        } 
        
        
        
        
    }]);

})(angular, jQuery);