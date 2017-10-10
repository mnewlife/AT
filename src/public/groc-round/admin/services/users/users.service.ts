
module GrocRoundAdminUsersService {

  import user = User;

  import interfaces = GrocRoundAdminUsersServiceInterfaces;
  import networkCall = NetworkCallInterfaces;
  import toastService = ToastServiceInterfaces;
  import contextsService = GrocRoundAdminContextsServiceInterfaces;

  export class Service implements interfaces.Instance {

    /***************************************************/

    public users: user.Super[];
    public progress: {
      getUsers: boolean;
    };
    public promises: {
      getUsers: ng.IPromise<boolean>;
    };

    private urlPrefix: string = "/core/users";

    /***************************************************/

    constructor(
      private readonly $q: ng.IQService,
      private readonly $http: ng.IHttpService,
      private readonly $timeout: ng.ITimeoutService,
      private readonly ToastService: toastService.Instance
    ) {

      this.progress = {
        getUsers: false
      };
      this.promises = {
        getUsers: this.$q.resolve( false )
      };

      this.users = [];

      this.getUsers();

    }

    /***************************************************/

    public getUsers = (): ng.IPromise<boolean> => {

      this.progress.getUsers = true;

      let promise = this.$http.get( this.urlPrefix + "/getUsers" )
        .then( ( response: ng.IHttpResponse<{}> ) => {

          this.progress.getUsers = false;

          let responseData: networkCall.ResponseData = response.data as networkCall.ResponseData;

          if ( responseData.success ) {

            this.$timeout( () => {

              if ( this.users.length ) {
                this.users = [];
              }

              responseData.payload.foundUsers.forEach( ( user: user.Super ) => {
                this.users.push( user );
              } );

            } );

            return this.$q.resolve( true );

          } else {

            return this.$q.reject( {
              message: responseData.message
            } );

          }

        } )
        .catch( ( reason: any ) => {

          this.progress.getUsers = false;

          let message = ( reason && reason.message ) ? reason.message : "Operation Failed";

          this.ToastService.showSimple( message );

          return this.$q.reject( {
            message: message
          } );

        } );

      angular.copy( promise, this.promises.getUsers );

      return this.promises.getUsers;

    }

    /***************************************************/

    public getUser = ( userId: string ): ng.IPromise<user.Super> => {

      return this.$http.get( this.urlPrefix + "/getUser/" + userId )
        .then( ( response: ng.IHttpResponse<{}> ) => {

          let responseData: networkCall.ResponseData = response.data as networkCall.ResponseData;

          if ( responseData.success ) {

            return this.$q.resolve( responseData.payload.foundUser );

          } else {

            return this.$q.reject( {
              message: responseData.message
            } );

          }

        } )
        .catch( ( reason: any ) => {

          this.progress.getUsers = false;

          let message = ( reason && reason.message ) ? reason.message : "Operation Failed";

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