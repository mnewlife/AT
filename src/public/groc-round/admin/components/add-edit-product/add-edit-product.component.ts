
module GrocRoundAdminAddEditProductComponent {

  import interfaces = GrocRoundAdminAddEditProductComponentInterfaces;
  import toastService = ToastServiceInterfaces;
  import dialogService = DialogServiceInterfaces;
  import productsService = GrocRoundAdminProductsServiceInterfaces;
  import addPriceService = GrocRoundAdminAddPriceServiceInterfaces;
  import product = Product;

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
      private readonly AddPriceService: addPriceService.Instance
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
        prices: [],
        effectivePrice: {
          price: 0
        }
      };

      this.updateDetails = {
        label: "",
        prices: [],
        effectivePrice: {
          price: 0
        }
      };

    }

    /***************************************************/

    private determineMode = () => {

      if ( this.$routeParams.productId ) {
        this.editMode = true;
        this.productId = this.$routeParams.productId;
        this.findProductInfo();
      } else {
        this.editMode = false;
      }

    }

    /***************************************************/

    private findProductInfo = () => {

      this.loading = true;

      let matches = this.ProductsService.products.filter( ( product ) => {
        return ( this.productId === product.id );
      } );

      if ( matches.length ) {

        this.copyDetails( matches[ 0 ] );
        this.loading = false;

      } else {

        this.ProductsService.getProduct( this.productId )
          .then( ( foundProduct: product.Super ) => {

            this.copyDetails( foundProduct );

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

    private readonly copyDetails = ( foundProduct: product.Super ) => {

      this.updateDetails = {
        label: foundProduct.label,
        prices: foundProduct.prices,
        effectivePrice: foundProduct.effectivePrice
      };

    }

    /***************************************************/

    public addProduct = (): any => {

      if ( !this.addDetails.label ) {
        return this.ToastService.showSimple( "Product label is missing" );
      }

      if ( !this.addDetails.prices ) {
        return this.ToastService.showSimple( "Prices are missing" );
      }

      this.adding = true;

      return this.ProductsService.addProduct( this.addDetails )
        .then( ( response: any ) => {

          this.$location.path( "/products" );

        } )
        .finally( () => {

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

      if ( !this.updateDetails.prices ) {
        return this.ToastService.showSimple( "Product prices are missing" );
      }

      this.updating = true;

      return this.ProductsService.updateProduct( this.productId, this.updateDetails )
        .then( ( response: any ) => {

          this.$location.path( "/products" );

        } )
        .finally( () => {

          this.updating = false;

        } );

    }

    /***************************************************/

    public addPrice = ( addMode: boolean, id: string ) => {

      let config = {
        controller: [ "$mdDialog", ( $mdDialog: ng.material.IDialogService ) => this.AddPriceService ],
        controllerAs: "vm",
        templateUrl: "/groc-round/admin/services/add-price/add-price.template.html",
        parent: angular.element( document.body ),
        openFrom: "#" + id,
        closeTo: "#" + id,
        clickOutsideToClose: false
      };

      return this.$mdDialog.show( config )
        .then( ( result: any ) => {

          if ( !result ) {
            return this.ToastService.showSimple( "Something went wrong adding that price" );
          }

          console.log( addMode );

          if ( addMode ) {
            this.addDetails.prices.push( result as product.Price );
          } else {
            this.updateDetails.prices.push( result as product.Price );
          }

        } );

    }

    /***************************************************/

    public removePrice = ( price: product.Price, addMode: boolean ) => {

      if ( addMode ) {

        let index = this.addDetails.prices.indexOf( price );
        if ( index != -1 ) {
          this.addDetails.prices.splice( index, 1 );
        } else {
          this.ToastService.showSimple( "Error" );
        }

      } else {

        let index = this.updateDetails.prices.indexOf( price );
        if ( index != -1 ) {
          this.updateDetails.prices.splice( index, 1 );
        } else {
          this.ToastService.showSimple( "Error" );
        }

      }

    }

    /***************************************************/

    public deleteProduct = (): any => {

      if ( !this.productId ) {
        return this.ToastService.showSimple( "Product ID is missing" );
      }

      this.deleting = true;

      this.DialogService.showConfirm( "Delete Product", "Are you sure?", null )
        .then( ( sure: boolean ) => {

          if ( sure ) {
            return this.ProductsService.removeProduct( this.productId );
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
