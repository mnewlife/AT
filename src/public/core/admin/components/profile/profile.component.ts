
module CoreAdminProfileComponent {

  import user = User;

  import interfaces = CoreAdminProfileComponentInterfaces;
  import toastService = ToastServiceInterfaces;
  import profileService = CoreAdminProfileServiceInterfaces;

  import changeEmailAddressService = CoreAdminChangeEmailAddressServiceInterfaces;
  import changePasswordService = CoreAdminChangePasswordServiceInterfaces;

  export class Component implements interfaces.Instance {

    /***************************************************/

    public user: user.Super;
    public progress: profileService.Instance[ "progress" ];

    /***************************************************/

    constructor(
      private readonly $q: ng.IQService,
      private readonly $mdDialog: ng.material.IDialogService,
      private readonly ToastService: toastService.Instance,
      private readonly ProfileService: profileService.Instance,
      private readonly ChangeEmailAddressService: changeEmailAddressService.Instance,
      private readonly ChangePasswordService: changePasswordService.Instance
    ) {

      this.user = this.ProfileService.user;
      this.progress = this.ProfileService.progress;

    }

    /***************************************************/

    public openChangeEmailAddress = ( ev: MouseEvent ) => {

      let config = {
        controller: [ "$mdDialog", ( $mdDialog: ng.material.IDialogService ) => this.ChangeEmailAddressService ],
        controllerAs: "vm",
        templateUrl: "/core/admin/services/change-email-address/change-email-address.template.html",
        parent: angular.element( document.body ),
        targetEvent: ev,
        openFrom: "#change_email_address",
        closeTo: "#change_email_address",
        clickOutsideToClose: false
      };

      return this.$mdDialog.show( config )
        .then( ( result: any ) => {

          return this.ProfileService.changeEmailAddress( result.password, result.newEmailAddress );

        } );

    }

    /***************************************************/

    public openChangePassword = ( ev: MouseEvent ) => {

      let config = {
        controller: [ "$mdDialog", ( $mdDialog: ng.material.IDialogService ) => this.ChangePasswordService ],
        controllerAs: "vm",
        templateUrl: "/core/admin/services/change-password/change-password.template.html",
        parent: angular.element( document.body ),
        targetEvent: ev,
        openFrom: "#change_password",
        closeTo: "#change_password",
        clickOutsideToClose: false,
      };

      return this.$mdDialog.show( config )
        .then( ( result: any ) => {

          return this.ProfileService.changePassword( result.oldPassword, result.newPassword );

        } );

    }

    /***************************************************/

  }

}

/*******************************************************************/
