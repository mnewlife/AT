
module SignInComponent {

  import interfaces = SignInComponentInterfaces;
  import toastService = ToastServiceInterfaces;
  import dialogService = DialogServiceInterfaces;
  import userService = UserServiceInterfaces;
  import contextsService = PasspointContextsServiceInterfaces;

  export class Component implements interfaces.Instance {

    /***************************************************/

    public emailAddress: string;
    public password: string;

    public authenticating: boolean;

    /***************************************************/

    constructor(
      private readonly $q: ng.IQService,
      private readonly $routeParams: ng.route.IRouteParamsService,
      private readonly ToastService: toastService.Instance,
      private readonly DialogService: dialogService.Instance,
      private readonly UserService: userService.Instance,
      private readonly ContextsService: contextsService.Instance
    ) {

      this.authenticating = false;
      this.emailAddress = "";
      this.password = "";

      this.checkInnerContext();
      if ( !this.ContextsService.checked ) {
        this.ContextsService.checked = true;
      }

    }

    /***************************************************/

    private readonly checkInnerContext = () => {

      if ( !this.ContextsService.innerContext ) {
        return;
      }

      if ( this.ContextsService.innerContext === "change-email-address" ) {
        if ( this.ContextsService.decoded.success ) {
          let message = ( this.ContextsService.decoded.message ) ? this.ContextsService.decoded.message : "Email address changed successfully. Sign in with your address";
          return this.DialogService.showAlert( "Email Address Changed", message );
        }
      }

      if ( this.ContextsService.innerContext === "request-reset-code" ) {
        if ( this.ContextsService.decoded.success ) {
          let message = ( this.ContextsService.decoded.message ) ? this.ContextsService.decoded.message : "An email with the reset code has been sent to your email address";
          return this.DialogService.showAlert( "Reset Password", message );
        } else {
          let message = ( this.ContextsService.decoded.message ) ? this.ContextsService.decoded.message : "Something went wrong";
          return this.DialogService.showAlert( "Reset Password", message );
        }
      }
      if ( this.ContextsService.innerContext === "reset-password" ) {
        if ( this.ContextsService.decoded.success ) {

          let message = ( this.ContextsService.decoded.message ) ? this.ContextsService.decoded.message : "Your password has been reset. ";
          if ( this.ContextsService.decoded.payload && this.ContextsService.decoded.payload.newRandomPassword ) {
            message += "Use this password: " + this.ContextsService.decoded.payload.newRandomPassword;
          } else {
            message += "<b>( Something went wrong, contact support )</b>";
          }

          return this.DialogService.showAlert( "Reset Password", message );

        } else {

          let message = ( this.ContextsService.decoded.message ) ? this.ContextsService.decoded.message : "Something went wrong";
          return this.DialogService.showAlert( "Reset Password", message );

        }
      }
      if ( this.ContextsService.innerContext === "delete-account" ) {

        return this.DialogService.showAlert( "Delete Account", "Account deleted", null, "Ok" );

      }

      console.log( this.ContextsService.decoded );

      if ( this.ContextsService.innerContext === "verify-account" ) {

        if ( this.ContextsService.decoded.success ) {
          let message = ( this.ContextsService.decoded.message ) ? this.ContextsService.decoded.message : "Your account has been verified. Sign in with your email address";
          return this.DialogService.showAlert( "Account Verification", message );
        } else {
          let message = ( this.ContextsService.decoded.message ) ? this.ContextsService.decoded.message : "Something went wrong";
          console.log( message );
          return this.DialogService.showAlert( "Account Verification", message );
        }

      }

    }

    /***************************************************/

    public forgot = () => {

      return this.DialogService.showPrompt( "Forgot Password", "Enter your email address and we'll send you a recovery link.", null, "Enter your email address", "Yes, Send", "No" )
        .then( ( emailAddress: string ) => {

          if ( !emailAddress ) {
            return this.$q.reject();
          }

          return this.UserService.requestResetCode( emailAddress );

        } );

    }

    /***************************************************/

    public signIn = () => {

      if ( !this.emailAddress ) {
        return this.ToastService.showSimple( "Provide an email address" );
      }

      if ( !this.password ) {
        return this.ToastService.showSimple( "Enter your password" );
      }

      this.authenticating = true;

      return this.UserService.signIn( this.emailAddress, this.password )
        .catch( ( reason: any ) => {

          this.authenticating = false;

        } );

    }

    /***************************************************/

  }

}

/*******************************************************************/
