(function()
{
  'use strict';
  
  angular
    .module('rrs')
    .controller('FoodMenuController',FoodMenuController);

  FoodMenuController.$inject = ['$scope','$route'];
  
  // We dont need anything as of now for home page. This is for future usage
  function FoodMenuController ($scope,$route)
  {
    $scope.$route = $route;
  }
})();