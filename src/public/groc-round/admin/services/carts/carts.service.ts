module GrocRoundAdminCartsService {

  import cart = Cart;

  import interfaces = GrocRoundAdminCartsServiceInterfaces;
  import networkCall = NetworkCallInterfaces;
  import toastService = ToastServiceInterfaces;

  export class Service implements interfaces.Instance {

    /***************************************************/

    private urlPrefix: string = "/grocRound/admin/carts";

    /***************************************************/

    constructor(
      private readonly $q: ng.IQService,
      private readonly $http: ng.IHttpService,
      private readonly ToastService: toastService.Instance
    ) { }

    /***************************************************/

    public getCarts = ( roundId: string ): ng.IPromise<cart.Super[]> => {

      return this.$http.get( this.urlPrefix + "/getCarts?roundId=" + roundId )
        .then( ( response: ng.IHttpResponse<{}> ) => {

          let responseData: networkCall.ResponseData = response.data as networkCall.ResponseData;

          if ( responseData.payload && responseData.payload.foundCarts ) {

            return this.$q.resolve( responseData.payload.foundCarts );

          } else {

            return this.$q.reject( {
              message: responseData.message
            } );

          }

        } )
        .catch( ( reason: any ) => {

          let message = ( reason.message ) ? reason.message : "Operation failed";

          this.ToastService.showSimple( message );

          return this.$q.reject( {
            message: message
          } );

        } );

    }

    /***************************************************/

    public getCart = ( cartId: string ): ng.IPromise<cart.Super> => {

      return this.$http.get( this.urlPrefix + "/getCart/" + cartId )
        .then( ( response: ng.IHttpResponse<{}> ) => {

          let responseData: networkCall.ResponseData = response.data as networkCall.ResponseData;

          if ( responseData.payload && responseData.payload.foundCart ) {

            return this.$q.resolve( responseData.payload.foundCart );

          } else {

            return this.$q.reject( {
              message: responseData.message
            } );

          }

        } )
        .catch( ( reason: any ) => {

          let message = ( reason.message ) ? reason.message : "Operation failed";

          this.ToastService.showSimple( message );

          return this.$q.reject( {
            message: message
          } );

        } );

    }

    /***************************************************/

    public updateCart = ( cartId: string, details: interfaces.UpdateDetails ): ng.IPromise<cart.Super> => {

      return this.$http.post( this.urlPrefix + "/updateCart/" + cartId, details )
        .then( ( response: ng.IHttpResponse<{}> ) => {

          let responseData: networkCall.ResponseData = response.data as networkCall.ResponseData;

          if ( responseData.payload && responseData.payload.updatedCart ) {

            this.ToastService.showSimple( "Cart product updated" );

            return this.$q.resolve( responseData.payload.updateCart );

          } else {

            return this.$q.reject( {
              message: responseData.message
            } );

          }

        } )
        .catch( ( reason: any ) => {

          let message = ( reason.message ) ? reason.message : "Operation failed";

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