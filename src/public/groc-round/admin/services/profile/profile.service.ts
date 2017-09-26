
module GrocRoundAdminProfileService {

  import user = User;

  import interfaces = GrocRoundAdminProfileServiceInterfaces;
  import networkCall = NetworkCallInterfaces;
  import toastService = ToastServiceInterfaces;
  import contextsService = GrocRoundAdminContextsServiceInterfaces;

  export class Service implements interfaces.Instance {

    /***************************************************/

    public user: user.Super;
    public progress: {
      signOut: boolean;
    };
    public promises: {
      signOut: ng.IPromise<boolean>;
    };

    /***************************************************/

    constructor(
      private readonly $q: ng.IQService,
      private readonly $http: ng.IHttpService,
      private readonly $timeout: ng.ITimeoutService,
      private readonly ToastService: toastService.Instance,
      private readonly ContextsService: contextsService.Instance
    ) {

      this.progress = {
        signOut: false
      };
      this.promises = {
        signOut: this.$q.resolve( false )
      };

      if ( this.ContextsService.currentUser ) {
        this.user = {} as any;
        angular.copy( this.ContextsService.currentUser, this.user );
      } else {
        window.location.href = "/passpoint";
      }

    }

    /***************************************************/

    public signOut = () => {

      this.progress.signOut = true;

      let promise = this.$http.get( "/core/auth/signOut" )
        .then(( response: ng.IHttpResponse<{}> ) => {

          this.progress.signOut = false;
          window.location.href = "/passpoint";
          return this.$q.resolve( true );

        } )
        .catch(( reason: any ) => {

          this.progress.signOut = false;
          this.ToastService.showSimple( "Something went wrong signing you out" );

        } );

      angular.copy( promise, this.promises.signOut );

    }

    /***************************************************/

  }

}

/*******************************************************************/