
module CoreAdminEditProfileComponent {

  import interfaces = CoreAdminEditProfileComponentInterfaces;
  import toastService = ToastServiceInterfaces;
  import countriesService = CountriesServiceInterfaces;
  import profileService = CoreAdminProfileServiceInterfaces;

  import changeEmailAddressService = CoreAdminChangeEmailAddressServiceInterfaces;
  import changePasswordService = CoreAdminChangePasswordServiceInterfaces;

  export class Component implements interfaces.Instance {

    /***************************************************/

    public details: profileService.UpdateDetails;
    public progress: profileService.Instance[ "progress" ];

    public minDate: Date;
    public maxDate: Date;

    public countries: countriesService.Country[];

    /***************************************************/

    constructor(
      private readonly $q: ng.IQService,
      private readonly $location: ng.ILocationService,
      private readonly $mdDialog: ng.material.IDialogService,
      private readonly ToastService: toastService.Instance,
      private readonly CountriesService: countriesService.Instance,
      private readonly ProfileService: profileService.Instance,
      private readonly ChangeEmailAddressService: changeEmailAddressService.Instance,
      private readonly ChangePasswordService: changePasswordService.Instance
    ) {

      this.countries = this.CountriesService.list;

      this.initDetails();

      this.initDates();

    }

    /***************************************************/

    private readonly initDates = () => {

      let now = new Date;

      this.minDate = new Date( 1927, now.getMonth(), now.getDate() );
      this.maxDate = new Date( now.getFullYear() - 13, now.getMonth(), now.getDate() );

    }

    /***************************************************/

    private readonly initDetails = () => {

      angular.copy( this.ProfileService.user.personalDetails, this.details.personalDetails );

      this.details.contactDetails.phoneNumbers = [];

      this.ProfileService.user.contactDetails.phoneNumbers.forEach(( number ) => {
        this.details.contactDetails.phoneNumbers.push( number );
      } );

      angular.copy( this.ProfileService.user.residentialDetails, this.details.residentialDetails );

    }

    /***************************************************/

    public openChangeEmailAddress = ( ev: MouseEvent ) => {

      let config = {
        controller: ( $mdDialog: ng.material.IDialogService ) => this.ChangeEmailAddressService,
        controllerAs: "this",
        templateUrl: "/core/admin/services/change-email-address/change-email-address.template.html",
        parent: angular.element( document.body ),
        targetEvent: ev,
        openFrom: "#change_email_address",
        closeTo: "#change_email_address",
        clickOutsideToClose: false
      };

      return this.$mdDialog.show( config )
        .then(( result: any ) => {

          return this.ProfileService.changeEmailAddress( result.password, result.newEmailAddress );

        } )
        .catch(( reason: any ) => {

          return this.ToastService.showSimple(( reason.message ) ? reason.message : "Something went wrong" );

        } );

    }

    /***************************************************/

    public openChangePassword = ( ev: MouseEvent ) => {

      let config = {
        controller: ( $mdDialog: ng.material.IDialogService ) => this.ChangePasswordService,
        controllerAs: "this",
        templateUrl: "/core/admin/services/change-password/change-password.template.html",
        parent: angular.element( document.body ),
        targetEvent: ev,
        openFrom: "#change_password",
        closeTo: "#change_password",
        clickOutsideToClose: false,
      };

      return this.$mdDialog.show( config )
        .then(( result: any ) => {

          return this.ProfileService.changePassword( result.oldPassword, result.newPassword );

        } )
        .catch(( reason: any ) => {

          return this.ToastService.showSimple(( reason.message ) ? reason.message : "Something went wrong" );

        } );

    }

    /***************************************************/

    public saveChanges = (): any => {

      if ( !this.details.personalDetails.firstName ) {
        return this.ToastService.showSimple( "First name is missing" );
      }

      if ( !this.details.personalDetails.lastName ) {
        return this.ToastService.showSimple( "Last name is missing" );
      }

      if ( !this.details.personalDetails.dateOfBirth ) {
        return this.ToastService.showSimple( "Date of birth is missing" );
      }

      if ( !this.details.personalDetails.gender ) {
        return this.ToastService.showSimple( "Gender is missing" );
      }

      if ( !this.details.contactDetails.phoneNumbers || !this.details.contactDetails.phoneNumbers.length ) {
        return this.ToastService.showSimple( "Phone numbers are missing" );
      }

      if ( !this.details.residentialDetails.country ) {
        return this.ToastService.showSimple( "Country is missing" );
      }

      if ( !this.details.residentialDetails.province ) {
        return this.ToastService.showSimple( "Province is missing" );
      }

      if ( !this.details.residentialDetails.address ) {
        return this.ToastService.showSimple( "Address is missing" );
      }

      return this.ProfileService.updateDetails( this.details )
        .then(( response: any ) => {

          this.$location.path( "/profile" );

        } )
        .catch(( reason: any ) => {

          if ( reason.message ) {
            this.ToastService.showSimple( reason.message as string );
          }

        } );

    }

    /***************************************************/

  }

}

/*******************************************************************/