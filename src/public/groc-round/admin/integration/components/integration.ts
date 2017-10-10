module GrocRoundAdminComponentsIntegration {

  export let integrate = () => {

    /*******************************************************************/

    angular.module( "shopsComponent", [
      "toolBarWidget",
      "sideNavWidget",
      "toastService",
      "shopsService"
    ] );

    angular.module( "shopsComponent" ).component( "shopsComponent", {
      templateUrl: "/groc-round/admin/components/shops/shops.template.html",
      controller: shops
    } );

    shops.$inject = [
      "$q",
      "$location",
      "$mdDialog",
      "ToastService",
      "ShopsService"
    ];

    function shops (
      $q: ng.IQService,
      $location: ng.ILocationService,
      $mdDialog: ng.material.IDialogService,
      ToastService: ToastServiceInterfaces.Instance,
      ShopsService: GrocRoundAdminShopsServiceInterfaces.Instance
    ) {
      return new GrocRoundAdminShopsComponent.Component( $q, $location, $mdDialog, ToastService, ShopsService );
    }

    /*******************************************************************/

    angular.module( "shopComponent", [
      "toolBarWidget",
      "sideNavWidget",
      "toastService",
      "dialogService",
      "shopsService"
    ] );

    angular.module( "shopComponent" ).component( "shopComponent", {
      templateUrl: "/groc-round/admin/components/shop/shop.template.html",
      controller: shop
    } );

    shop.$inject = [
      "$q",
      "$location",
      "$routeParams",
      "$mdDialog",
      "ToastService",
      "DialogService",
      "ShopsService"
    ];

    function shop (
      $q: ng.IQService,
      $location: ng.ILocationService,
      $routeParams: ng.route.IRouteParamsService,
      $mdDialog: ng.material.IDialogService,
      ToastService: ToastServiceInterfaces.Instance,
      DialogService: DialogServiceInterfaces.Instance,
      ShopsService: GrocRoundAdminShopsServiceInterfaces.Instance
    ) {
      return new GrocRoundAdminShopComponent.Component( $q, $location, $routeParams, $mdDialog, ToastService, DialogService, ShopsService );
    }

    /*******************************************************************/

    angular.module( "addEditShopComponent", [
      "toolBarWidget",
      "sideNavWidget",
      "toastService",
      "dialogService",
      "shopsService"
    ] );

    angular.module( "addEditShopComponent" ).component( "addEditShopComponent", {
      templateUrl: "/groc-round/admin/components/add-edit-shop/add-edit-shop.template.html",
      controller: addEditShop
    } );

    addEditShop.$inject = [
      "$q",
      "$routeParams",
      "$location",
      "$mdDialog",
      "ToastService",
      "DialogService",
      "ShopsService"
    ];

    function addEditShop (
      $q: ng.IQService,
      $routeParams: ng.route.IRouteParamsService,
      $location: ng.ILocationService,
      $mdDialog: ng.material.IDialogService,
      ToastService: ToastServiceInterfaces.Instance,
      DialogService: DialogServiceInterfaces.Instance,
      ShopsService: GrocRoundAdminShopsServiceInterfaces.Instance
    ) {
      return new GrocRoundAdminAddEditShopComponent.Component( $q, $routeParams, $location, $mdDialog, ToastService, DialogService, ShopsService );
    }

    /*******************************************************************/

    angular.module( "productsComponent", [
      "toolBarWidget",
      "sideNavWidget",
      "toastService",
      "productsService"
    ] );

    angular.module( "productsComponent" ).component( "productsComponent", {
      templateUrl: "/groc-round/admin/components/products/products.template.html",
      controller: products
    } );

    products.$inject = [
      "$q",
      "$location",
      "$mdDialog",
      "ToastService",
      "ProductsService"
    ];

    function products (
      $q: ng.IQService,
      $location: ng.ILocationService,
      $mdDialog: ng.material.IDialogService,
      ToastService: ToastServiceInterfaces.Instance,
      ProductsService: GrocRoundAdminProductsServiceInterfaces.Instance
    ) {
      return new GrocRoundAdminProductsComponent.Component( $q, $location, $mdDialog, ToastService, ProductsService );
    }

    /*******************************************************************/

    angular.module( "productComponent", [
      "toolBarWidget",
      "sideNavWidget",
      "toastService",
      "productsService"
    ] );

    angular.module( "productComponent" ).component( "productComponent", {
      templateUrl: "/groc-round/admin/components/product/product.template.html",
      controller: product
    } );

    product.$inject = [
      "$q",
      "$location",
      "$routeParams",
      "$mdDialog",
      "ToastService",
      "DialogService",
      "ProductsService"
    ];

    function product (
      $q: ng.IQService,
      $location: ng.ILocationService,
      $routeParams: ng.route.IRouteParamsService,
      $mdDialog: ng.material.IDialogService,
      ToastService: ToastServiceInterfaces.Instance,
      DialogService: DialogServiceInterfaces.Instance,
      ProductsService: GrocRoundAdminProductsServiceInterfaces.Instance
    ) {
      return new GrocRoundAdminProductComponent.Component( $q, $location, $routeParams, $mdDialog, ToastService, DialogService, ProductsService );
    }

    /*******************************************************************/

    angular.module( "addEditProductComponent", [
      "toolBarWidget",
      "sideNavWidget",
      "toastService",
      "dialogService",
      "productsService",
      "addPriceService"
    ] );

    angular.module( "addEditProductComponent" ).component( "addEditProductComponent", {
      templateUrl: "/groc-round/admin/components/add-edit-product/add-edit-product.template.html",
      controller: addEditProduct
    } );

    addEditProduct.$inject = [
      "$q",
      "$routeParams",
      "$location",
      "$mdDialog",
      "ToastService",
      "DialogService",
      "ProductsService",
      "AddPriceService"
    ];

    function addEditProduct (
      $q: ng.IQService,
      $routeParams: ng.route.IRouteParamsService,
      $location: ng.ILocationService,
      $mdDialog: ng.material.IDialogService,
      ToastService: ToastServiceInterfaces.Instance,
      DialogService: DialogServiceInterfaces.Instance,
      ProductsService: GrocRoundAdminProductsServiceInterfaces.Instance,
      AddPriceService: GrocRoundAdminAddPriceServiceInterfaces.Instance
    ) {
      return new GrocRoundAdminAddEditProductComponent.Component( $q, $routeParams, $location, $mdDialog, ToastService, DialogService, ProductsService, AddPriceService );
    }

    /*******************************************************************/

    angular.module( "addEditCartProductComponent", [
      "toolBarWidget",
      "sideNavWidget",
      "toastService",
      "cartProductsService",
      "autoCompleteService",
      "cartsService",
      "productsService"
    ] );

    angular.module( "addEditCartProductComponent" ).component( "addEditCartProductComponent", {
      templateUrl: "/groc-round/admin/components/add-edit-cart-product/add-edit-cart-product.template.html",
      controller: addEditCartProductComponent
    } );

    addEditCartProductComponent.$inject = [
      "$q",
      "$routeParams",
      "$location",
      "ToastService",
      "ProductsService",
      "CartProductsService",
      "AutoCompleteService",
      "CartsService"
    ];

    function addEditCartProductComponent (
      $q: ng.IQService,
      $routeParams: ng.route.IRouteParamsService,
      $location: ng.ILocationService,
      ToastService: ToastServiceInterfaces.Instance,
      ProductsService: GrocRoundAdminProductsServiceInterfaces.Instance,
      CartProductsService: GrocRoundAdminCartProductsServiceInterfaces.Instance,
      AutoCompleteService: GrocRoundAdminAutoCompleteServiceInterfaces.Instance,
      CartsService: GrocRoundAdminCartsServiceInterfaces.Instance
    ) {
      return new GrocRoundAdminAddEditCartProductComponent.Component( $q, $routeParams, $location, ToastService, CartProductsService, AutoCompleteService, CartsService, ProductsService );
    }

    angular.module( "addEditContributionComponent", [
      "toolBarWidget",
      "sideNavWidget",
      "toastService",
      "contributionsService",
      "autoCompleteService",
      "selectService",
      "productsService",
      "usersService",
      "roundsService",
      "superInfoService"
    ] );

    angular.module( "addEditContributionComponent" ).component( "addEditContributionComponent", {
      templateUrl: "/groc-round/admin/components/add-edit-contribution/add-edit-contribution.template.html",
      controller: addEditContributionComponent
    } );

    addEditContributionComponent.$inject = [
      "$q",
      "$routeParams",
      "$location",
      "ToastService",
      "ContributionService",
      "AutoCompleteService",
      "SelectService",
      "UsersService",
      "RoundsService",
      "SuperInfoService"
    ];

    function addEditContributionComponent (
      $q: ng.IQService,
      $routeParams: ng.route.IRouteParamsService,
      $location: ng.ILocationService,
      ToastService: ToastServiceInterfaces.Instance,
      ContributionsService: GrocRoundAdminContributionsServiceInterfaces.Instance,
      AutoCompleteService: GrocRoundAdminAutoCompleteServiceInterfaces.Instance,
      SelectService: GrocRoundAdminSelectServiceInterfaces.Instance,
      UsersService: GrocRoundAdminUsersServiceInterfaces.Instance,
      RoundsService: GrocRoundAdminRoundsServiceInterfaces.Instance,
      SuperInfoService: GrocRoundAdminSuperInfoServiceInterfaces.Instance
    ) {
      return new GrocRoundAdminAddEditContributionComponent.Component(
        $q,
        $routeParams,
        $location,
        ToastService,
        ContributionsService,
        AutoCompleteService,
        SelectService,
        UsersService,
        RoundsService,
        SuperInfoService
      );
    }

    angular.module( "addEditDeliveryFeeComponent", [
      "toolBarWidget",
      "sideNavWidget",
      "toastService",
      "deliveryFeesService",
      "autoCompleteService",
      "selectService",
      "usersService",
      "roundsService",
      "superInfoService"
    ] );

    angular.module( "addEditDeliveryFeeComponent" ).component( "addEditDeliveryFeeComponent", {
      templateUrl: "/groc-round/admin/components/add-edit-delivery-fee/add-edit-delivery-fee.template.html",
      controller: addEditDeliveryFeeComponent
    } );

    addEditDeliveryFeeComponent.$inject = [
      "$q",
      "$routeParams",
      "$location",
      "ToastService",
      "DeliveryFeesService",
      "AutoCompleteService",
      "SelectService",
      "UsersService",
      "RoundsService",
      "SuperInfoService"
    ];

    function addEditDeliveryFeeComponent (
      $q: ng.IQService,
      $routeParams: ng.route.IRouteParamsService,
      $location: ng.ILocationService,
      ToastService: ToastServiceInterfaces.Instance,
      DeliveryFeesService: GrocRoundAdminDeliveryFeesServiceInterfaces.Instance,
      AutoCompleteService: GrocRoundAdminAutoCompleteServiceInterfaces.Instance,
      SelectService: GrocRoundAdminSelectServiceInterfaces.Instance,
      UsersService: GrocRoundAdminUsersServiceInterfaces.Instance,
      RoundsService: GrocRoundAdminRoundsServiceInterfaces.Instance,
      SuperInfoService: GrocRoundAdminSuperInfoServiceInterfaces.Instance
    ) {
      return new GrocRoundAdminAddEditDeliveryFeeComponent.Component(
        $q,
        $routeParams,
        $location,
        ToastService,
        DeliveryFeesService,
        AutoCompleteService,
        SelectService,
        UsersService,
        RoundsService,
        SuperInfoService
      );
    }

    angular.module( "addEditRoundComponent", [
      "toolBarWidget",
      "sideNavWidget",
      "toastService",
      "roundsService"
    ] );

    angular.module( "addEditRoundComponent" ).component( "addEditRoundComponent", {
      templateUrl: "/groc-round/admin/components/add-edit-round/add-edit-round.template.html",
      controller: addEditRoundComponent
    } );

    addEditRoundComponent.$inject = [
      "$q",
      "$routeParams",
      "$location",
      "ToastService",
      "RoundsService"
    ];

    function addEditRoundComponent (
      $q: ng.IQService,
      $routeParams: ng.route.IRouteParamsService,
      $location: ng.ILocationService,
      ToastService: ToastServiceInterfaces.Instance,
      RoundsService: GrocRoundAdminRoundsServiceInterfaces.Instance
    ) {
      return new GrocRoundAdminAddEditRoundComponent.Component( $q, $routeParams, $location, ToastService, RoundsService );
    }

    angular.module( "addEditTrackComponent", [
      "toolBarWidget",
      "sideNavWidget",
      "toastService",
      "tracksService",
      "roundsService",
      "selectService"
    ] );

    angular.module( "addEditTrackComponent" ).component( "addEditTrackComponent", {
      templateUrl: "/groc-round/admin/components/add-edit-track/add-edit-track.template.html",
      controller: addEditTrackComponent
    } );

    addEditTrackComponent.$inject = [
      "$q",
      "$routeParams",
      "$location",
      "ToastService",
      "TracksService",
      "RoundsService",
      "SelectService"
    ];

    function addEditTrackComponent (
      $q: ng.IQService,
      $routeParams: ng.route.IRouteParamsService,
      $location: ng.ILocationService,
      ToastService: ToastServiceInterfaces.Instance,
      TracksService: GrocRoundAdminTracksServiceInterfaces.Instance,
      RoundsService: GrocRoundAdminRoundsServiceInterfaces.Instance,
      SelectService: GrocRoundAdminSelectServiceInterfaces.Instance
    ) {
      return new GrocRoundAdminAddEditTrackComponent.Component( $q, $routeParams, $location, ToastService, TracksService, RoundsService, SelectService );
    }

    angular.module( "addEditTrackProductComponent", [
      "toolBarWidget",
      "sideNavWidget",
      "toastService",
      "trackProductsService",
      "autoCompleteService",
      "selectService",
      "productsService",
      "tracksService",
    ] );

    angular.module( "addEditTrackProductComponent" ).component( "addEditTrackProductComponent", {
      templateUrl: "/groc-round/admin/components/add-edit-track-product/add-edit-track-product.template.html",
      controller: addEditTrackProductComponent
    } );

    addEditTrackProductComponent.$inject = [
      "$q",
      "$routeParams",
      "$location",
      "ToastService",
      "TrackProductsService",
      "AutoCompleteService",
      "SelectService",
      "ProductsService",
      "TracksService"
    ];

    function addEditTrackProductComponent (
      $q: ng.IQService,
      $routeParams: ng.route.IRouteParamsService,
      $location: ng.ILocationService,
      ToastService: ToastServiceInterfaces.Instance,
      TrackProductsService: GrocRoundAdminTrackProductsServiceInterfaces.Instance,
      AutoCompleteService: GrocRoundAdminAutoCompleteServiceInterfaces.Instance,
      SelectService: GrocRoundAdminSelectServiceInterfaces.Instance,
      ProductsService: GrocRoundAdminProductsServiceInterfaces.Instance,
      TracksService: GrocRoundAdminTracksServiceInterfaces.Instance
    ) {
      return new GrocRoundAdminAddEditTrackProductComponent.Component(
        $q,
        $routeParams,
        $location,
        ToastService,
        TrackProductsService,
        AutoCompleteService,
        SelectService,
        ProductsService,
        TracksService
      );
    }

    /*******************************************************************/

    angular.module( "cartProductsComponent", [
      "toolBarWidget",
      "sideNavWidget",
      "cartProductsService"
    ] );

    angular.module( "cartProductsComponent" ).component( "cartProductsComponent", {
      templateUrl: "/groc-round/admin/components/cart-products/cart-products.template.html",
      controller: cartProducts
    } );

    cartProducts.$inject = [
      "$routeParams",
      "$location",
      "CartProductsService"
    ];

    function cartProducts (
      $routeParams: ng.route.IRouteParamsService,
      $location: ng.ILocationService,
      CartProductsService: GrocRoundAdminCartProductsServiceInterfaces.Instance
    ) {
      return new GrocRoundAdminCartProductsComponent.Component(
        $routeParams,
        $location,
        CartProductsService
      );
    }

    angular.module( "cartsComponent", [
      "toolBarWidget",
      "sideNavWidget",
      "cartsService"
    ] );

    angular.module( "cartsComponent" ).component( "cartsComponent", {
      templateUrl: "/groc-round/admin/components/carts/carts.template.html",
      controller: carts
    } );

    carts.$inject = [
      "$routeParams",
      "$location",
      "CartsService"
    ];

    function carts (
      $routeParams: ng.route.IRouteParamsService,
      $location: ng.ILocationService,
      CartsService: GrocRoundAdminCartsServiceInterfaces.Instance
    ) {
      return new GrocRoundAdminCartsComponent.Component(
        $routeParams,
        $location,
        CartsService
      );
    }

    angular.module( "contributionsComponent", [
      "toolBarWidget",
      "sideNavWidget",
      "contributionsService"
    ] );

    angular.module( "contributionsComponent" ).component( "contributionsComponent", {
      templateUrl: "/groc-round/admin/components/contributions/contributions.template.html",
      controller: contributions
    } );

    contributions.$inject = [
      "$location",
      "ContributionsService"
    ];

    function contributions (
      $location: ng.ILocationService,
      ContributionsService: GrocRoundAdminContributionsServiceInterfaces.Instance
    ) {
      return new GrocRoundAdminContributionsComponent.Component(
        $location,
        ContributionsService
      );
    }

    angular.module( "deliveryFeesComponent", [
      "toolBarWidget",
      "sideNavWidget",
      "deliveryFeesService"
    ] );

    angular.module( "deliveryFeesComponent" ).component( "deliveryFeesComponent", {
      templateUrl: "/groc-round/admin/components/delivery-fees/delivery-fees.template.html",
      controller: deliveryFees
    } );

    deliveryFees.$inject = [
      "$location",
      "DeliveryFeesService"
    ];

    function deliveryFees (
      $location: ng.ILocationService,
      DeliveryFeesService: GrocRoundAdminDeliveryFeesServiceInterfaces.Instance
    ) {
      return new GrocRoundAdminDeliveryFeesComponent.Component(
        $location,
        DeliveryFeesService
      );
    }

    angular.module( "roundContributorsComponent", [
      "toolBarWidget",
      "sideNavWidget",
      "roundContributorsService"
    ] );

    angular.module( "roundContributorsComponent" ).component( "roundContributorsComponent", {
      templateUrl: "/groc-round/admin/components/round-contributors/round-contributors.template.html",
      controller: roundContributors
    } );

    roundContributors.$inject = [
      "$routeParams",
      "$location",
      "RoundContributorsService"
    ];

    function roundContributors (
      $routeParams: ng.route.IRouteParamsService,
      $location: ng.ILocationService,
      RoundContributorsService: GrocRoundAdminRoundContributorsServiceInterfaces.Instance
    ) {
      return new GrocRoundAdminRoundContributorsComponent.Component(
        $routeParams,
        $location,
        RoundContributorsService
      );
    }

    angular.module( "roundsComponent", [
      "toolBarWidget",
      "sideNavWidget",
      "roundsService"
    ] );

    angular.module( "roundsComponent" ).component( "roundsComponent", {
      templateUrl: "/groc-round/admin/components/rounds/rounds.template.html",
      controller: rounds
    } );

    rounds.$inject = [
      "$routeParams",
      "$location",
      "RoundsService"
    ];

    function rounds (
      $routeParams: ng.route.IRouteParamsService,
      $location: ng.ILocationService,
      RoundsService: GrocRoundAdminRoundsServiceInterfaces.Instance
    ) {
      return new GrocRoundAdminRoundsComponent.Component(
        $routeParams,
        $location,
        RoundsService
      );
    }

    angular.module( "trackProductsComponent", [
      "toolBarWidget",
      "sideNavWidget",
      "trackProductsService"
    ] );

    angular.module( "trackProductsComponent" ).component( "trackProductsComponent", {
      templateUrl: "/groc-round/admin/components/track-products/track-products.template.html",
      controller: trackProducts
    } );

    trackProducts.$inject = [
      "$routeParams",
      "$location",
      "TrackProductsService"
    ];

    function trackProducts (
      $routeParams: ng.route.IRouteParamsService,
      $location: ng.ILocationService,
      TrackProductsService: GrocRoundAdminTrackProductsServiceInterfaces.Instance
    ) {
      return new GrocRoundAdminTrackProductsComponent.Component(
        $routeParams,
        $location,
        TrackProductsService
      );
    }

    angular.module( "tracksComponent", [
      "toolBarWidget",
      "sideNavWidget",
      "tracksService"
    ] );

    angular.module( "tracksComponent" ).component( "tracksComponent", {
      templateUrl: "/groc-round/admin/components/tracks/tracks.template.html",
      controller: tracks
    } );

    tracks.$inject = [
      "$routeParams",
      "$location",
      "TracksService"
    ];

    function tracks (
      $routeParams: ng.route.IRouteParamsService,
      $location: ng.ILocationService,
      TracksService: GrocRoundAdminTracksServiceInterfaces.Instance
    ) {
      return new GrocRoundAdminTracksComponent.Component(
        $routeParams,
        $location,
        TracksService
      );
    }

    /*******************************************************************/

    angular.module( "sideNavWidget", [] );

    angular.module( "sideNavWidget" ).component( "sideNavWidget", {
      templateUrl: "/groc-round/admin/widgets/side-nav/side-nav.template.html",
      controller: sideNav
    } );

    function sideNav () {
      return new GrocRoundAdminSideNavWidget.Widget();
    }

    /*******************************************************************/

    angular.module( "toolBarWidget", [
      "profileService"
    ] );

    angular.module( "toolBarWidget" ).component( "toolBarWidget", {
      templateUrl: "/groc-round/admin/widgets/tool-bar/tool-bar.template.html",
      controller: toolBar,
      bindings: {
        title: "@"
      }
    } );

    toolBar.$inject = [
      "$mdSidenav",
      "ProfileService"
    ];

    function toolBar ( $mdSidenav: ng.material.ISidenavService, ProfileService: GrocRoundAdminProfileServiceInterfaces.Instance ) {
      return new GrocRoundAdminToolBarWidget.Widget( $mdSidenav, ProfileService );
    }

    /*******************************************************************/

    angular.module( "cartComponent", [
      "toolBarWidget",
      "sideNavWidget",
      "toastService",
      "dialogService",
      "cartsService"
    ] );

    angular.module( "cartComponent" ).component( "cartComponent", {
      templateUrl: "/groc-round/admin/components/cart/cart.template.html",
      controller: cart
    } );

    cart.$inject = [
      "$q",
      "$location",
      "$routeParams",
      "$mdDialog",
      "ToastService",
      "DialogService",
      "CartsService"
    ];

    function cart (
      $q: ng.IQService,
      $location: ng.ILocationService,
      $routeParams: ng.route.IRouteParamsService,
      $mdDialog: ng.material.IDialogService,
      ToastService: ToastServiceInterfaces.Instance,
      DialogService: DialogServiceInterfaces.Instance,
      CartsService: GrocRoundAdminCartsServiceInterfaces.Instance
    ) {
      return new GrocRoundAdminCartComponent.Component( $q, $location, $routeParams, $mdDialog, ToastService, DialogService, CartsService );
    }

    angular.module( "roundComponent", [
      "toolBarWidget",
      "sideNavWidget",
      "toastService",
      "dialogService",
      "roundsService"
    ] );

    angular.module( "roundComponent" ).component( "roundComponent", {
      templateUrl: "/groc-round/admin/components/round/round.template.html",
      controller: round
    } );

    round.$inject = [
      "$q",
      "$location",
      "$routeParams",
      "$mdDialog",
      "ToastService",
      "DialogService",
      "RoundsService"
    ];

    function round (
      $q: ng.IQService,
      $location: ng.ILocationService,
      $routeParams: ng.route.IRouteParamsService,
      $mdDialog: ng.material.IDialogService,
      ToastService: ToastServiceInterfaces.Instance,
      DialogService: DialogServiceInterfaces.Instance,
      RoundsService: GrocRoundAdminRoundsServiceInterfaces.Instance
    ) {
      return new GrocRoundAdminRoundComponent.Component( $q, $location, $routeParams, $mdDialog, ToastService, DialogService, RoundsService );
    }

    angular.module( "roundContributorComponent", [
      "toolBarWidget",
      "sideNavWidget",
      "toastService",
      "dialogService",
      "roundContributorsService"
    ] );

    angular.module( "roundContributorComponent" ).component( "roundContributorComponent", {
      templateUrl: "/groc-round/admin/components/round-contributor/round-contributor.template.html",
      controller: roundContributor
    } );

    roundContributor.$inject = [
      "$q",
      "$location",
      "$routeParams",
      "$mdDialog",
      "ToastService",
      "DialogService",
      "RoundContributorsService"
    ];

    function roundContributor (
      $q: ng.IQService,
      $location: ng.ILocationService,
      $routeParams: ng.route.IRouteParamsService,
      $mdDialog: ng.material.IDialogService,
      ToastService: ToastServiceInterfaces.Instance,
      DialogService: DialogServiceInterfaces.Instance,
      RoundContributorsService: GrocRoundAdminRoundContributorsServiceInterfaces.Instance
    ) {
      return new GrocRoundAdminRoundContributorComponent.Component( $q, $location, $routeParams, $mdDialog, ToastService, DialogService, RoundContributorsService );
    }

    angular.module( "trackComponent", [
      "toolBarWidget",
      "sideNavWidget",
      "toastService",
      "dialogService",
      "tracksService"
    ] );

    angular.module( "trackComponent" ).component( "trackComponent", {
      templateUrl: "/groc-round/admin/components/track/track.template.html",
      controller: track
    } );

    track.$inject = [
      "$q",
      "$location",
      "$routeParams",
      "$mdDialog",
      "ToastService",
      "DialogService",
      "TracksService"
    ];

    function track (
      $q: ng.IQService,
      $location: ng.ILocationService,
      $routeParams: ng.route.IRouteParamsService,
      $mdDialog: ng.material.IDialogService,
      ToastService: ToastServiceInterfaces.Instance,
      DialogService: DialogServiceInterfaces.Instance,
      TracksService: GrocRoundAdminTracksServiceInterfaces.Instance
    ) {
      return new GrocRoundAdminTrackComponent.Component( $q, $location, $routeParams, $mdDialog, ToastService, DialogService, TracksService );
    }

    /*******************************************************************/

  }

}