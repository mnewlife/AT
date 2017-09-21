module ServicesIntegration {

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

    function Contexts ( $location: ng.ILocationService ) {
      return new PasspointContextsService.Service( $location );
    }

    /*******************************************************************/

    angular.module( "userService", [] );

    angular.module( "userService" ).factory( "UserService", User );

    User.$inject = [
      "$q",
      "$http",
      "ToastService",
      "ContextsService"
    ];

    function User ( $q: ng.IQService, $http: ng.IHttpService, ToastService: ToastServiceInterfaces.Instance, ContextsService: PasspointContextsServiceInterfaces.Instance ) {
      return new UserService.Service( $q, $http, ToastService, ContextsService );
    }

    /*******************************************************************/

  }

}