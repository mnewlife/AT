
module SignUpComponent {

  import interfaces = SignUpComponentInterfaces;
  import toastService = ToastServiceInterfaces;
  import dialogService = DialogServiceInterfaces;
  import userService = UserServiceInterfaces;
  import contextsService = PasspointContextsServiceInterfaces;

  export class Component implements interfaces.Instance {

    /***************************************************/

    public emailAddress: string;
    public password: string;
    public confirm: string;

    public registering: boolean;

    /***************************************************/

    constructor(
      private readonly $q: ng.IQService,
      private readonly $routeParams: ng.route.IRouteParamsService,
      private readonly ToastService: toastService.Instance,
      private readonly DialogService: dialogService.Instance,
      private readonly UserService: userService.Instance,
      private readonly ContextsService: contextsService.Instance
    ) {

      this.registering = false;
      this.emailAddress = "";
      this.password = "";
      this.confirm = "";

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

      if ( this.ContextsService.innerContext === "sign-up" ) {
        if ( this.ContextsService.decoded.success ) {
          let message = ( this.ContextsService.decoded.message ) ? this.ContextsService.decoded.message : "Sign up done. A verification email has been sent to your email address";
          return this.DialogService.showAlert( "", message );
        } else {
          let message = ( this.ContextsService.decoded.message ) ? this.ContextsService.decoded.message : "Something went wrong";
          return this.DialogService.showAlert( "Sign Up", message );
        }
      }

    }

    /***************************************************/

    public signUp = () => {

      if ( !this.emailAddress ) {
        return this.ToastService.showSimple( "Provide an email address" );
      }

      if ( !this.password ) {
        return this.ToastService.showSimple( "Enter your password" );
      }

      if ( !this.confirm ) {
        return this.ToastService.showSimple( "Re-enter your password" );
      }

      if ( this.password !== this.confirm ) {
        return this.ToastService.showSimple( "Passwords don't match" );
      }

      this.registering = true;

      return this.UserService.signUp( this.emailAddress, this.password )
        .then( ( response: any ) => {

          this.registering = false;

          window.alert( "Done, A verification email has been sent to your email account." );

          if ( this.ContextsService.appContext ) {
            window.location.href = "/" + this.ContextsService.appContext;
          } else {
            window.location.href = "/";
          }

        } )
        .catch( ( reason: any ) => {

          this.registering = false;

          if ( reason.message ) {
            this.ToastService.showSimple( reason.message as string );
          }

        } );

    }

    /***************************************************/

  }

}

/*******************************************************************/