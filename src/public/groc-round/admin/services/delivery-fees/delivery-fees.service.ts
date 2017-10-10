module GrocRoundAdminDeliveryFeesService {
  
    import deliveryFee = DeliveryFee;
  
    import interfaces = GrocRoundAdminDeliveryFeesServiceInterfaces;
    import networkCall = NetworkCallInterfaces;
    import toastService = ToastServiceInterfaces;
  
    export class Service implements interfaces.Instance {
  
      /***************************************************/
  
      private urlPrefix: string = "/grocRound/admin/deliveryFees";
  
      /***************************************************/
  
      constructor(
        private readonly $q: ng.IQService,
        private readonly $http: ng.IHttpService,
        private readonly ToastService: toastService.Instance
      ) { }
  
      /***************************************************/
  
      public getDeliveryFees = ( round: string, user: string ): ng.IPromise<deliveryFee.Super[]> => {
  
        let q = [];
  
        let url = this.urlPrefix + "/getDeliveryFees";
  
        if ( round ) {
          q.push( "roundId=" + round );
        }
  
        if ( user ) {
          q.push( "userId=" + user );
        }
  
        if ( q.length ) {
          url += "?" + q.join( "&" );
        }
  
        return this.$http.get( url )
          .then( ( response: ng.IHttpResponse<{}> ) => {
  
            let responseData: networkCall.ResponseData = response.data as networkCall.ResponseData;
  
            if ( responseData.payload && responseData.payload.foundDeliveryFees ) {
  
              return this.$q.resolve( responseData.payload.foundDeliveryFees );
  
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
  
      public getDeliveryFee = ( deliveryFeeId: string ): ng.IPromise<deliveryFee.Super> => {
  
        return this.$http.get( this.urlPrefix + "/getDeliveryFee/" + deliveryFeeId )
          .then( ( response: ng.IHttpResponse<{}> ) => {
  
            let responseData: networkCall.ResponseData = response.data as networkCall.ResponseData;
  
            if ( responseData.payload && responseData.payload.foundDeliveryFee ) {
  
              return this.$q.resolve( responseData.payload.foundDeliveryFee );
  
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
  
      public addDeliveryFee = ( details: interfaces.AddDetails ): ng.IPromise<deliveryFee.Super> => {
  
        return this.$http.post( this.urlPrefix + "/addDeliveryFee", details )
          .then( ( response: ng.IHttpResponse<{}> ) => {
  
            let responseData: networkCall.ResponseData = response.data as networkCall.ResponseData;
  
            if ( responseData.payload && responseData.payload.addedDeliveryFee ) {
  
              this.ToastService.showSimple( "Cart product added" );
  
              return this.$q.resolve( responseData.payload.addedDeliveryFee );
  
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
  
      public updateDeliveryFee = ( deliveryFeeId: string, details: interfaces.UpdateDetails ): ng.IPromise<deliveryFee.Super> => {
  
        return this.$http.post( this.urlPrefix + "/updateDeliveryFee/" + deliveryFeeId, details )
          .then( ( response: ng.IHttpResponse<{}> ) => {
  
            let responseData: networkCall.ResponseData = response.data as networkCall.ResponseData;
  
            if ( responseData.payload && responseData.payload.updatedDeliveryFee ) {
  
              this.ToastService.showSimple( "Cart product updated" );
  
              return this.$q.resolve( responseData.payload.updateDeliveryFee );
  
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
  
      public removeDeliveryFee = ( deliveryFeeId: string ): ng.IPromise<void> => {
  
        return this.$http.get( this.urlPrefix + "/deleteDeliveryFee/" + deliveryFeeId )
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