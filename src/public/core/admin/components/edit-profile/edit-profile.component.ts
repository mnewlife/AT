
module CoreAdminEditProfileComponent {

  import interfaces = CoreAdminEditProfileComponentInterfaces;
  import toastService = ToastServiceInterfaces;
  import countriesService = CountriesServiceInterfaces;
  import profileService = CoreAdminProfileServiceInterfaces;

  import changeEmailAddressService = CoreAdminChangeEmailAddressServiceInterfaces;
  import changePasswordService = CoreAdminChangePasswordServiceInterfaces;

  export class Component implements interfaces.Instance {

    /***************************************************/

    public emailAddress: string;
    public details: profileService.UpdateDetails;
    public progress: profileService.Instance[ "progress" ];

    public minDate: Date;
    public maxDate: Date;

    public countries: countriesService.Country[];

    public errorMessage: string;

    private promises: profileService.Instance[ "promises" ];

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

      this.initMembers();

      if ( this.ProfileService.user ) {

        this.copyDetails();

      } else {

        if ( this.ProfileService.progress.getUser ) {
          this.connectToPromise();
        } else {
          this.fetchUser();
        }

      }

    }

    /***************************************************/

    private initMembers = () => {

      let now = new Date;
      this.minDate = new Date( 1927, now.getMonth(), now.getDate() );
      this.maxDate = new Date( now.getFullYear() - 13, now.getMonth(), now.getDate() );

      this.errorMessage = "";
      this.countries = this.CountriesService.list;
      this.promises = this.ProfileService.promises;
      this.progress = this.ProfileService.progress;

    }

    /***************************************************/

    private fetchUser = () => {

      this.fetchDone( this.ProfileService.getUser() );

    }

    /***************************************************/

    private connectToPromise = () => {

      this.fetchDone( this.promises.getUser );

    }

    /***************************************************/

    private fetchDone = ( promise: ng.IPromise<boolean> ) => {

      promise
        .then( ( done: boolean ) => {

          if ( done ) {
            this.copyDetails();
          }

        } )
        .catch( ( reason: any ) => {

          this.errorMessage = ( reason && reason.message ) ? ( reason.message ) : "Couldn't get user details";

        } )
        .finally( () => {

          this.promises.getUser = this.$q.resolve( false );

        } );

    }

    /***************************************************/

    private readonly copyDetails = () => {

      this.details = {
        personalDetails: {
          firstName: "",
          lastName: "",
          dateOfBirth: undefined,
          gender: null
        },
        contactDetails: {
          phoneNumbers: []
        },
        residentialDetails: {
          country: "",
          province: "",
          address: ""
        }
      } as any;

      this.emailAddress = this.ProfileService.user.emailAddress;

      if ( this.ProfileService.user.personalDetails ) {

        let personalDetails = this.ProfileService.user.personalDetails;

        if ( personalDetails.firstName ) {
          this.details.personalDetails.firstName = personalDetails.firstName;
        }

        if ( personalDetails.lastName ) {
          this.details.personalDetails.lastName = personalDetails.lastName;
        }

        if ( personalDetails.dateOfBirth ) {
          this.details.personalDetails.dateOfBirth = personalDetails.dateOfBirth;
        }

        if ( personalDetails.gender ) {
          this.details.personalDetails.gender = personalDetails.gender;
        }

      }

      if ( this.ProfileService.user.contactDetails ) {

        let contactDetails = this.ProfileService.user.contactDetails;

        if ( contactDetails.phoneNumbers && contactDetails.phoneNumbers.length ) {
          this.details.contactDetails.phoneNumbers = [];
          contactDetails.phoneNumbers.forEach( ( number ) => {
            this.details.contactDetails.phoneNumbers.push( number );
          } );
        }

      }

      if ( this.ProfileService.user.residentialDetails ) {

        let residentialDetails = this.ProfileService.user.residentialDetails;

        if ( residentialDetails.country ) {
          this.details.residentialDetails.country = residentialDetails.country;
        }

        if ( residentialDetails.province ) {
          this.details.residentialDetails.province = residentialDetails.province;
        }

        if ( residentialDetails.address ) {
          this.details.residentialDetails.address = residentialDetails.address;
        }

      }

    }

    /***************************************************/

    public openChangeEmailAddress = ( ev: MouseEvent ) => {

      let config = {
        controller: ( $mdDialog: ng.material.IDialogService ) => this.ChangeEmailAddressService,
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
        controller: ( $mdDialog: ng.material.IDialogService ) => this.ChangePasswordService,
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
        .then( ( response: any ) => {

          this.$location.path( "/profile" );

        } );

    }

    /***************************************************/

  }

}

/*******************************************************************/