(function()
{
  'use strict';
  
  angular
    .module('rrs')
    .controller('ReservationController',ReservationController);

  ReservationController.$inject = ['$scope','$route','$filter','reservationService'];
  
  // We dont need anything as of now for home page. This is for future usage
  function ReservationController ($scope,$route,$filter, reservationService)
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

    // We need to clear the reservation object on page reload, to avoid picking previous reservation object
    $scope.$on('$viewContentLoaded', function(){
      reservationVm.reservation = null;
    });


    /** Function definitions */
    function createReservation(form)
    {
      //create reservation object for server
      // Details provided by customer

      console.log("reservationVm.reservation in create");

      //check if form is valid i.e if we have pristine elements which might be
      //missed by validation in HTML page
      if(!reservationService
          .isValidForm(reservationVm.reservation,form))
      {
        return;
      }

      reservationVm.newReservation = {};
      reservationVm.newReservation.first_name = reservationVm.reservation.first_name;
      reservationVm.newReservation.last_name = reservationVm.reservation.last_name;
      reservationVm.newReservation.customerEmail = reservationVm.reservation.customerEmail;
      reservationVm.newReservation.phone = "" + reservationVm.reservation.phone; // String in server
      reservationVm.newReservation.partySize = reservationVm.reservation.partySize;
      reservationVm.newReservation.datetime = reservationService.getDateTimeString(reservationVm.reservation.date);


      //now use the reservation service to store in database
      reservationService
          .createReservation(reservationVm.newReservation)
          .then(function(reservation)
          {
            reservationVm.reservation = reservation;
          },function(errorMsg)
          {
            reservationVm.reservation = null;
          });

      reservationVm.reservation = null;
      form.$setPristine();

    }

    function editReservation(confNo)
    {

    }

    function getReservation(form)
    {
      reservationService
          .getReservation(reservationVm.reservation.confNo)
          .then(function(reservation)
          {
            reservationVm.reservation = reservation;
            console.log('Did I come in success?');
          },function(errorMsg)
          {
            console.log('Did I come here?');
            reservationVm.reservation = null;
          });
    }

    function deleteReservation()
    {

    }

    //Convert date and time into one string
    function getDateTimeString()
    {
      var date = reservationVm.reservation.date;
      console.log('Time value is :'+ rtime);
      console.log('Filter Time value is :'+ $filter('date')(rtime, 'HH-mm'));
      return "" + $filter('date')(date, 'yyyy-MM-dd') +"-"+ $filter('date')(rtime, 'HH-mm');
    }
  }
})();