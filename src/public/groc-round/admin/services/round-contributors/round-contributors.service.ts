module GrocRoundAdminRoundContributorsService {

  import roundContributor = RoundContributor;

  import interfaces = GrocRoundAdminRoundContributorsServiceInterfaces;
  import networkCall = NetworkCallInterfaces;
  import toastService = ToastServiceInterfaces;

  export class Service implements interfaces.Instance {

    /***************************************************/

    private urlPrefix: string = "/grocRound/admin/roundContributors";

    /***************************************************/

    constructor(
      private readonly $q: ng.IQService,
      private readonly $http: ng.IHttpService,
      private readonly ToastService: toastService.Instance
    ) { }

    /***************************************************/

    public getRoundContributors = ( round: string, user: string ): ng.IPromise<roundContributor.Super[]> => {

      let q = [];

      let url = this.urlPrefix + "/getRoundContributors";

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

          if ( responseData.payload && responseData.payload.foundRoundContributors ) {

            return this.$q.resolve( responseData.payload.foundRoundContributors );

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

    public getRoundContributor = ( roundContributorId: string ): ng.IPromise<roundContributor.Super> => {

      return this.$http.get( this.urlPrefix + "/getRoundContributor/" + roundContributorId )
        .then( ( response: ng.IHttpResponse<{}> ) => {

          let responseData: networkCall.ResponseData = response.data as networkCall.ResponseData;

          if ( responseData.payload && responseData.payload.foundRoundContributor ) {

            return this.$q.resolve( responseData.payload.foundRoundContributor );

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

    public addRoundContributor = ( details: interfaces.AddDetails ): ng.IPromise<roundContributor.Super> => {

      return this.$http.post( this.urlPrefix + "/addRoundContributor", details )
        .then( ( response: ng.IHttpResponse<{}> ) => {

          let responseData: networkCall.ResponseData = response.data as networkCall.ResponseData;

          if ( responseData.payload && responseData.payload.addedRoundContributor ) {

            this.ToastService.showSimple( "Cart product added" );

            return this.$q.resolve( responseData.payload.addedRoundContributor );

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

    public updateRoundContributor = ( roundContributorId: string, details: interfaces.UpdateDetails ): ng.IPromise<roundContributor.Super> => {

      return this.$http.post( this.urlPrefix + "/updateRoundContributor/" + roundContributorId, details )
        .then( ( response: ng.IHttpResponse<{}> ) => {

          let responseData: networkCall.ResponseData = response.data as networkCall.ResponseData;

          if ( responseData.payload && responseData.payload.updatedRoundContributor ) {

            this.ToastService.showSimple( "Cart product updated" );

            return this.$q.resolve( responseData.payload.updateRoundContributor );

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