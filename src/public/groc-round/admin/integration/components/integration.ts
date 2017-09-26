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
      "productsService",
      "pricesService"
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
      "ProductsService",
      "PricesService"
    ];

    function product (
      $q: ng.IQService,
      $location: ng.ILocationService,
      $routeParams: ng.route.IRouteParamsService,
      $mdDialog: ng.material.IDialogService,
      ToastService: ToastServiceInterfaces.Instance,
      DialogService: DialogServiceInterfaces.Instance,
      ProductsService: GrocRoundAdminProductsServiceInterfaces.Instance,
      PricesService: GrocRoundAdminPricesServiceInterfaces.Instance
    ) {
      return new GrocRoundAdminProductComponent.Component( $q, $location, $routeParams, $mdDialog, ToastService, DialogService, ProductsService, PricesService );
    }

    /*******************************************************************/

    angular.module( "addEditProductComponent", [
      "toolBarWidget",
      "sideNavWidget",
      "toastService",
      "dialogService",
      "productsService",
      "pricesService"
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
      "PricesService"
    ];

    function addEditProduct (
      $q: ng.IQService,
      $routeParams: ng.route.IRouteParamsService,
      $location: ng.ILocationService,
      $mdDialog: ng.material.IDialogService,
      ToastService: ToastServiceInterfaces.Instance,
      DialogService: DialogServiceInterfaces.Instance,
      ProductsService: GrocRoundAdminProductsServiceInterfaces.Instance,
      PricesService: GrocRoundAdminPricesServiceInterfaces.Instance
    ) {
      return new GrocRoundAdminAddEditProductComponent.Component( $q, $routeParams, $location, $mdDialog, ToastService, DialogService, ProductsService, PricesService );
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

  }

}