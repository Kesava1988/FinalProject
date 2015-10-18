/**
 * Created by kesava on 10/18/2015.
 */
(function() {
    'use strict';

    angular
        .module('rrs')
        .service('employeeService', employeeService);

    employeeService.$inject = ['$q', '$http'];

    function employeeService($q, $http) {
        var self = this;

        self.createReservation = createReservation;
        self.editReservation = editReservation;
        self.getReservation = getReservation;
        self.deleteReservation = deleteReservation;


        //private members
        function getEmployees() {

            var defer = $q.defer();

            $http
                .get('http://jsonplaceholder.typicode.com/users')
                .then(successFn, errorFn);

            function successFn(response) {
                defer.resolve(response.data);
            }

            function errorFn(error) {
                defer.reject(error.statusText);
            }

            return defer.promise;
        }



        function getEmployeeById(id) {
            var defer = $q.defer();

            $http
                .get('http://jsonplaceholder.typicode.com/users/' + id)
                .then(successFn, errorFn);

            function successFn(response) {
                defer.resolve(response.data);
            }

            function errorFn(error) {
                defer.reject(error.statusText);
            }

            return defer.promise;
        }

        function createEmployee(emp) {
            var defer = $q.defer();

            $http
                .post('http://jsonplaceholder.typicode.com/users', emp)
                .then(successFn, errorFn);

            function successFn(response) {
                defer.resolve(response.data);
            }

            function errorFn(error) {
                defer.reject(error.statusText);
            }

            return defer.promise;
        }

        function deleteEmployee(id) {

        }
    }
})();