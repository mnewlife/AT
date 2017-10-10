module GrocRoundAdminContributionsService {

  import contribution = Contribution;

  import interfaces = GrocRoundAdminContributionsServiceInterfaces;
  import networkCall = NetworkCallInterfaces;
  import toastService = ToastServiceInterfaces;

  export class Service implements interfaces.Instance {

    /***************************************************/

    private urlPrefix: string = "/grocRound/admin/contributions";

    /***************************************************/

    constructor(
      private readonly $q: ng.IQService,
      private readonly $http: ng.IHttpService,
      private readonly ToastService: toastService.Instance
    ) { }

    /***************************************************/

    public getContributions = ( round: string, user: string ): ng.IPromise<contribution.Super[]> => {

      let q = [];

      let url = this.urlPrefix + "/getContributions";

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

          if ( responseData.payload && responseData.payload.foundContributions ) {

            return this.$q.resolve( responseData.payload.foundContributions );

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

    public getContribution = ( contributionId: string ): ng.IPromise<contribution.Super> => {

      return this.$http.get( this.urlPrefix + "/getContribution/" + contributionId )
        .then( ( response: ng.IHttpResponse<{}> ) => {

          let responseData: networkCall.ResponseData = response.data as networkCall.ResponseData;

          if ( responseData.payload && responseData.payload.foundContribution ) {

            return this.$q.resolve( responseData.payload.foundContribution );

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

    public addContribution = ( details: interfaces.AddDetails ): ng.IPromise<contribution.Super> => {

      return this.$http.post( this.urlPrefix + "/addContribution", details )
        .then( ( response: ng.IHttpResponse<{}> ) => {

          let responseData: networkCall.ResponseData = response.data as networkCall.ResponseData;

          if ( responseData.payload && responseData.payload.addedContribution ) {

            this.ToastService.showSimple( "Cart product added" );

            return this.$q.resolve( responseData.payload.addedContribution );

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

    public updateContribution = ( contributionId: string, details: interfaces.UpdateDetails ): ng.IPromise<contribution.Super> => {

      return this.$http.post( this.urlPrefix + "/updateContribution/" + contributionId, details )
        .then( ( response: ng.IHttpResponse<{}> ) => {

          let responseData: networkCall.ResponseData = response.data as networkCall.ResponseData;

          if ( responseData.payload && responseData.payload.updatedContribution ) {

            this.ToastService.showSimple( "Cart product updated" );

            return this.$q.resolve( responseData.payload.updateContribution );

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

    public removeContribution = ( contributionId: string ): ng.IPromise<void> => {

      return this.$http.get( this.urlPrefix + "/deleteContribution/" + contributionId )
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