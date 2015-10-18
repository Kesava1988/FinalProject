(function()
{
  'use strict';
  
  angular
    .module('rrs')
    .controller('HomepageController',HomepageController);

  HomepageController.$inject = ['$scope','$route'];
  
  // We dont need anything as of now for home page. This is for future usage
  function HomepageController ($scope,$route)
  {
    $scope.$route = $route;
  }
})();