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

    angular.module( "addPriceService", [] );

    angular.module( "addPriceService" ).factory( "AddPriceService", AddPrice );

    AddPrice.$inject = [
      "$mdDialog",
      "ShopsService"
    ];

    function AddPrice ( $mdDialog: ng.material.IDialogService, ShopsService: GrocRoundAdminShopsServiceInterfaces.Instance ) {
      return new GrocRoundAdminAddPriceService.Service( $mdDialog, ShopsService );
    }

    angular.module( "autoCompleteService", [] );

    angular.module( "autoCompleteService" ).factory( "AutoCompleteService", AutoComplete );

    AutoComplete.$inject = [];

    function AutoComplete () {
      return new GrocRoundAdminAutoCompleteService.Service();
    }

    angular.module( "cartProductsService", [] );

    angular.module( "cartProductsService" ).factory( "CartProductsService", CartProducts );

    CartProducts.$inject = [
      "$q",
      "$http",
      "ToastService"
    ];

    function CartProducts ( $q: ng.IQService, $http: ng.IHttpService, ToastService: ToastServiceInterfaces.Instance ) {
      return new GrocRoundAdminCartProductsService.Service( $q, $http, ToastService );
    }

    angular.module( "cartsService", [] );

    angular.module( "cartsService" ).factory( "CartsService", Carts );

    Carts.$inject = [
      "$q",
      "$http",
      "ToastService"
    ];

    function Carts ( $q: ng.IQService, $http: ng.IHttpService, ToastService: ToastServiceInterfaces.Instance ) {
      return new GrocRoundAdminCartsService.Service( $q, $http, ToastService );
    }

    angular.module( "contributionsService", [] );

    angular.module( "contributionsService" ).factory( "ContributionsService", Contributions );

    Contributions.$inject = [
      "$q",
      "$http",
      "ToastService"
    ];

    function Contributions ( $q: ng.IQService, $http: ng.IHttpService, ToastService: ToastServiceInterfaces.Instance ) {
      return new GrocRoundAdminContributionsService.Service( $q, $http, ToastService );
    }

    angular.module( "deliveryFeesService", [] );

    angular.module( "deliveryFeesService" ).factory( "DeliveryFeesService", DeliveryFees );

    DeliveryFees.$inject = [
      "$q",
      "$http",
      "ToastService"
    ];

    function DeliveryFees ( $q: ng.IQService, $http: ng.IHttpService, ToastService: ToastServiceInterfaces.Instance ) {
      return new GrocRoundAdminDeliveryFeesService.Service( $q, $http, ToastService );
    }

    angular.module( "roundContributorsService", [] );

    angular.module( "roundContributorsService" ).factory( "RoundContributorsService", RoundContributors );

    RoundContributors.$inject = [
      "$q",
      "$http",
      "ToastService"
    ];

    function RoundContributors ( $q: ng.IQService, $http: ng.IHttpService, ToastService: ToastServiceInterfaces.Instance ) {
      return new GrocRoundAdminRoundContributorsService.Service( $q, $http, ToastService );
    }

    angular.module( "roundsService", [] );

    angular.module( "roundsService" ).factory( "RoundsService", Rounds );

    Rounds.$inject = [
      "$q",
      "$http",
      "ToastService"
    ];

    function Rounds ( $q: ng.IQService, $http: ng.IHttpService, ToastService: ToastServiceInterfaces.Instance ) {
      return new GrocRoundAdminRoundsService.Service( $q, $http, ToastService );
    }

    angular.module( "selectService", [] );

    angular.module( "selectService" ).factory( "SelectService", Select );

    Select.$inject = [];

    function Select () {
      return new GrocRoundAdminSelectService.Service();
    }

    angular.module( "superInfoService", [] );

    angular.module( "superInfoService" ).factory( "SuperInfoService", SuperInfo );

    SuperInfo.$inject = [];

    function SuperInfo () {
      return new GrocRoundAdminSuperInfoService.Service();
    }

    angular.module( "trackProductsService", [] );

    angular.module( "trackProductsService" ).factory( "TrackProductsService", TrackProducts );

    TrackProducts.$inject = [
      "$q",
      "$http",
      "ToastService"
    ];

    function TrackProducts ( $q: ng.IQService, $http: ng.IHttpService, ToastService: ToastServiceInterfaces.Instance ) {
      return new GrocRoundAdminTrackProductsService.Service( $q, $http, ToastService );
    }

    angular.module( "tracksService", [] );

    angular.module( "tracksService" ).factory( "TracksService", Tracks );

    Tracks.$inject = [
      "$q",
      "$http",
      "ToastService"
    ];

    function Tracks ( $q: ng.IQService, $http: ng.IHttpService, ToastService: ToastServiceInterfaces.Instance ) {
      return new GrocRoundAdminTracksService.Service( $q, $http, ToastService );
    }

    angular.module( "usersService", [] );

    angular.module( "usersService" ).factory( "UsersService", Users );

    Users.$inject = [
      "$q",
      "$http",
      "$timeout",
      "ToastService"
    ];

    function Users ( $q: ng.IQService, $http: ng.IHttpService, $timeout: ng.ITimeoutService, ToastService: ToastServiceInterfaces.Instance ) {
      return new GrocRoundAdminUsersService.Service( $q, $http, $timeout, ToastService );
    }

    /*******************************************************************/

  }

}