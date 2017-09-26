
module GrocRoundAdminPricesService {

  import price = Price;

  import interfaces = GrocRoundAdminPricesServiceInterfaces;
  import networkCall = NetworkCallInterfaces;
  import toastService = ToastServiceInterfaces;
  import contextsService = GrocRoundAdminContextsServiceInterfaces;

  export class Service implements interfaces.Instance {

    /***************************************************/

    public progress: {
      getPrices: boolean;
    };

    private urlPrefix: string = "/grocRound/admin/prices";

    /***************************************************/

    constructor(
      private readonly $q: ng.IQService,
      private readonly $http: ng.IHttpService,
      private readonly $timeout: ng.ITimeoutService,
      private readonly ToastService: toastService.Instance,
      private readonly ContextsService: contextsService.Instance
    ) {

      this.progress = {
        getPrices: false
      };

    }

    /***************************************************/

    public getPrices = ( filtrationCriteria: interfaces.FiltrationCriteria ): ng.IPromise<price.Super[]> => {

      this.progress.getPrices = true;

      let criteria: string[] = [];

      if ( filtrationCriteria ) {
        if ( filtrationCriteria.productId ) {
          criteria.push( "productId=" + filtrationCriteria.productId );
        }
      }

      let url = this.urlPrefix + "/getPrices";

      if ( criteria.length ) {
        url += "?" + criteria.join( "&" );
      }

      return this.$http.get( url )
        .then(( response: ng.IHttpResponse<{}> ) => {

          this.progress.getPrices = false;

          let responseData: networkCall.ResponseData = response.data as networkCall.ResponseData;

          if ( responseData.success ) {

            return this.$q.resolve( responseData.payload.foundPrices );

          } else {

            let message = ( responseData.message ) ? responseData.message : "Couldn't get prices";

            this.ToastService.showSimple( message );

            return this.$q.reject( {
              message: message
            } );

          }

        } )
        .catch(( reason: any ) => {

          this.progress.getPrices = false;

          let message = "Something went wrong";
          this.ToastService.showSimple( message );
          return this.$q.reject( {
            message: message
          } );

        } );

    }

    /***************************************************/

    public getPrice = ( priceId: string ): ng.IPromise<price.Super> => {

      return this.$http.get( this.urlPrefix + "/getPrice/" + priceId )
        .then(( response: ng.IHttpResponse<{}> ) => {

          let responseData: networkCall.ResponseData = response.data as networkCall.ResponseData;

          if ( responseData.success ) {

            return this.$q.resolve( responseData.payload.foundPrice );

          } else {

            let message = ( responseData.message ) ? responseData.message : "Couldn't get price record";

            this.ToastService.showSimple( message );

            return this.$q.reject( {
              message: message
            } );

          }

        } )
        .catch(( reason: any ) => {

          this.progress.getPrices = false;

          let message = "Something went wrong";
          this.ToastService.showSimple( message );
          return this.$q.reject( {
            message: message
          } );

        } );

    }

    /***************************************************/

    public addPrice = ( details: interfaces.AddDetails ): ng.IPromise<price.Super> => {

      return this.$http.post( this.urlPrefix + "/addPrice", details )
        .then(( response: ng.IHttpResponse<{}> ) => {

          let responseData: networkCall.ResponseData = response.data as networkCall.ResponseData;

          if ( responseData.success ) {

            this.ToastService.showSimple( "Price Added" );

            return this.$q.resolve( responseData.payload.addedPrice );

          } else {

            return this.$q.reject( {
              message: ( responseData.message ) ? responseData.message : ""
            } );

          }

        } )
        .catch(( reason: any ) => {

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

    public updatePrice = ( priceId: string, details: interfaces.UpdateDetails ): ng.IPromise<price.Super> => {

      return this.$http.post( this.urlPrefix + "/updatePrice/" + priceId, details )
        .then(( response: ng.IHttpResponse<{}> ) => {

          let responseData: networkCall.ResponseData = response.data as networkCall.ResponseData;

          if ( responseData.success ) {

            this.ToastService.showSimple( "Price updated" );

            return this.$q.resolve( responseData.payload.updatedPrice );

          } else {

            return this.$q.reject( {
              message: ( responseData.message ) ? responseData.message : ""
            } );

          }

        } )
        .catch(( reason: any ) => {

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

    public removePrice = ( priceId: string ): ng.IPromise<void> => {

      return this.$http.get( this.urlPrefix + "/deletePrice/" + priceId )
        .then(( response: ng.IHttpResponse<{}> ) => {

          let responseData: networkCall.ResponseData = response.data as networkCall.ResponseData;

          if ( responseData.success ) {

            this.ToastService.showSimple( "Price deleted" );

            return this.$q.resolve();

          } else {

            return this.$q.reject( {
              message: ( responseData.message ) ? responseData.message : ""
            } );

          }

        } )
        .catch(( reason: any ) => {

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