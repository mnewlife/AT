module GrocRoundAdminRoundsService {

  import round = Round;

  import interfaces = GrocRoundAdminRoundsServiceInterfaces;
  import networkCall = NetworkCallInterfaces;
  import toastService = ToastServiceInterfaces;

  export class Service implements interfaces.Instance {

    /***************************************************/

    private urlPrefix: string = "/grocRound/admin/rounds";

    /***************************************************/

    constructor(
      private readonly $q: ng.IQService,
      private readonly $http: ng.IHttpService,
      private readonly ToastService: toastService.Instance
    ) { }

    /***************************************************/

    public convertJSONObjects = ( rounds: any[] ) => {

      rounds.forEach( ( round ) => {
        round.duration.start = new Date( round.duration.start );
        round.duration.end = new Date( round.duration.end );
      } );

    }

    public getRounds = (): ng.IPromise<round.Super[]> => {

      return this.$http.get( this.urlPrefix + "/getRounds" )
        .then( ( response: ng.IHttpResponse<{}> ) => {

          let responseData: networkCall.ResponseData = response.data as networkCall.ResponseData;

          if ( responseData.payload && responseData.payload.foundRounds ) {

            this.convertJSONObjects( responseData.payload.foundRounds );

            return this.$q.resolve( responseData.payload.foundRounds );

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

    public getRound = ( roundId: string ): ng.IPromise<round.Super> => {

      return this.$http.get( this.urlPrefix + "/getRound/" + roundId )
        .then( ( response: ng.IHttpResponse<{}> ) => {

          let responseData: networkCall.ResponseData = response.data as networkCall.ResponseData;

          if ( responseData.payload && responseData.payload.foundRound ) {

            this.convertJSONObjects( [ responseData.payload.foundRound ] );

            return this.$q.resolve( responseData.payload.foundRound );

          } else {

            return this.$q.reject( {
              message: responseData.message
            } );

          }

        } )
        .catch( ( reason: any ) => {

          console.log( reason );

          let message = ( reason.message ) ? reason.message : "Operation failed";

          this.ToastService.showSimple( message );

          return this.$q.reject( {
            message: message
          } );

        } );

    }

    /***************************************************/

    public addRound = ( details: interfaces.AddDetails ): ng.IPromise<round.Super> => {

      return this.$http.post( this.urlPrefix + "/addRound", details )
        .then( ( response: ng.IHttpResponse<{}> ) => {

          let responseData: networkCall.ResponseData = response.data as networkCall.ResponseData;

          if ( responseData.payload && responseData.payload.addedRound ) {

            this.ToastService.showSimple( "Cart product added" );

            return this.$q.resolve( responseData.payload.addedRound );

          } else {

            return this.$q.reject( {
              message: responseData.message
            } );

          }

        } )
        .catch( ( reason: any ) => {

          console.log( reason );

          let message = ( reason.message ) ? reason.message : "Operation failed";

          this.ToastService.showSimple( message );

          return this.$q.reject( {
            message: message
          } );

        } );

    }

    /***************************************************/

    public updateRound = ( roundId: string, details: interfaces.UpdateDetails ): ng.IPromise<round.Super> => {

      return this.$http.post( this.urlPrefix + "/updateRound/" + roundId, details )
        .then( ( response: ng.IHttpResponse<{}> ) => {

          let responseData: networkCall.ResponseData = response.data as networkCall.ResponseData;

          if ( responseData.payload && responseData.payload.updatedRound ) {

            this.ToastService.showSimple( "Cart product updated" );

            return this.$q.resolve( responseData.payload.updateRound );

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