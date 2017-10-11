module GrocRoundAdminCartProductsComponent {

  import interfaces = GrocRoundAdminCartProductsComponentInterfaces;
  import toastService = ToastServiceInterfaces;
  import cartProductsService = GrocRoundAdminCartProductsServiceInterfaces;
  import cartProduct = CartProduct;

  export class Component implements interfaces.Instance {

    /***************************************************/

    public cartProducts: cartProduct.Super[];
    public errorMessage: string;
    public loading: boolean;

    /***************************************************/

    constructor(
      private readonly $routeParams: ng.route.IRouteParamsService,
      private readonly $location: ng.ILocationService,
      private readonly CartProductsService: cartProductsService.Instance
    ) {

      this.cartProducts = [];

      if ( this.$routeParams.cartId ) {
        this.getCartProducts( this.$routeParams.cartId );
      } else {
        window.history.back();
      }

    }

    /***************************************************/

    private readonly getCartProducts = ( cartId: string ) => {

      this.loading = true;

      this.CartProductsService.getCartProducts( cartId )
        .then( ( cartProducts: cartProduct.Super[] ) => {

          cartProducts.forEach( ( subject ) => {
            this.cartProducts.push( subject );
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
