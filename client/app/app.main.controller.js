/**
 * Created by kesava on 10/17/2015.
 */
(function()
{
    'use strict';

    angular
        .module('rrs')
        .controller('MainController',MainController);

    MainController.$inject = ['$scope','$route'];

    // We dont need anything as of now for home page. This is for future usage
    function MainController ($scope,$route)
    {
        $scope.$route = $route;
    }
})();