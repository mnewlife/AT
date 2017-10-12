
module UserService {

  import interfaces = UserServiceInterfaces;
  import networkCall = NetworkCallInterfaces;
  import toastService = ToastServiceInterfaces;
  import contextsService = PasspointContextsServiceInterfaces;

  export class Service implements interfaces.Instance {

    /***************************************************/

    constructor(
      private readonly $q: ng.IQService,
      private readonly $http: ng.IHttpService,
      private readonly ToastService: toastService.Instance,
      private readonly ContextsService: contextsService.Instance
    ) { }

    /***************************************************/

    public requestResetCode = ( emailAddress: string ): ng.IPromise<void> => {

      return this.$http.get( "/core/profile/requestPasswordResetCode/" + emailAddress )
        .then( ( response: ng.IHttpResponse<{}> ) => {

          console.log( response );

          let responseData: networkCall.ResponseData = response.data as networkCall.ResponseData;
          if ( responseData.success ) {

            this.ToastService.showSimple( "Done. An email has been sent to your email address" );
            return this.$q.resolve();

          } else {

            let message = ( responseData.message ) ? responseData.message : "Something went wrong";
            this.ToastService.showSimple( message );
            return this.$q.reject( {
              message: message
            } );

          }

        } )
        .catch( ( reason: any ) => {

          console.log( reason );

          let message = ( reason && reason.message ) ? reason.message : "Something went wrong";
          this.ToastService.showSimple( message );
          return this.$q.reject( {
            message: message
          } );

        } );

    }

    /***************************************************/

    public signUp = ( emailAddress: string, password: string ): ng.IPromise<void> => {

      let details = {
        emailAddress: emailAddress,
        password: password
      };

      return this.$http.post( "/core/consumer/registration/signUp", details )
        .then( ( response: ng.IHttpResponse<{}> ) => {

          let responseData: networkCall.ResponseData = response.data as networkCall.ResponseData;
          if ( responseData.success ) {
            return this.$q.resolve();
          } else {
            let message = ( responseData.message ) ? responseData.message : "Couldn't sign you up";
            this.ToastService.showSimple( message );
            return this.$q.reject( {
              message: message
            } );
          }

        } )
        .catch( ( reason: any ) => {

          let message = ( reason && reason.message ) ? reason.message : "Something went wrong";
          this.ToastService.showSimple( message );
          return this.$q.reject( {
            message: message
          } );

        } );

    }

    /***************************************************/

    public signIn = ( emailAddress: string, password: string ): ng.IPromise<void> => {

      let details = {
        emailAddress: emailAddress,
        password: password
      };

      return this.$http.post( "/core/auth/signIn", details )
        .then( ( response: ng.IHttpResponse<{}> ) => {

          let responseData: networkCall.ResponseData = response.data as networkCall.ResponseData;

          if ( responseData.success ) {

            if ( this.ContextsService.appContext ) {

              let url: string = "/" + this.ContextsService.appContext.split( "-" ).join( "/" );
              if ( this.ContextsService.nextInnerContext ) {
                url += "?innerContext=" + this.ContextsService.nextInnerContext;
              }

              window.location.href = url;

            } else {

              window.location.href = "/";

            }

            return this.$q.resolve();

          } else {

            return this.$q.reject( {
              message: ( responseData.message ) ? responseData.message : ""
            } );

          }

        } )
        .catch( ( reason: any ) => {

          let message = ( reason && reason.message ) ? reason.message : "Something went wrong";
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