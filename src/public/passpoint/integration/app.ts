module App {

  angular.module( "Passpoint", [
    "ngMaterial",
    "ngAnimate",
    "ngRoute",
    "ngMessages",
    "signInComponent",
    "signUpComponent"
  ] );

  angular.module( "Passpoint" ).config( config );

  config.$inject = [
    "$locationProvider",
    "$routeProvider",
    "$mdThemingProvider"
  ];

  function config (
    $locationProvider: ng.ILocationProvider,
    $routeProvider: ng.route.IRouteProvider,
    $mdThemingProvider: ng.material.IThemingProvider
  ) {

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
      } )
      .otherwise( {
        template: "<sign-in></sign-in>"
      } );

    angular.module( "Passpoint" ).controller( "MainController", () => { } );

  }

  ComponentsIntegration.integrate();
  ServicesIntegration.integrate();

}
