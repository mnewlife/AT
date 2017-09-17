
module SignUpComponent {

  import interfaces = SignUpComponentInterfaces;
  import toastService = ToastServiceInterfaces;
  import userService = UserServiceInterfaces;
  import contextsService = ContextsServiceInterfaces;

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
      private readonly UserService: userService.Instance,
      private readonly ContextsService: contextsService.Instance
    ) {

      this.registering = false;
      this.emailAddress = "";
      this.password = "";
      this.confirm = "";

    }

    /***************************************************/

    public signUp = () => {

      if ( !this.emailAddress ) {
        return this.ToastService.showSimple( "Provide an email address" );
      }

      if ( !this.password ) {
        return this.ToastService.showSimple( "Enter your password" );
      }

      if ( this.password === this.confirm ) {
        return this.ToastService.showSimple( "Passwords don't match" );
      }

      this.registering = true;

      return this.UserService.signUp( this.emailAddress, this.password )
        .then(( response: any ) => {

          this.registering = false;

          if ( this.ContextsService.appContext ) {
            window.location.href = "/" + this.ContextsService.appContext;
          } else {
            window.location.href = "/";
          }

        } )
        .catch(( reason: any ) => {

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