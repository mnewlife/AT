
module CoreAdminChangeEmailAddressService {

  import interfaces = CoreAdminChangeEmailAddressServiceInterfaces;

  export class Service implements interfaces.Instance {

    /***************************************************/

    public password: string;
    public newEmailAddress: string;
    public error: string;

    /***************************************************/

    constructor( private readonly $mdDialog: ng.material.IDialogService ) {

      this.password = "";
      this.newEmailAddress = "";
      this.error = "";

    }

    /***************************************************/

    public change = () => {

      if ( !this.password ) {
        return this.error = "Enter your password";
      }

      if ( !this.newEmailAddress ) {
        return this.error = "Enter the new email address";
      }

      return this.$mdDialog.hide( {
        password: this.password,
        newEmailAddress: this.newEmailAddress
      } );

    }

    /***************************************************/

    public cancel = () => {
      
      this.$mdDialog.cancel();
      
    }

    /***************************************************/

  }

}

  /*******************************************************************/