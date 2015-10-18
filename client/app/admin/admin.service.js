/**
 * Created by kesava on 10/18/2015.
 */
(function() {
    'use strict';

    angular
        .module('rrs')
        .service('adminService', adminService);

    adminService.$inject = ['$q', '$http'];

    function adminService($q, $http)
    {
        var self = this;

        //Functions
        self.getRestaurantDetails = getRestaurantDetails;


        //private members
        function getRestaurantDetails(id)
        {
            var defer = $q.defer();

            console.log("in service");
            $http
                .get('http://localhost:8080/RRSRestApi/api/restaurant/' + id)
                .then(successFn, errorFn);

            function successFn(response) {
                console.log("got response");
                console.log(response.data);
                defer.resolve(response.data);
            }

            function errorFn(error) {
                console.log("got error");
                defer.reject(error.statusText);
            }

            return defer.promise;
        }
    }
})();