
module GrocRoundAdminProductsService {

  import product = Product;

  import interfaces = GrocRoundAdminProductsServiceInterfaces;
  import networkCall = NetworkCallInterfaces;
  import toastService = ToastServiceInterfaces;
  import contextsService = GrocRoundAdminContextsServiceInterfaces;

  export class Service implements interfaces.Instance {

    /***************************************************/

    public products: product.Super[];
    public progress: {
      getProducts: boolean;
    };
    public promises: {
      getProducts: ng.IPromise<boolean>;
    };

    private urlPrefix: string = "/grocRound/admin/products";

    /***************************************************/

    constructor(
      private readonly $q: ng.IQService,
      private readonly $http: ng.IHttpService,
      private readonly $timeout: ng.ITimeoutService,
      private readonly ToastService: toastService.Instance,
      private readonly ContextsService: contextsService.Instance
    ) {

      this.progress = {
        getProducts: false
      };
      this.promises = {
        getProducts: this.$q.resolve( false )
      };

      this.products = [];

      this.getProducts();

    }

    /***************************************************/

    private fixPrices = ( product: product.Super, centify?: boolean ): product.Super => {

      if ( product.prices ) {
        product.prices.forEach( ( price ) => {
          price.price = impl( price.price );
        } );
      }

      if ( product.priceValues ) {
        for ( let kind in [ "min", "max", "median", "mean" ] ) {
          if ( product.priceValues[ kind ] ) {
            product.priceValues[ kind ].price = impl( product.priceValues[ kind ].price );
          }
        }
      }

      if ( product.effectivePrice ) {
        product.effectivePrice.price = impl( product.effectivePrice.price );
      }

      function impl ( value: number ) {
        if ( centify ) {
          return value * 100;
        } else {
          return value / 100;
        }
      }

      return product;

    }

    public getProducts = (): ng.IPromise<boolean> => {

      this.progress.getProducts = true;

      this.promises.getProducts = this.$q( ( resolve, reject ) => {

        return this.$http.get( this.urlPrefix + "/getProducts" )
          .then( ( response: ng.IHttpResponse<{}> ) => {

            this.progress.getProducts = false;

            let responseData: networkCall.ResponseData = response.data as networkCall.ResponseData;

            if ( responseData.success ) {

              return this.$q( ( resolve, reject ) => {

                this.$timeout( () => {

                  if ( this.products.length ) {
                    this.products = [];
                  }

                  responseData.payload.foundProducts.forEach( ( product: product.Super ) => {
                    this.products.push( this.fixPrices( product ) );
                  } );

                  resolve( true );

                } );

              } );

            } else {

              let message = ( responseData.message ) ? responseData.message : "Couldn't get product records";

              this.ToastService.showSimple( message );

              return reject( {
                message: message
              } );

            }

          } )
          .catch( ( reason: any ) => {

            this.progress.getProducts = false;

            let message = "Products not found";
            this.ToastService.showSimple( message );
            return reject( {
              message: message
            } );

          } );

      } );

      return this.promises.getProducts;

    }

    /***************************************************/

    public getProduct = ( productId: string ): ng.IPromise<product.Super> => {

      return this.$http.get( this.urlPrefix + "/getProduct/" + productId )
        .then( ( response: ng.IHttpResponse<{}> ) => {

          let responseData: networkCall.ResponseData = response.data as networkCall.ResponseData;

          if ( responseData.success ) {

            return this.$q.resolve( this.fixPrices( responseData.payload.foundProduct ) );

          } else {

            let message = ( responseData.message ) ? responseData.message : "Couldn't get product record";

            this.ToastService.showSimple( message );

            return this.$q.reject( {
              message: message
            } );

          }

        } )
        .catch( ( reason: any ) => {

          this.progress.getProducts = false;

          let message = "Product not found";
          this.ToastService.showSimple( message );
          return this.$q.reject( {
            message: message
          } );

        } );

    }

    /***************************************************/

    public addProduct = ( details: interfaces.AddDetails ): ng.IPromise<void> => {

      if ( details.prices ) {
        details.prices.forEach( ( price ) => {
          price.price = price.price * 100;
        } );
      }

      if ( details.effectivePrice ) {
        details.effectivePrice.price = details.effectivePrice.price * 100;
      }

      console.log( details );

      return this.$http.post( this.urlPrefix + "/addProduct", details )
        .then( ( response: ng.IHttpResponse<{}> ) => {

          let responseData: networkCall.ResponseData = response.data as networkCall.ResponseData;

          if ( responseData.success ) {

            this.$timeout( () => {
              this.products.push( this.fixPrices( responseData.payload.addedProduct ) );
            } );

            this.ToastService.showSimple( "Product Added" );

            return this.$q.resolve();

          } else {

            return this.$q.reject( {
              message: ( responseData.message ) ? responseData.message : ""
            } );

          }

        } )
        .catch( ( reason: any ) => {

          if ( reason.message ) {

            this.ToastService.showSimple( reason.message );
            return this.$q.reject( {
              message: reason.message
            } );

          } else {

            let message = "Something went wrong";
            this.ToastService.showSimple( message );
            return this.$q.reject( {
              message: message
            } );

          }

        } );

    }

    /***************************************************/

    public updateProduct = ( productId: string, details: interfaces.UpdateDetails ): ng.IPromise<void> => {

      if ( details.prices ) {
        details.prices.forEach( ( price ) => {
          price.price = price.price * 100;
        } );
      }

      if ( details.effectivePrice ) {
        details.effectivePrice.price = details.effectivePrice.price * 100;
      }

      return this.$http.post( this.urlPrefix + "/updateProduct/" + productId, details )
        .then( ( response: ng.IHttpResponse<{}> ) => {

          let responseData: networkCall.ResponseData = response.data as networkCall.ResponseData;

          if ( responseData.success ) {

            this.$timeout( () => {

              let matches = this.products.filter( ( product ) => {
                return ( responseData.payload.updatedProduct.id === product.id );
              } );

              if ( matches.length ) {
                angular.copy( this.fixPrices( responseData.payload.updatedProduct ), this.products[ this.products.indexOf( matches[ 0 ] ) ] );
              }

            } );

            this.ToastService.showSimple( "Product record updated" );

            return this.$q.resolve();

          } else {

            return this.$q.reject( {
              message: ( responseData.message ) ? responseData.message : ""
            } );

          }

        } )
        .catch( ( reason: any ) => {

          if ( reason.message ) {

            this.ToastService.showSimple( reason.message );
            return this.$q.reject( {
              message: reason.message
            } );

          } else {

            let message = "Something went wrong";
            this.ToastService.showSimple( message );
            return this.$q.reject( {
              message: message
            } );

          }

        } );

    }

    /***************************************************/

    public removeProduct = ( productId: string ): ng.IPromise<void> => {

      return this.$http.get( this.urlPrefix + "/deleteProduct/" + productId )
        .then( ( response: ng.IHttpResponse<{}> ) => {

          let responseData: networkCall.ResponseData = response.data as networkCall.ResponseData;

          if ( responseData.success ) {

            this.$timeout( () => {

              let matches = this.products.filter( ( product ) => {
                return ( product.id === productId );
              } );

              if ( matches.length ) {
                this.products.splice( this.products.indexOf( matches[ 0 ] ), 1 );
              }

            } );

            this.ToastService.showSimple( "Product record deleted" );

            return this.$q.resolve();

          } else {

            return this.$q.reject( {
              message: ( responseData.message ) ? responseData.message : ""
            } );

          }

        } )
        .catch( ( reason: any ) => {

          if ( reason.message ) {

            this.ToastService.showSimple( reason.message );
            return this.$q.reject( {
              message: reason.message
            } );

          } else {

            let message = "Something went wrong";
            this.ToastService.showSimple( message );
            return this.$q.reject( {
              message: message
            } );

          }

        } );

    }

    /***************************************************/

  }

}

  /*******************************************************************/