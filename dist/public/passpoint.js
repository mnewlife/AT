( function () {

  "use strict";

  angular.module( "Ximex" , [
    "ngMaterial" ,
    "ngAnimate" ,
    "ngRoute" ,
    "ngMessages" ,
    "signIn" ,
    "signUp" ,
    "about" ,
    "tamperedWith"
  ] );

  angular.module( "Ximex" ).config( [
    "$locationProvider" ,
    "$routeProvider" ,
    "$mdThemingProvider" ,
    function config ( $locationProvider , $routeProvider , $mdThemingProvider ) {

      $mdThemingProvider.theme( "default" )
        .primaryPalette( "indigo" , {
          'default' : '500',
          'hue-1' : '100',
          'hue-2' : '500',
          'hue-3' : '700'
        } )
        .accentPalette( "deep-orange" , {
          'default' : 'A400',
          'hue-1' : '100',
          'hue-2' : '500',
          'hue-3' : '700'
        } )
        .warnPalette( "red" );

      $routeProvider.
        when( "/sign-up" , {
          template : "<sign-up></sign-up>"
        } ).
        when( "/sign-in" , {
          template : "<sign-in></sign-in>"
        } ).
        when( "/about" , {
          template : "<about></about>"
        } ).
        when( "/tampered-with" , {
          template : "<tampered-with></tampered-with>"
        } ).
        otherwise( "/about" );

    }

  ] );

  angular.module( "Ximex" ).controller( "MainController" , controller );

  function controller () {
    /* jshint validthis: true */
    var vm = this;

  }

} )();
