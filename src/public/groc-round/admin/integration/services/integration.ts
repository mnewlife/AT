module GrocRoundAdminServicesIntegration {

  export let integrate = () => {

    /*******************************************************************/

    angular.module( "toastService", [] );

    angular.module( "toastService" ).factory( "ToastService", Toast );

    Toast.$inject = [
      "$q",
      "$mdToast"
    ];

    function Toast ( $q: ng.IQService, $mdToast: ng.material.IToastService ) {
      return new ToastService.Service( $q, $mdToast );
    }

    /*******************************************************************/

    angular.module( "dialogService", [] );

    angular.module( "dialogService" ).factory( "DialogService", Dialog );

    Dialog.$inject = [
      "$q",
      "$mdDialog"
    ];

    function Dialog ( $q: ng.IQService, $mdDialog: ng.material.IDialogService ) {
      return new DialogService.Service( $q, $mdDialog );
    }

    /*******************************************************************/

    angular.module( "contextsService", [] );

    angular.module( "contextsService" ).factory( "ContextsService", Contexts );

    Contexts.$inject = [
      "$location"
    ];

    function Contexts ( $location: ng.ILocationService ) {
      return new GrocRoundAdminContextsService.Service( $location );
    }

    /*******************************************************************/

    angular.module( "profileService", [
      "toastService",
      "contextsService"
    ] );

    angular.module( "profileService" ).factory( "ProfileService", Profile );

    Profile.$inject = [
      "$q",
      "$http",
      "$timeout",
      "ToastService",
      "ContextsService"
    ];

    function Profile (
      $q: ng.IQService,
      $http: ng.IHttpService,
      $timeout: ng.ITimeoutService,
      ToastService: ToastServiceInterfaces.Instance,
      ContextsService: GrocRoundAdminContextsServiceInterfaces.Instance
    ) {
      return new GrocRoundAdminProfileService.Service( $q, $http, $timeout, ToastService, ContextsService );
    }

    /*******************************************************************/

    angular.module( "shopsService", [] );

    angular.module( "shopsService" ).factory( "ShopsService", Shops );

    Shops.$inject = [
      "$q",
      "$http",
      "$timeout",
      "ToastService",
      "ContextsService"
    ];

    function Shops ( $q: ng.IQService, $http: ng.IHttpService, $timeout: ng.ITimeoutService, ToastService: ToastServiceInterfaces.Instance, ContextsService: GrocRoundAdminContextsServiceInterfaces.Instance ) {
      return new GrocRoundAdminShopsService.Service( $q, $http, $timeout, ToastService, ContextsService );
    }

    /*******************************************************************/

    angular.module( "productsService", [] );

    angular.module( "productsService" ).factory( "ProductsService", Products );

    Products.$inject = [
      "$q",
      "$http",
      "$timeout",
      "ToastService",
      "ContextsService"
    ];

    function Products ( $q: ng.IQService, $http: ng.IHttpService, $timeout: ng.ITimeoutService, ToastService: ToastServiceInterfaces.Instance, ContextsService: GrocRoundAdminContextsServiceInterfaces.Instance ) {
      return new GrocRoundAdminProductsService.Service( $q, $http, $timeout, ToastService, ContextsService );
    }

    /*******************************************************************/

    angular.module( "pricesService", [] );

    angular.module( "pricesService" ).factory( "PricesService", Prices );

    Prices.$inject = [
      "$q",
      "$http",
      "$timeout",
      "ToastService",
      "ContextsService"
    ];

    function Prices ( $q: ng.IQService, $http: ng.IHttpService, $timeout: ng.ITimeoutService, ToastService: ToastServiceInterfaces.Instance, ContextsService: GrocRoundAdminContextsServiceInterfaces.Instance ) {
      return new GrocRoundAdminPricesService.Service( $q, $http, $timeout, ToastService, ContextsService );
    }

    /*******************************************************************/

  }

}