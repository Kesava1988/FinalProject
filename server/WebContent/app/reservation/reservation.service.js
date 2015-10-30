/**
 * Created by kesava on 10/18/2015.
 */
(function() {
    'use strict';

    angular
        .module('rrs')
        .service('reservationService', reservationService);

    reservationService.$inject = ['$q', '$http','$filter'];

    function reservationService($q, $http, $filter) {
        var self = this;

        self.isValidForm = isValidForm;
        self.createReservation = createReservation;
        self.editReservation = editReservation;
        self.getReservation = getReservation;
        self.deleteReservation = deleteReservation;
        self.getDateTimeString = getDateTimeString;


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

            return true;
        }


        //Convert date and time into one string
        function getDateTimeString(date)
        {
            console.log('Filter Time value is :'+ $filter('date')(date, 'HH-mm'));
            return "" + $filter('date')(date, 'yyyy-MM-dd-HH-mm')
        }

        function getDateTimeFromString(datetime)
        {
        	var turnedVal = datetime.substr(0,10)+' '+(datetime.replace(/-/g,":")).substr(11) +':00';
            return new Date(Date.parse(turnedVal));
        }

        function createReservation(reservation)
        {
            var defer = $q.defer();

            console.log("Reservation object to server");
            console.dir(reservation);

            $http
                .post('http://localhost:8080/RRSRestApi/api/reservation/reserve', reservation)
                .then(successFn, errorFn);

            function successFn(response) {
                defer.resolve(convertToFormObject(response.data));
            }

            function errorFn(error) {
                defer.reject(error.statusText);
            }

            return defer.promise;
        }

        function editReservation(reservation)
        {
        	 var defer = $q.defer();

             console.log("Reservation object to server");
             console.dir(reservation);

             $http
                 .put('http://localhost:8080/RRSRestApi/api/reservation/editreservation', reservation)
                 .then(successFn, errorFn);

             function successFn(response) {
                 defer.resolve(convertToFormObject(response.data));
             }

             function errorFn(error) {
                 defer.reject(error.statusText);
             }

             return defer.promise;
        }

        function getReservation(confNo)
        {
            var defer = $q.defer();

            $http
                .get('http://localhost:8080/RRSRestApi/api/reservation/'+ confNo)
                .then(successFn, errorFn);

            function successFn(response) {
                defer.resolve(convertToFormObject(response.data));
            }

            function errorFn(error) {
                defer.reject(error.statusText);
            }

            return defer.promise;
        }

        function deleteReservation(id)
        {

        }

        function convertToFormObject(reservation)
        {
            var formObject = {};

            formObject.first_name = reservation.first_name;
            formObject.last_name = reservation.last_name;
            formObject.customerEmail = reservation.customerEmail;
            formObject.phone = (reservation.phone).valueOf(); // String in server
            formObject.partySize = reservation.partySize;
            formObject.date = getDateTimeFromString(reservation.datetime);
            formObject.confNo = reservation.confNo;
            formObject.status = (reservation.status).valueOf() == 0?'Waiting':'Confirmed';
            console.log('What is the status : '+formObject.status);
            return formObject;
        }
    }
})();