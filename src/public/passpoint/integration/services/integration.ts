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
      "$mdToast"
    ];

    function Dialog ( $q: ng.IQService, $mdDialog: ng.material.IDialogService ) {
      return new DialogService.Service( $q, $mdDialog );
    }

    /*******************************************************************/

    angular.module( "contextsService", [] );

    angular.module( "contextsService" ).factory( "ContextsService", Contexts );

    function Contexts () {
      return new ContextsService.Service();
    }

    /*******************************************************************/

    angular.module( "userService", [] );

    angular.module( "userService" ).factory( "UserService", User );

    User.$inject = [
      "$q",
      "$http",
      "ToastService"
    ];

    function User ( $q: ng.IQService, $http: ng.IHttpService, ToastService: ToastServiceInterfaces.Instance ) {
      return new UserService.Service( $q, $http, ToastService );
    }

    /*******************************************************************/

  }

}