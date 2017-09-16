
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

    public tiles: interfaces.Tile[] = [
      {
        service: "Grocery Rounds",
        src: "resources/drawable/groceryRound.png",
        alt: "Athena Resources",
        span: { row: 1, col: 1 }
      },
      {
        service: "Call 263",
        src: "resources/drawable/call263.jpg",
        alt: "Affordable calling rates internationally",
        span: { row: 1, col: 1 }
      },
      {
        service: "Wifi Routers",
        src: "resources/drawable/router.png",
        alt: "Sentar and Huawei wifi routers",
        span: { row: 1, col: 1 }
      },
      {
        service: "CDMA Smartphones",
        src: "resources/drawable/smartphone.png",
        alt: "Cheap CDMA smartphones",
        span: { row: 1, col: 1 }
      }
    ];

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