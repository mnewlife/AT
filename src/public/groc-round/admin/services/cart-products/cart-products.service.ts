module GrocRoundAdminCartProductsService {

  import cartProduct = CartProduct;

  import interfaces = GrocRoundAdminCartProductsServiceInterfaces;
  import networkCall = NetworkCallInterfaces;
  import toastService = ToastServiceInterfaces;

  export class Service implements interfaces.Instance {

    /***************************************************/

    private urlPrefix: string = "/grocRound/admin/cartProducts";

    /***************************************************/

    constructor(
      private readonly $q: ng.IQService,
      private readonly $http: ng.IHttpService,
      private readonly ToastService: toastService.Instance
    ) { }

    /***************************************************/

    public getCartProducts = ( cartId: string ): ng.IPromise<cartProduct.Super[]> => {

      return this.$http.get( this.urlPrefix + "/getCartProducts?cartId=" + cartId )
        .then( ( response: ng.IHttpResponse<{}> ) => {

          let responseData: networkCall.ResponseData = response.data as networkCall.ResponseData;

          if ( responseData.payload && responseData.payload.foundCartProducts ) {

            return this.$q.resolve( responseData.payload.foundCartProducts );

          } else {

            return this.$q.reject( {
              message: responseData.message
            } );

          }

        } )
        .catch( ( reason: any ) => {

          let message = ( reason && reason.message ) ? reason.message : "Operation failed";

          this.ToastService.showSimple( message );

          return this.$q.reject( {
            message: message
          } );

        } );

    }

    /***************************************************/

    public getCartProduct = ( cartProductId: string ): ng.IPromise<cartProduct.Super> => {

      return this.$http.get( this.urlPrefix + "/getCartProduct/" + cartProductId )
        .then( ( response: ng.IHttpResponse<{}> ) => {

          let responseData: networkCall.ResponseData = response.data as networkCall.ResponseData;

          if ( responseData.payload && responseData.payload.foundCartProduct ) {

            return this.$q.resolve( responseData.payload.foundCartProduct );

          } else {

            return this.$q.reject( {
              message: responseData.message
            } );

          }

        } )
        .catch( ( reason: any ) => {

          let message = ( reason && reason.message ) ? reason.message : "Operation failed";

          this.ToastService.showSimple( message );

          return this.$q.reject( {
            message: message
          } );

        } );

    }

    /***************************************************/

    public addCartProduct = ( details: interfaces.AddDetails ): ng.IPromise<cartProduct.Super> => {

      return this.$http.post( this.urlPrefix + "/addCartProduct", details )
        .then( ( response: ng.IHttpResponse<{}> ) => {

          let responseData: networkCall.ResponseData = response.data as networkCall.ResponseData;

          if ( responseData.payload && responseData.payload.addedCartProduct ) {

            this.ToastService.showSimple( "Cart product added" );

            return this.$q.resolve( responseData.payload.addedCartProduct );

          } else {

            return this.$q.reject( {
              message: responseData.message
            } );

          }

        } )
        .catch( ( reason: any ) => {

          let message = ( reason && reason.message ) ? reason.message : "Operation failed";

          this.ToastService.showSimple( message );

          return this.$q.reject( {
            message: message
          } );

        } );

    }

    /***************************************************/

    public updateCartProduct = ( cartProductId: string, details: interfaces.UpdateDetails ): ng.IPromise<cartProduct.Super> => {

      return this.$http.post( this.urlPrefix + "/updateCartProduct/" + cartProductId, details )
        .then( ( response: ng.IHttpResponse<{}> ) => {

          let responseData: networkCall.ResponseData = response.data as networkCall.ResponseData;

          if ( responseData.payload && responseData.payload.updatedCartProduct ) {

            this.ToastService.showSimple( "Cart product updated" );

            return this.$q.resolve( responseData.payload.updateCartProduct );

          } else {

            return this.$q.reject( {
              message: responseData.message
            } );

          }

        } )
        .catch( ( reason: any ) => {

          let message = ( reason && reason.message ) ? reason.message : "Operation failed";

          this.ToastService.showSimple( message );

          return this.$q.reject( {
            message: message
          } );

        } );

    }

    /***************************************************/

    public removeCartProduct = ( cartProductId: string ): ng.IPromise<void> => {

      return this.$http.get( this.urlPrefix + "/deleteCartProduct/" + cartProductId )
        .then( ( response: ng.IHttpResponse<{}> ) => {

          let responseData: networkCall.ResponseData = response.data as networkCall.ResponseData;

          if ( responseData.success ) {

            this.ToastService.showSimple( "Cart product removed" );

            return this.$q.resolve();

          } else {

            return this.$q.reject( {
              message: responseData.message
            } );

          }

        } )
        .catch( ( reason: any ) => {

          let message = ( reason && reason.message ) ? reason.message : "Operation failed";

          this.ToastService.showSimple( message );

          return this.$q.reject( {
            message: message
          } );

        } );

    }

    /***************************************************/

  }

}

  /*******************************************************************/