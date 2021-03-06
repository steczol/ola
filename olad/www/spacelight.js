(function(angular) {
  'use strict';
angular
	.module('SpacelightSettings', ['ngRoute'])
	.constant('OLA', {
    'MIN_CHANNEL_NUMBER': 1,
    'MAX_CHANNEL_NUMBER': 512,
    'MIN_CHANNEL_VALUE': 0,
    'MAX_CHANNEL_VALUE': 255,
	'INTENSITY': 50
  })
	.factory('$ola', ['$http', '$window', 'OLA',
    function($http, $window, OLA) {
      'use strict';
      // TODO(Dave_o): once olad supports json post data postEncode
      // can go away and the header in post requests too.
      var postEncode = function(data) {
        var PostData = [];
        for (var key in data) {
          if (data.hasOwnProperty(key)) {
            if (key === 'd' ||
              key === 'remove_ports' ||
              key === 'modify_ports' ||
              key === 'add_ports') {
              // this is here so some posts don't get broken
              // because of removed comma's in arrays
              PostData.push(key + '=' + data[key]);
            } else {
              PostData.push(key + '=' + encodeURIComponent(data[key]));
            }
          }
        }
        return PostData.join('&');
      };
	var channelValueCheck = function(i) {
        i = parseInt(i, 10);
        if (i < OLA.MIN_CHANNEL_VALUE){
          i = OLA.MIN_CHANNEL_VALUE;
        } else if (i > OLA.MAX_CHANNEL_VALUE){
          i = OLA.MAX_CHANNEL_VALUE;
        }
        return i;
      };
	
	var dmxConvert = function(dmx) {
        var strip = true;
        var integers = [];
        for (var i = OLA.MAX_CHANNEL_NUMBER; i >= OLA.MIN_CHANNEL_NUMBER; i--) {
          var value = channelValueCheck(dmx[i - 1]);
          if (value > OLA.MIN_CHANNEL_VALUE ||
              !strip ||
              i === OLA.MIN_CHANNEL_NUMBER){
            integers[i - 1] = value;
            strip = false;
          }
        }
        return integers.join(',');
      };
      return {
        get: {
		Dmx: function(id) {
            return $http({
              method: 'GET',
              url: '/get_dmx',
              params: {
                'u': id
              }
            })
              .then(function(response) {
                return response.data;
              });
          },
          SpacelightInfo: function() {
            return $http.get('/json/spacelight_stats')
              .then(function(response) {
                return response.data;
              });
          },   
        },
        post: {
          Dmx: function(universe, dmx) {
            var data = {
              u: universe,
              d: dmxConvert(dmx)
            };
            return $http({
              method: 'POST',
              url: '/set_spacelight',
              data: postEncode(data),
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              }
            }).then(function(response) {
              return response.data;
            });
          }
		},
        action: {
          Reload: function() {
            return $http.get('/reload')
              .then(function(response) {
                return response.data;
              });
          }
        }
      };
    }
  ])	
	.controller('IntensityController', ['$scope', '$ola', '$interval', '$location',
    function($scope, $ola, $interval, $location) {
      'use strict';
      $scope.Items = {};
      $scope.Info = {};
	$scope.get = [];
	 $scope.dmx = [];
      var getData = $interval(function() {
        $ola.get.SpacelightInfo().then(function(data) {
          $scope.Info = data;
		//alert("data[0]: "+ $scope.Info.Intensity);
		//alert("data[1]: "+ $scope.Info.ColorTemperature);
	     });
      }, 5000);

    }])  	
  	.controller('IntensityController_bak', ['$scope', '$ola', '$interval', '$location', 'OLA', 
  	function($scope, $ola, $interval, $location, OLA) {
	$scope.get = [];
	var zero_get = function(){
		for(var i=0; i<512; i++){
			$scope.get[i]=0;
			}
	return $scope.get;
	}
	$scope.dmx = [];
	$scope.OLA = OLA;
	$scope.Info = {};
     $scope.Universe = 1;

   	var _name = 'Brian';
	//var res;
	var _intensity;
	var _colortemp;
	var _dmx; // = 50;
	var int_dmx;
	var ct_dmx;
	var int2dmx = function(val){
		var intensity_slope = 255/100;
		int_dmx= val * intensity_slope;
		return int_dmx;
	}
	var ct2dmx = function(val){
		var colortemp_slope = 255/3000;
		ct_dmx= (val-3000) * colortemp_slope;
		return ct_dmx;
	}
    	$scope.user = {
      name: function(newName) {
       // Note that newName can be undefined for two reasons:
       // 1. Because it is called as a getter and thus called with no arguments
       // 2. Because the property should actually be set to undefined. This happens e.g. if the
       //    input is invalid
       return arguments.length ? (_name = newName) : _name;
      },
	pass: function(){
	}
    };
	$scope.intensity = {

	 set: function(val){
		
		//_intensity = $scope.Info.Intensity;
		_intensity = _intensity+val;
		//_intensity = res;
		
		if(_intensity>100){_intensity=100;}
		else if(_intensity<0){_intensity=0;}
		$scope.get[_dmx-1]= int2dmx(_intensity);
		$ola.post.Dmx($scope.Universe, $scope.get);
		//$ola.post.Dmx($scope.Universe, $scope.get);
		//alert("current intensity is: "+ _intensity);
		$scope.Info.Intensity = _intensity;
		return _intensity;
	}, 
	 get: function(){
		return _intensity;
	}	


	};
	 $scope.colortemp = {

	 set: function(val){
		//_colortemp = $scope.Info.ColorTemperature;
		_colortemp = _colortemp+val;
		//_intensity = res;
		
		if(_colortemp>6000){_colortemp=6000;}
		else if(_colortemp<3000){_colortemp=3000;}
		$scope.get[_dmx] = ct2dmx(_colortemp);
		$ola.post.Dmx($scope.Universe, $scope.get);
		//$ola.post.Dmx($scope.Universe, $scope.get);
		//alert("current intensity is: "+ _intensity);
		$scope.Info.ColorTemperature = _colortemp;
		return _colortemp;
	}, 
	 get: function(){
		return _colortemp; //The same for dmx!!!!!
		
	}	


	};

	 $scope.dmx = {

	 set: function(val){
		//_dmx = $scope.Info.DMX ;
		_dmx = _dmx+val;
		//_intensity = res;
		
		if(_dmx>512){_dmx=512;}
		else if(_dmx<1){_dmx=1;}
		$ola.post.Dmx($scope.Universe, $scope.get);
		$scope.get[_dmx+1] = _dmx;
		//$ola.post.Dmx($scope.Universe, $scope.get);
		//alert("current intensity is: "+ _intensity);
		$scope.Info.DMX = _dmx;
		return _dmx;
	}, 
	 get: function(){
		return _dmx; 
		
	}	


	};

	var getData = $interval(function() {
        $ola.get.SpacelightInfo().then(function(data) {
          $scope.Info = data;
		_intensity = $scope.Info.Intensity
		_colortemp = $scope.Info.ColorTemperature;
		_dmx = $scope.Info.DMX;
		zero_get();
		$scope.get[_dmx-1] = int2dmx(_intensity);
		$scope.get[_dmx] = ct2dmx(_colortemp);
		$scope.get[_dmx+1] = _dmx;
		
		//alert("data[0]: "+ $scope.Info.Intensity);
		//alert("data[1]: "+ $scope.Info.ColorTemperature);
	     });
      }, 5000);
/*	var interval = $interval(function() {
        $ola.get.Dmx($scope.Universe).then(function(data) {
          for (var i = 0; i < OLA.MAX_CHANNEL_NUMBER; i++) {
            $scope.dmx[i] =
              (typeof data.dmx[i] === 'number') ?
                data.dmx[i] : OLA.MIN_CHANNEL_VALUE;
          }
        });
      }, 5000);*/
	 /*var dmxGet = $interval(function() {
        $ola.get.Dmx($scope.Universe).then(function(data) {
          for (var i = 0; i < OLA.MAX_CHANNEL_NUMBER; i++) {
            if (i < data.dmx.length) {
              $scope.get[i] = data.dmx[i];
            } else {
              $scope.get[i] = OLA.MIN_CHANNEL_VALUE;
            }
          }
          $scope.send = true;
        });
      }, 5000); */

 /*
	$scope.currInt = 50;
  	$scope.setIntensity = function(val){
      
      res = $scope.currInt+val;
      $scope.currInt = res;
    		alert("current intensity is: "+ res);
      return res;
  	};
 	$scope.getIntensity = function(){
 	return $scope.currInt;
 	}; */

  }]);
})(window.angular);
