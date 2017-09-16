
module UserService {

  import interfaces = UserServiceInterfaces;
  import networkCall = NetworkCallInterfaces;
  import toastService = ToastServiceInterfaces;

  export class Service implements interfaces.Instance {

    /***************************************************/

    constructor(
      private readonly $q: ng.IQService,
      private readonly $http: ng.IHttpService,
      private readonly ToastService: toastService.Instance
    ) { }

    /***************************************************/

    public signUp = ( emailAddress: string, password: string ): ng.IPromise<void> => {

      let details = {
        emailAddress: emailAddress,
        password: password
      };

      return this.$http.post( "/core/consumer/registration/signUp", details )
        .then(( response: ng.IHttpResponse<{}> ) => {

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
        .catch(( reason: any ) => {

          let message = "Something went wrong";
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
        .then(( response: ng.IHttpResponse<{}> ) => {

          let responseData: networkCall.ResponseData = response.data as networkCall.ResponseData;
          if ( responseData.success ) {
            return this.$q.resolve();
          } else {
            let message = ( responseData.message ) ? responseData.message : "Couldn't sign you in";
            this.ToastService.showSimple( message );
            return this.$q.reject( {
              message: message
            } );
          }

        } )
        .catch(( reason: any ) => {

          let message = "Something went wrong";
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