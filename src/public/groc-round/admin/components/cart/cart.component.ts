
module GrocRoundAdminCartComponent {

  import cart = Cart;

  import interfaces = GrocRoundAdminCartComponentInterfaces;
  import toastService = ToastServiceInterfaces;
  import dialogService = DialogServiceInterfaces;
  import cartsService = GrocRoundAdminCartsServiceInterfaces;

  export class Component implements interfaces.Instance {

    /***************************************************/

    public cart: cart.Super;
    public loading: boolean;
    public errorMessage: string;

    /***************************************************/

    constructor(
      private readonly $q: ng.IQService,
      private readonly $location: ng.ILocationService,
      private readonly $routeParams: ng.route.IRouteParamsService,
      private readonly $mdDialog: ng.material.IDialogService,
      private readonly ToastService: toastService.Instance,
      private readonly DialogService: dialogService.Instance,
      private readonly CartsService: cartsService.Instance
    ) {

      this.initMembers();
      this.deriveCartId();

    }

    /***************************************************/

    private initMembers = () => {

      this.cart = {} as any;

    }

    /***************************************************/

    private deriveCartId = () => {

      if ( this.$routeParams.cartId ) {
        this.getCartRecord( this.$routeParams.cartId );
      } else {
        window.history.back();
      }

    }

    /***************************************************/

    private getCartRecord = ( id: string ) => {

      let loading = true;

      this.CartsService.getCart( id )
        .then( ( foundCart: cart.Super ) => {

          angular.copy( foundCart, this.cart );
          this.errorMessage = null;

        } )
        .catch( ( reason: any ) => {

          this.errorMessage = ( reason && reason.message ) ? reason.message : "Couldn't get cart record";

        } )
        .finally( () => {

          this.loading = false;

        } );

    }

    /***************************************************/

  }

}

/*******************************************************************/
