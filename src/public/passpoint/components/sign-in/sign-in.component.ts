
module SignInComponent {

  import interfaces = SignInComponentInterfaces;
  import toastService = ToastServiceInterfaces;
  import userService = UserServiceInterfaces;
  import contextsService = ContextsServiceInterfaces;

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
      private readonly UserService: userService.Instance,
      private readonly ContextsService: contextsService.Instance
    ) {

      this.authenticating = false;
      this.emailAddress = "";
      this.password = "";

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
        .then(( response: any ) => {

          this.authenticating = false;

          if ( this.ContextsService.appContext ) {
            window.location.href = "/" + this.ContextsService.appContext;
          } else {
            window.location.href = "/";
          }

        } )
        .catch(( reason: any ) => {

          this.authenticating = false;

        } );

    }

    /***************************************************/

  }

}

/*******************************************************************/
