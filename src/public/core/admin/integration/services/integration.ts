module CoreAdminServicesIntegration {

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

    angular.module( "countriesService", [] );

    angular.module( "countriesService" ).factory( "CountriesService", Countries );

    //Countries.$inject = [];

    function Countries () {
      return new CountriesService.Service();
    }

    /*******************************************************************/

    angular.module( "contextsService", [] );

    angular.module( "contextsService" ).factory( "ContextsService", Contexts );

    Contexts.$inject = [
      "$location"
    ];

    function Contexts ( $location: ng.ILocationService ) {
      return new CoreAdminContextsService.Service( $location );
    }

    /*******************************************************************/

    angular.module( "profileService", [] );

    angular.module( "profileService" ).factory( "ProfileService", Profile );

    Profile.$inject = [
      "$q",
      "$http",
      "$timeout",
      "ToastService",
      "ContextsService"
    ];

    function Profile ( $q: ng.IQService, $http: ng.IHttpService, $timeout: ng.ITimeoutService, ToastService: ToastServiceInterfaces.Instance, ContextsService: CoreAdminContextsServiceInterfaces.Instance ) {
      return new CoreAdminProfileService.Service( $q, $http, $timeout, ToastService, ContextsService );
    }

    /*******************************************************************/

    angular.module( "changeEmailAddressService", [] );

    angular.module( "changeEmailAddressService" ).factory( "ChangeEmailAddressService", ChangeEmailAddress );

    ChangeEmailAddress.$inject = [
      "$mdDialog",
    ];

    function ChangeEmailAddress ( $mdDialog: ng.material.IDialogService ) {
      return new CoreAdminChangeEmailAddressService.Service( $mdDialog );
    }

    /*******************************************************************/

    angular.module( "changePasswordService", [] );

    angular.module( "changePasswordService" ).factory( "ChangePasswordService", ChangePassword );

    ChangePassword.$inject = [
      "$mdDialog",
    ];

    function ChangePassword ( $mdDialog: ng.material.IDialogService ) {
      return new CoreAdminChangePasswordService.Service( $mdDialog );
    }

    /*******************************************************************/

  }

}