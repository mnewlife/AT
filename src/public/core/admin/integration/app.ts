module App {

  import components = CoreAdminComponentsIntegration;
  import services = CoreAdminServicesIntegration;

  angular.module( "CoreAdmin", [
    "ngMaterial",
    "ngAnimate",
    "ngRoute",
    "ngMessages",
    "profileComponent",
    "editProfileComponent",
    "contextsService"
  ] );

  angular.module( "CoreAdmin" ).config( config );

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
        'default': '400',
        'hue-1': '700',
        'hue-2': '800'
      } )
      .accentPalette( "deep-orange", {
        'default': '500',
        'hue-1': 'A700',
        'hue-2': '900'
      } )
      .warnPalette( "red" );

    $routeProvider.
      when( "/profile", {
        template: "<profile-component></profile-component>"
      } )
      .when( "/edit-profile", {
        template: "<edit-profile-component></edit-profile-component>"
      } )
      .otherwise( {
        template: "<profile-component></profile-component>"
      } );

  }

  angular.module( "CoreAdmin" ).controller( "MainController", () => { } );

  components.integrate();
  services.integrate();

}
