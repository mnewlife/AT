
module GrocRoundAdminProductsComponent {

  import user = User;

  import interfaces = GrocRoundAdminProductsComponentInterfaces;
  import toastService = ToastServiceInterfaces;
  import productsService = GrocRoundAdminProductsServiceInterfaces;
  import product = Product;

  export class Component implements interfaces.Instance {

    /***************************************************/

    public products: product.Super[];
    public progress: productsService.Instance[ "progress" ];
    public promises: productsService.Instance[ "promises" ];
    public errorMessage: string;

    /***************************************************/

    constructor(
      private readonly $q: ng.IQService,
      private readonly $location: ng.ILocationService,
      private readonly $mdDialog: ng.material.IDialogService,
      private readonly ToastService: toastService.Instance,
      private readonly ProductsService: productsService.Instance
    ) {

      this.products = this.ProductsService.products;
      this.progress = this.ProductsService.progress;

      this.attachToPromise();

      if ( !this.products.length && !this.ProductsService.progress.getProducts ) {
        this.getProducts();
      }

    }

    /***************************************************/

    private attachToPromise = () => {

      this.ProductsService.promises.getProducts
        .then(( done: boolean ) => {

          if ( done ) {
            this.errorMessage = null;
          }

        } )
        .catch(( reason: any ) => {

          this.errorMessage = ( reason && reason.message ) ? reason.message : "Couldn't get shops";

        } );

    }

    /***************************************************/

    public route = ( destination: string ) => {

      if ( destination ) {
        this.$location.path( destination );
      }

    }

    /***************************************************/

    private readonly getProducts = () => {

      this.ProductsService.getProducts()
        .catch(( reason: any ) => {

          this.errorMessage = ( reason && reason.message ) ? reason.message : "Couldn't get products";

        } );

    }

    /***************************************************/

  }

}

  /*******************************************************************/
