(function()
{
  'use strict';
  
  angular
    .module('rrs')
    .controller('ReservationController',ReservationController);

  ReservationController.$inject = ['$scope','$route'];
  
  // We dont need anything as of now for home page. This is for future usage
  function ReservationController ($scope,$route)
  {
    $scope.$route = $route;
  }
})();