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

        self.isValidForm = isValidForm;
        self.createReservation = createReservation;
        self.editReservation = editReservation;
        self.getReservation = getReservation;
        self.deleteReservation = deleteReservation;


        //private members
        function isValidForm(reservation,form)
        {
            //Check if empty form is sumitted or if some of the values are untouched
            if(reservation === null)
            {
                form.first_name.$setDirty();
                return false;
            }
            else if(reservation.first_name === undefined || reservation.first_name === null)
            {
                form.first_name.$setDirty();
                return false;
            }
            else if(reservation.last_name === undefined || reservation.last_name === null)
            {
                form.last_name.$setDirty();
                return false;
            }
            else if(reservation.customerEmail === undefined || reservation.customerEmail === null)
            {
                form.customerEmail.$setDirty();
                return false;
            }
            else if(reservation.phone === undefined || reservation.phone === null)
            {
                form.phone.$setDirty();
                return false;
            }
            else if(reservation.partySize === undefined || reservation.partySize === null)
            {
                form.partySize.$setDirty();
                return false;
            }
            else if(reservation.date === undefined || reservation.date === null)
            {
                form.date.$setDirty();
                return false;
            }
            else if(reservation.rtime === undefined || reservation.rtime === null)
            {
                form.rtime.$setDirty();
                return false;
            }

            return true;
        }

        function createReservation(reservation,form)
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