(function()
{
  'use strict';
  
  angular
    .module('rrs')
    .controller('AdminController',AdminController);

  AdminController.$inject = ['$scope','$route'];
  
  // We dont need anything as of now for home page. This is for future usage
  function AdminController ($scope,$route)
  {
    $scope.$route = $route;
  }
})();