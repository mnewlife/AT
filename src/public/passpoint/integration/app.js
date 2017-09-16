( function () {

  "use strict";

  angular.module( "Passpoint", [
    "ngMaterial",
    "ngAnimate",
    "ngRoute",
    "ngMessages",
    "dialog",
    "signIn",
    "signUp",
    "about"
  ] );

  angular.module( "Passpoint" ).config( [
    "$locationProvider",
    "$routeProvider",
    "$mdThemingProvider",
    function config ( $locationProvider, $routeProvider, $mdThemingProvider ) {

      $mdThemingProvider.theme( "default" )
        .primaryPalette( "indigo", {
          'default': '500',
          'hue-1': '700',
          'hue-2': '800'
        } )
        .accentPalette( "red", {
          'default': 'A200',
          'hue-1': 'A700',
          'hue-2': '900'
        } )
        .warnPalette( "red" );

      $routeProvider.
        when( "/sign-in", {
          template: "<sign-in></sign-in>"
        } ).
        when( "/sign-up", {
          template: "<sign-up></sign-up>"
        } ).
        when( "/about/", {
          template: "<about></about>"
        } ).
        otherwise( "/sign-in" );

    }

  ] );

  angular.module( "Passpoint" ).controller( "MainController", controller );

  controller.$inject = [
  ];

  function controller () {
    /* jshint validthis: true */
    var vm = this;

  }

} )();
