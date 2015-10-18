/**
 * Created by kesava on 10/17/2015.
 */
(function()
{
    'use strict';

    angular
        .module('rrs')
        .controller('MainController',MainController);

    MainController.$inject = ['$scope','$route','adminService'];

    // We dont need anything as of now for home page. This is for future usage
    function MainController ($scope,$route,adminService)
    {
        $scope.$route = $route;

        //restaurant related properties like opening time, closing time etc.
        $scope.opentime = "";
        $scope.closetime = "";

        var mainVm = this;

        mainVm.restaurantDetails = null;

        /** Functions */
        mainVm.getRestaurantDetails = getRestaurantDetails;


        init();

        function init()
        {
            mainVm.getRestaurantDetails();

            console.log("In init");
        }

        /** Function definitions */
        function getRestaurantDetails()
        {
            console.log("in function");
            //hard coding restaurant id = 1;
            var id = 1;
            adminService
                .getRestaurantDetails(id)
                .then(function(restaurantDetails)
                {
                    mainVm.restaurantDetails = restaurantDetails;
                    console.log(mainVm.restaurantDetails);
                    
                    var openTimiming = mainVm.restaurantDetails.open_time;
                    var otTokens = openTimiming.split('-');
                    if(otTokens.length == 5)
                    {
                        $scope.opentime = otTokens[3] + "-" + otTokens[4];
                    }

                    var closeTimiming = mainVm.restaurantDetails.close_time;
                    var ctTokens = closeTimiming.split('-');
                    if(ctTokens.length == 5)
                    {
                        $scope.closetime = ctTokens[3] + "-" + ctTokens[4];
                    }
                },function(errorMsg)
                {
                    console.log(errorMsg);
                });
        }
    }
})();