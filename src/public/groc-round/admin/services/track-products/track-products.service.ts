module GrocRoundAdminTrackProductsService {

  import trackProduct = TrackProduct;

  import interfaces = GrocRoundAdminTrackProductsServiceInterfaces;
  import networkCall = NetworkCallInterfaces;
  import toastService = ToastServiceInterfaces;

  export class Service implements interfaces.Instance {

    /***************************************************/

    private urlPrefix: string = "/grocRound/admin/trackProducts";

    /***************************************************/

    constructor(
      private readonly $q: ng.IQService,
      private readonly $http: ng.IHttpService,
      private readonly ToastService: toastService.Instance
    ) { }

    /***************************************************/

    public getTrackProducts = ( track: string ): ng.IPromise<trackProduct.Super[]> => {

      return this.$http.get( this.urlPrefix + "/getTrackProducts?trackId=" + track )
        .then( ( response: ng.IHttpResponse<{}> ) => {

          let responseData: networkCall.ResponseData = response.data as networkCall.ResponseData;

          if ( responseData.payload && responseData.payload.foundTrackProducts ) {

            return this.$q.resolve( responseData.payload.foundTrackProducts );

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

    public getTrackProduct = ( trackProductId: string ): ng.IPromise<trackProduct.Super> => {

      return this.$http.get( this.urlPrefix + "/getTrackProduct/" + trackProductId )
        .then( ( response: ng.IHttpResponse<{}> ) => {

          let responseData: networkCall.ResponseData = response.data as networkCall.ResponseData;

          if ( responseData.payload && responseData.payload.foundTrackProduct ) {

            return this.$q.resolve( responseData.payload.foundTrackProduct );

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

    public addTrackProduct = ( details: interfaces.AddDetails ): ng.IPromise<trackProduct.Super> => {

      return this.$http.post( this.urlPrefix + "/addTrackProduct", details )
        .then( ( response: ng.IHttpResponse<{}> ) => {

          let responseData: networkCall.ResponseData = response.data as networkCall.ResponseData;

          if ( responseData.payload && responseData.payload.addedTrackProduct ) {

            this.ToastService.showSimple( "Cart product added" );

            return this.$q.resolve( responseData.payload.addedTrackProduct );

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

    public updateTrackProduct = ( trackProductId: string, details: interfaces.UpdateDetails ): ng.IPromise<trackProduct.Super> => {

      return this.$http.post( this.urlPrefix + "/updateTrackProduct/" + trackProductId, details )
        .then( ( response: ng.IHttpResponse<{}> ) => {

          let responseData: networkCall.ResponseData = response.data as networkCall.ResponseData;

          if ( responseData.payload && responseData.payload.updatedTrackProduct ) {

            this.ToastService.showSimple( "Cart product updated" );

            return this.$q.resolve( responseData.payload.updateTrackProduct );

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

    public removeTrackProduct = ( trackProductId: string ): ng.IPromise<void> => {

      return this.$http.get( this.urlPrefix + "/deleteTrackProduct/" + trackProductId )
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