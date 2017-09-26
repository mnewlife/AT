module CoreAdminComponentsIntegration {

  export let integrate = () => {

    /*******************************************************************/

    angular.module( "profileComponent", [
      "toolBarWidget",
      "sideNavWidget",
      "toastService",
      "profileService",
      "changeEmailAddressService",
      "changePasswordService"
    ] );

    angular.module( "profileComponent" ).component( "profileComponent", {
      templateUrl: "/core/admin/components/profile/profile.template.html",
      controller: profile
    } );

    profile.$inject = [
      "$q",
      "$mdDialog",
      "ToastService",
      "ProfileService",
      "ChangeEmailAddressService",
      "ChangePasswordService"
    ];

    function profile (
      $q: ng.IQService,
      $mdDialog: ng.material.IDialogService,
      ToastService: ToastServiceInterfaces.Instance,
      ProfileService: CoreAdminProfileServiceInterfaces.Instance,
      ChangeEmailAddressService: CoreAdminChangeEmailAddressServiceInterfaces.Instance,
      ChangePasswordService: CoreAdminChangePasswordServiceInterfaces.Instance
    ) {
      return new CoreAdminProfileComponent.Component( $q, $mdDialog, ToastService, ProfileService, ChangeEmailAddressService, ChangePasswordService );
    }

    /*******************************************************************/

    angular.module( "editProfileComponent", [
      "toolBarWidget",
      "sideNavWidget",
      "toastService",
      "countriesService",
      "profileService",
      "changeEmailAddressService",
      "changePasswordService"
    ] );

    angular.module( "editProfileComponent" ).component( "editProfileComponent", {
      templateUrl: "/core/admin/components/edit-profile/edit-profile.template.html",
      controller: editProfile
    } );

    editProfile.$inject = [
      "$q",
      "$location",
      "$mdDialog",
      "ToastService",
      "CountriesService",
      "ProfileService",
      "ChangeEmailAddressService",
      "ChangePasswordService"
    ];

    function editProfile (
      $q: ng.IQService,
      $location: ng.ILocationService,
      $mdDialog: ng.material.IDialogService,
      ToastService: ToastServiceInterfaces.Instance,
      CountriesService: CountriesServiceInterfaces.Instance,
      ProfileService: CoreAdminProfileServiceInterfaces.Instance,
      ChangeEmailAddressService: CoreAdminChangeEmailAddressServiceInterfaces.Instance,
      ChangePasswordService: CoreAdminChangePasswordServiceInterfaces.Instance
    ) {
      return new CoreAdminEditProfileComponent.Component( $q, $location, $mdDialog, ToastService, CountriesService, ProfileService, ChangeEmailAddressService, ChangePasswordService );
    }

    /*******************************************************************/

    angular.module( "sideNavWidget", [] );

    angular.module( "sideNavWidget" ).component( "sideNavWidget", {
      templateUrl: "/core/admin/widgets/side-nav/side-nav.template.html",
      controller: sideNav
    } );

    function sideNav () {
      return new CoreAdminSideNavWidget.Widget();
    }

    /*******************************************************************/

    angular.module( "toolBarWidget", [
      "profileService"
    ] );

    angular.module( "toolBarWidget" ).component( "toolBarWidget", {
      templateUrl: "/core/admin/widgets/tool-bar/tool-bar.template.html",
      controller: toolBar,
      bindings: {
        title: "@"
      }
    } );

    toolBar.$inject = [
      "$mdSidenav",
      "ProfileService"
    ];

    function toolBar ( $mdSidenav: ng.material.ISidenavService, ProfileService: CoreAdminProfileServiceInterfaces.Instance ) {
      return new CoreAdminToolBarWidget.Widget( $mdSidenav, ProfileService );
    }

    /*******************************************************************/

  }

}