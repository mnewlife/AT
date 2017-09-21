
module CoreAdminChangePasswordService {
  
    import interfaces = CoreAdminChangePasswordServiceInterfaces;
  
    export class Service implements interfaces.Instance {
  
      /***************************************************/
  
      public oldPassword: string;
      public newPassword: string;
      public confirm: string;
      public error: string;
  
      /***************************************************/
  
      constructor( private readonly $mdDialog: ng.material.IDialogService ) {
  
        this.oldPassword = "";
        this.newPassword = "";
        this.confirm = "";
        this.error = "";
  
      }
  
      /***************************************************/
  
      public change = () => {
  
        if ( !this.oldPassword ) {
          return this.error = "Enter your password";
        }
  
        if ( !this.newPassword ) {
          return this.error = "Enter the new email address";
        }

        if ( !this.confirm ) {
          return this.error = "Re-enter your password to confirm";
        }

        if ( this.newPassword !== this.confirm ) {
          return this.error = "Passwords don't match";
        }
  
        return this.$mdDialog.hide( {
          password: this.oldPassword,
          newPassword: this.newPassword
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