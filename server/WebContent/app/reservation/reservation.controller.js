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


    /** Function definitions */
    function createReservation(form)
    {
      //create reservation object for server
      // Details provided by customer

      console.log("reservationVm.reservation in create");

      //Check if empty form is sumitted or if some of the values are untouched
      if(reservationVm.reservation === null)
      {
        form.first_name.$setDirty();
        return;
      }
      else if(reservationVm.reservation.first_name === undefined || reservationVm.reservation.first_name === null)
      {
        form.first_name.$setDirty();
        return;
      }
      else if(reservationVm.reservation.last_name === undefined || reservationVm.reservation.last_name === null)
      {
        form.last_name.$setDirty();
        return;
      }
      else if(reservationVm.reservation.customerEmail === undefined || reservationVm.reservation.customerEmail === null)
      {
        form.customerEmail.$setDirty();
        return;
      }
      else if(reservationVm.reservation.phone === undefined || reservationVm.reservation.phone === null)
      {
        form.phone.$setDirty();
        return;
      }
      else if(reservationVm.reservation.partySize === undefined || reservationVm.reservation.partySize === null)
      {
        form.partySize.$setDirty();
        return;
      }
      else if(reservationVm.reservation.date === undefined || reservationVm.reservation.date === null)
      {
        form.date.$setDirty();
        return;
      }
      else if(reservationVm.reservation.rtime === undefined || reservationVm.reservation.rtime === null)
      {
        form.rtime.$setDirty();
        return;
      }

      reservationVm.newReservation = {};
      reservationVm.newReservation.first_name = reservationVm.reservation.first_name;
      reservationVm.newReservation.last_name = reservationVm.reservation.last_name;
      reservationVm.newReservation.customerEmail = reservationVm.reservation.customerEmail;
      reservationVm.newReservation.phone = "" + reservationVm.reservation.phone; // String in server
      reservationVm.newReservation.partySize = reservationVm.reservation.partySize;
      reservationVm.newReservation.datetime = getDateTimeString();


      //now use the reservation service to store in database
      reservationService
          .createReservation(reservationVm.newReservation)
          .then(function(reservation)
          {

          },function(errorMsg)
          {});

      reservationVm.reservation = null;
      form.$setPristine();

    }

    function editReservation()
    {

    }

    function getReservation()
    {

    }

    function deleteReservation()
    {

    }

    //Convert date and time into one string
    function getDateTimeString()
    {
      var date = reservationVm.reservation.date;
      var rtime = reservationVm.reservation.rtime;
      console.log('Time value is :'+ rtime);
      console.log('Filter Time value is :'+ $filter('date')(rtime, 'HH-mm'));
      return "" + $filter('date')(date, 'yyyy-MM-dd') +"-"+ $filter('date')(rtime, 'HH-mm');
    }
  }
})();