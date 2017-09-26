
module GrocRoundAdminAddEditProductComponent {

  import interfaces = GrocRoundAdminAddEditProductComponentInterfaces;
  import toastService = ToastServiceInterfaces;
  import dialogService = DialogServiceInterfaces;
  import productsService = GrocRoundAdminProductsServiceInterfaces;
  import pricesService = GrocRoundAdminPricesServiceInterfaces;
  import product = Product;
  import price = Price;

  export class Component implements interfaces.Instance {

    /***************************************************/

    public progress: productsService.Instance[ "progress" ];
    public editMode: boolean;
    public errorMessage: string;

    public loading: boolean;
    public adding: boolean;
    public updating: boolean;
    public deleting: boolean;

    public loadingPrices: boolean;
    public addingPrice: boolean;
    public updatingPrice: boolean;
    public deletingPrice: boolean;

    public addDetails: productsService.AddDetails;
    public updateDetails: productsService.UpdateDetails;
    public productId: string;
    public prices: price.Super[];

    private promises: productsService.Instance[ "promises" ];

    /***************************************************/

    constructor(
      private readonly $q: ng.IQService,
      private readonly $routeParams: ng.route.IRouteParamsService,
      private readonly $location: ng.ILocationService,
      private readonly $mdDialog: ng.material.IDialogService,
      private readonly ToastService: toastService.Instance,
      private readonly DialogService: dialogService.Instance,
      private readonly ProductsService: productsService.Instance,
      private readonly PricesService: pricesService.Instance
    ) {

      this.initMembers();
      this.determineMode();

    }

    /***************************************************/

    private initMembers = () => {

      this.promises = this.ProductsService.promises;
      this.progress = this.ProductsService.progress;

      this.addDetails = {
        label: "",
        effectivePrice: {
          price: 0
        }
      };

      this.updateDetails = {
        label: "",
        effectivePrice: {
          price: 0
        }
      };

      this.prices = [];

    }

    /***************************************************/

    private determineMode = () => {

      if ( this.$routeParams.productId ) {
        this.editMode = true;
        this.productId = this.$routeParams.productId;
        this.findProductInfo();
        this.findPriceInfo();
      } else {
        this.editMode = false;
      }

    }

    /***************************************************/

    private findProductInfo = () => {

      this.loading = true;

      let matches = this.ProductsService.products.filter(( product ) => {
        return ( this.productId === product.id );
      } );

      if ( matches.length ) {

        this.copyDetails( matches[ 0 ] );
        this.loading = false;

      } else {

        this.ProductsService.getProduct( this.productId )
          .then(( foundProduct: product.Super ) => {

            this.copyDetails( foundProduct );

          } )
          .catch(( reason: any ) => {

            this.errorMessage = ( reason && reason.message ) ? reason.message : "Couldn't get product record";

          } )
          .finally(() => {

            this.loading = false;

          } );

      }

    }

    /***************************************************/

    private findPriceInfo = () => {

      this.loadingPrices = true;

      this.PricesService.getPrices( { productId: this.productId } )
        .then(( prices: price.Super[] ) => {

          prices.forEach(( price ) => {
            this.prices.push( price );
          } );

        } )
        .finally(() => {

          this.loadingPrices = false;

        } );

    }

    /***************************************************/

    private readonly copyDetails = ( foundProduct: product.Super ) => {

      this.updateDetails = {
        label: foundProduct.label,
        effectivePrice: foundProduct.effectivePrice
      };

    }

    /***************************************************/

    public addProduct = (): any => {

      if ( !this.addDetails.label ) {
        return this.ToastService.showSimple( "Product label is missing" );
      }

      this.adding = true;

      return this.ProductsService.addProduct( this.addDetails )
        .then(( response: any ) => {

          this.$location.path( "/products" );

        } )
        .finally(() => {

          this.adding = false;

        } );

    }

    /***************************************************/

    public updateProduct = (): any => {

      if ( !this.productId ) {
        return this.ToastService.showSimple( "Product ID is missing" );
      }

      if ( !this.updateDetails.label ) {
        return this.ToastService.showSimple( "Product label is missing" );
      }

      this.updating = true;

      return this.ProductsService.updateProduct( this.productId, this.updateDetails )
        .then(( response: any ) => {

          this.$location.path( "/products" );

        } )
        .finally(() => {

          this.updating = false;

        } );

    }

    /***************************************************/

    public deleteProduct = (): any => {

      if ( !this.productId ) {
        return this.ToastService.showSimple( "Product ID is missing" );
      }

      this.deleting = true;

      this.DialogService.showConfirm( "Delete Product", "Are you sure?", null )
        .then(( sure: boolean ) => {

          if ( sure ) {
            return this.ProductsService.removeProduct( this.productId );
          } else {
            return this.$q.reject();
          }

        } )
        .then(( response: any ) => {

          this.$location.path( "/products" );

        } )
        .finally(() => {

          this.deleting = false;

        } );

    }

    /***************************************************/

    public addPrice = ( details: pricesService.AddDetails ) => {

      if ( !details.productId ) {
        return this.ToastService.showSimple( "Product ID is missing" );
      }

      if ( !details.shopId ) {
        return this.ToastService.showSimple( "Shop ID is missing" );
      }

      if ( !details.price ) {
        return this.ToastService.showSimple( "Price is missing" );
      }

      if ( !details.quantity ) {
        return this.ToastService.showSimple( "Quantity is missing" );
      }

      this.addingPrice = true;

      return this.PricesService.addPrice( details )
        .then(( addedPrice: price.Super ) => {

          this.prices.push( addedPrice );

        } )
        .finally(() => {

          this.addingPrice = false;

        } );

    }

    /***************************************************/

    public updatePrice = ( priceId: string, details: pricesService.UpdateDetails ) => {

      if ( !priceId ) {
        return this.ToastService.showSimple( "Price ID is missing" );
      }

      if ( !details.productId ) {
        return this.ToastService.showSimple( "Product ID is missing" );
      }

      if ( !details.shopId ) {
        return this.ToastService.showSimple( "Shop ID is missing" );
      }

      if ( !details.price ) {
        return this.ToastService.showSimple( "Price is missing" );
      }

      if ( !details.quantity ) {
        return this.ToastService.showSimple( "Quantity is missing" );
      }

      this.updatingPrice = true;

      return this.PricesService.updatePrice( priceId, details )
        .then(( updatedPrice: price.Super ) => {

          let matches = this.prices.filter(( price ) => {
            return ( price.id === updatedPrice.id );
          } );

          if ( matches.length ) {
            matches.forEach(( price ) => {
              angular.copy( updatedPrice, price );
            } );
          }

        } )
        .finally(() => {

          this.updating = false;

        } );

    }

    /***************************************************/

    public deletePrice = ( priceId: string ) => {

      if ( !priceId ) {
        return this.ToastService.showSimple( "Price ID is missing" );
      }

      this.deletingPrice = true;

      this.DialogService.showConfirm( "Delete Price", "Are you sure?", null )
        .then(( sure: boolean ) => {

          if ( sure ) {
            return this.PricesService.removePrice( priceId );
          } else {
            return this.$q.reject();
          }

        } )
        .then(( response: any ) => {

          let matches = this.prices.filter(( price ) => {
            return ( price.id === priceId );
          } );

          if ( matches.length ) {
            matches.forEach(( price ) => {

              this.prices.splice( this.prices.indexOf( price ), 1 );

            } );
          }

        } )
        .finally(() => {

          this.deleting = false;

        } );

    }

    /***************************************************/

  }

}

  /*******************************************************************/
