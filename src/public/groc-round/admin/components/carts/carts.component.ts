module GrocRoundAdminCartsComponent {

  import interfaces = GrocRoundAdminCartsComponentInterfaces;
  import toastService = ToastServiceInterfaces;
  import cartsService = GrocRoundAdminCartsServiceInterfaces;
  import cart = Cart;

  export class Component implements interfaces.Instance {

    /***************************************************/

    public carts: cart.Super[];
    public errorMessage: string;
    public loading: boolean;

    /***************************************************/

    constructor(
      private readonly $routeParams: ng.route.IRouteParamsService,
      private readonly $location: ng.ILocationService,
      private readonly CartsService: cartsService.Instance
    ) {

      this.carts = [];

      if ( this.$routeParams.roundId ) {
        this.getCarts( this.$routeParams.roundId );
      } else {
        window.history.back();
      }

    }

    /***************************************************/

    private readonly getCarts = ( roundId: string ) => {

      this.loading = true;

      this.CartsService.getCarts( roundId )
        .then( ( carts: cart.Super[] ) => {

          carts.forEach( ( subject ) => {
            this.carts.push( subject );
          } );

        } )
        .catch( ( reason: any ) => {

          this.errorMessage = ( reason && reason.message ) ? reason.message : "Operation Failed";

        } )
        .finally( () => {

          this.loading = false;

        } );

    }

    /***************************************************/

    public route = ( destination: string ) => {

      if ( destination ) {
        this.$location.path( destination );
      }

    }

    /***************************************************/

  }

}

  /*******************************************************************/
