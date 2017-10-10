
module GrocRoundAdminProductComponent {

  import product = Product;

  import interfaces = GrocRoundAdminProductComponentInterfaces;
  import toastService = ToastServiceInterfaces;
  import dialogService = DialogServiceInterfaces;
  import profileService = GrocRoundAdminProductsServiceInterfaces;

  export class Component implements interfaces.Instance {

    /***************************************************/

    public product: product.Super;

    public loading: boolean;
    public loadingPrices: boolean;
    public deleting: boolean;

    public errorMessage: string;

    /***************************************************/

    constructor(
      private readonly $q: ng.IQService,
      private readonly $location: ng.ILocationService,
      private readonly $routeParams: ng.route.IRouteParamsService,
      private readonly $mdDialog: ng.material.IDialogService,
      private readonly ToastService: toastService.Instance,
      private readonly DialogService: dialogService.Instance,
      private readonly ProductsService: profileService.Instance
    ) {

      this.initMembers();
      this.deriveProductId();

    }

    /***************************************************/

    public addPrice = () => {

    }

    public removePrice = ( price: product.Price ) => {

    }

    /***************************************************/

    private initMembers = () => {

      this.product = {} as any;

    }

    /***************************************************/

    private deriveProductId = () => {

      if ( this.$routeParams.productId ) {
        this.getProductRecord( this.$routeParams.productId );
      } else {
        window.history.back();
      }

    }

    /***************************************************/

    private getProductRecord = ( id: string ) => {

      this.loading = true;

      let matches = this.ProductsService.products.filter( ( product ) => {
        return ( product.id === id );
      } );

      if ( matches.length ) {

        this.product = this.ProductsService.products[ this.ProductsService.products.indexOf( matches[ 0 ] ) ];
        this.loading = false;

      } else {

        this.ProductsService.getProduct( id )
          .then( ( foundProduct: product.Super ) => {

            angular.copy( foundProduct, this.product );

          } )
          .catch( ( reason: any ) => {

            this.errorMessage = ( reason && reason.message ) ? reason.message : "Couldn't get product record";

          } )
          .finally( () => {

            this.loading = false;

          } );

      }

    }

    /***************************************************/

    public deleteProduct = (): any => {

      this.deleting = true;

      this.DialogService.showConfirm( "Delete Product", "Are you sure?", null )
        .then( ( sure: boolean ) => {

          if ( sure ) {
            return this.ProductsService.removeProduct( this.product.id );
          } else {
            return this.$q.reject();
          }

        } )
        .then( ( response: any ) => {

          this.$location.path( "/products" );

        } )
        .finally( () => {

          this.deleting = false;

        } );

    }

    /***************************************************/

  }

}

  /*******************************************************************/
