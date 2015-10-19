/**
 * Created by kesava on 10/18/2015.
 */
(function() {
    'use strict';

    angular
        .module('rrs')
        .service('reservationService', reservationService);

    reservationService.$inject = ['$q', '$http'];

    function reservationService($q, $http) {
        var self = this;

        self.createReservation = createReservation;
        self.editReservation = editReservation;
        self.getReservation = getReservation;
        self.deleteReservation = deleteReservation;


        //private members
        function createReservation(reservation)
        {
            var defer = $q.defer();

            console.log("Reservation object to server");
            console.dir(reservation);

            $http
                .post('http://localhost:8080/RRSRestApi/api/reservation/reserve', reservation)
                .then(successFn, errorFn);

            function successFn(response) {
                defer.resolve(response.data);
            }

            function errorFn(error) {
                defer.reject(error.statusText);
            }

            return defer.promise;
        }

        function editReservation(reservation)
        {

        }

        function getReservation(id)
        {

        }

        function deleteReservation(id)
        {

        }
    }
})();