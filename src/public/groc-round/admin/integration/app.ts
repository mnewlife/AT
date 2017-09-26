module App {

  import components = GrocRoundAdminComponentsIntegration;
  import services = GrocRoundAdminServicesIntegration;

  angular.module( "GrocRoundAdmin", [
    "ngMaterial",
    "ngAnimate",
    "ngRoute",
    "ngMessages",
    "shopsComponent",
    "shopComponent",
    "addEditShopComponent",
    "productsComponent",
    "productComponent",
    "addEditProductComponent",
    "contextsService",
    "profileService"
  ] );

  angular.module( "GrocRoundAdmin" ).config( config );

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
      .warnPalette( "red" )
      .dark();

    $routeProvider.
      when( "/shops", {
        template: "<shops-component></shops-component>"
      } )
      .when( "/shops/:shopId", {
        template: "<shop-component></shop-component>"
      } )
      .when( "/add-edit-shop", {
        template: "<add-edit-shop-component></add-edit-shop-component>"
      } )
      .when( "/add-edit-shop/:shopId", {
        template: "<add-edit-shop-component></add-edit-shop-component>"
      } )
      .when( "/products", {
        template: "<products-component></products-component>"
      } )
      .when( "/products/:productId", {
        template: "<product-component></product-component>"
      } )
      .when( "/add-edit-product", {
        template: "<add-edit-product-component></add-edit-product-component>"
      } )
      .when( "/add-edit-product/:productId", {
        template: "<add-edit-product-component></add-edit-product-component>"
      } )
      .otherwise( {
        template: "<products-component></products-component>"
      } );

  }

  angular.module( "GrocRoundAdmin" ).controller( "MainController", () => { } );

  components.integrate();
  services.integrate();

}
