(function()
{
  'use strict';
  
  angular
    .module('rrs')
    .controller('TestimonialsController',TestimonialsController);

  TestimonialsController.$inject = ['$scope','$route'];
  
  // We dont need anything as of now for home page. This is for future usage
  function TestimonialsController ($scope,$route)
  {
    $scope.$route = $route;
  }
})();