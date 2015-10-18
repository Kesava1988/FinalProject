(function()
{
  'use strict';
  
  angular
    .module('rrs')
    .controller('ReservationController',ReservationController);

  ReservationController.$inject = ['$scope','$route','reservationService'];
  
  // We dont need anything as of now for home page. This is for future usage
  function ReservationController ($scope,$route,reservationService)
  {
    $scope.$route = $route;

    var reservationVm = this;

    /** Objects */
    /** we need two reservation object, one for form with date and time objects */
    /** Other object for backend with date and time converted to string */
    reservationVm.reservation = null;
    reservationVm.newReservation = null;

    /** Functions */
    reservationVm.createReservation = createReservation;
    reservationVm.editReservation = editReservation;
    reservationVm.getReservation = getReservation;
    reservationVm.deleteReservation = deleteReservation;


    /** Function definitions */
    function createReservation(form)
    {
      form.$setPristine();

      //create reservation object for server
      // Details provided by customer

      reservationVm.newReservation.first_name = reservationVm.reservation.first_name;
      reservationVm.newReservation.last_name = reservationVm.reservation.last_name;
      reservationVm.newReservation.customerEmail = reservationVm.reservation.customerEmail;
      reservationVm.newReservation.phone = "" + reservationVm.reservation.phone; // String in server
      reservationVm.newReservation.partySize = reservationVm.reservation.partySize;
      reservationVm.newReservation.datetime = "";


    }
  }
})();