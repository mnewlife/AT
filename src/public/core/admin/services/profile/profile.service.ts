
module CoreAdminProfileService {

  import user = User;

  import interfaces = CoreAdminProfileServiceInterfaces;
  import networkCall = NetworkCallInterfaces;
  import toastService = ToastServiceInterfaces;
  import contextsService = CoreAdminContextsServiceInterfaces;

  export class Service implements interfaces.Instance {

    /***************************************************/

    public user: user.Super;
    public progress: {
      getUser: boolean;
      updateDetails: boolean;
      changeEmailAddress: boolean;
      changePassword: boolean;
      signOut: boolean;
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
        getUser: false,
        updateDetails: false,
        changeEmailAddress: false,
        changePassword: false,
        signOut: false
      };

      this.user = {} as any;

      if ( this.ContextsService.currentUser ) {
        angular.copy( this.ContextsService.currentUser, this.user );
      } else {
        this.getUser();
      }

    }

    /***************************************************/

    public signOut = () => {

      this.progress.signOut = true;

      return this.$http.get( "core/auth/signOut" )
        .then(( response: ng.IHttpResponse<{}> ) => {

          this.progress.signOut = false;

          window.location.href = "/passpoint";

        } )
        .catch(( reason: any ) => {

          this.progress.signOut = false;

          this.ToastService.showSimple( "Something went wrong signing you out" );

        } )

    }

    /***************************************************/

    public getUser = (): ng.IPromise<void> => {

      this.progress.getUser = true;

      return this.$http.get( "/core/admin/profile/getDetails" )
        .then(( response: ng.IHttpResponse<{}> ) => {

          this.progress.getUser = false;

          let responseData: networkCall.ResponseData = response.data as networkCall.ResponseData;

          if ( responseData.success ) {

            this.$timeout(() => {
              angular.copy( responseData.payload.user, this.user );
            } );

            return this.$q.resolve();

          } else {

            let message = ( responseData.message ) ? responseData.message : "Couldn't get your details";

            this.ToastService.showSimple( message );

            return this.$q.reject( {
              message: message
            } );

          }

        } )
        .catch(( reason: any ) => {

          this.progress.getUser = false;

          console.log( reason );

          let message = "Something went wrong";
          this.ToastService.showSimple( message );
          return this.$q.reject( {
            message: message
          } );

        } );

    }

    /***************************************************/

    public updateDetails = ( details: interfaces.UpdateDetails ): ng.IPromise<void> => {

      this.progress.updateDetails = true;

      return this.$http.post( "/core/profile/updateDetails", details )
        .then(( response: ng.IHttpResponse<{}> ) => {

          this.progress.updateDetails = false;

          let responseData: networkCall.ResponseData = response.data as networkCall.ResponseData;

          if ( responseData.success ) {

            this.$timeout(() => {
              angular.copy( responseData.payload, this.user );
            } );

            this.ToastService.showSimple( "Profile updated" );

            return this.$q.resolve();

          } else {

            return this.$q.reject( {
              message: ( responseData.message ) ? responseData.message : ""
            } );

          }

        } )
        .catch(( reason: any ) => {

          this.progress.updateDetails = false;

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

    public changeEmailAddress = ( password: string, newEmailAddress: string ): ng.IPromise<void> => {

      let details = {
        password: password,
        newEmailAddress: newEmailAddress
      };

      this.progress.changeEmailAddress = true;

      return this.$http.post( "/core/profile/changeEmailAddress/:" + this.user.id, details )
        .then(( response: ng.IHttpResponse<{}> ) => {

          this.progress.changeEmailAddress = false;

          let responseData: networkCall.ResponseData = response.data as networkCall.ResponseData;

          if ( responseData.success ) {

            window.location.href = "/passpoint";
            return this.$q.resolve();

          } else {

            return this.$q.reject( {
              message: ( responseData.message ) ? responseData.message : ""
            } );

          }

        } )
        .catch(( reason: any ) => {

          this.progress.changeEmailAddress = false;

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

    public changePassword = ( oldPassword: string, newPassword: string ): ng.IPromise<void> => {

      let details = {
        oldPassword: oldPassword,
        newPassword: newPassword
      };

      this.progress.changePassword = true;

      return this.$http.post( "/core/profile/changePassword", details )
        .then(( response: ng.IHttpResponse<{}> ) => {

          this.progress.changePassword = false;

          let responseData: networkCall.ResponseData = response.data as networkCall.ResponseData;

          if ( responseData.success ) {

            this.ToastService.showSimple( "Password changed" );
            return this.$q.resolve();

          } else {

            return this.$q.reject( {
              message: ( responseData.message ) ? responseData.message : ""
            } );

          }

        } )
        .catch(( reason: any ) => {

          this.progress.changePassword = false;

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