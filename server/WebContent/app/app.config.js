(function()
{
  'use strict';
  
  angular
    .module('rrs')
    .config(moduleConfig); //In case of config you shouldnt use config('moduleConfig', moduleConfig)

  moduleConfig.$inject = ['$routeProvider'];
  
  function moduleConfig ($routeProvider)
  {
       $routeProvider
        .when('/home', {
          //Template URL has to be relative to index.html
          templateUrl: 'app/home/homepage.tmpl.html',
          controller: 'HomepageController',
          controllerAs: 'homepageVm',
          activetab: 'home'
        })
        .when('/menu', {
          //Template URL has to be relative to index.html
          templateUrl: 'app/foodmenu/foodmenu.tmpl.html',
          controller: 'FoodMenuController',
          controllerAs: 'foodMenuVm',
          activetab: 'menu'
        })
        .when('/reservation', {
          //Template URL has to be relative to index.html
          templateUrl: 'app/reservation/reservation.tmpl.html',
          controller: 'ReservationController',
          controllerAs: 'reservationVm',
          activetab: 'reservation'
        })
        .when('/testimonials', {
          //Template URL has to be relative to index.html
          templateUrl: 'app/testimonials/testimonials.tmpl.html',
          controller: 'TestimonialsController',
          controllerAs: 'testimonialsVm',
          activetab: 'testimonials'
        })
        .when('/admin', {
          //Template URL has to be relative to index.html
          templateUrl: 'app/admin/admin.tmpl.html',
          controller: 'AdminController',
          controllerAs: 'adminVm',
          activetab: 'admin'
        })
        .otherwise({
          redirectTo: '/home'
        });
    }
})();

  