
module GrocRoundAdminShopsService {

  import shop = Shop;

  import interfaces = GrocRoundAdminShopsServiceInterfaces;
  import networkCall = NetworkCallInterfaces;
  import toastService = ToastServiceInterfaces;
  import contextsService = GrocRoundAdminContextsServiceInterfaces;

  export class Service implements interfaces.Instance {

    /***************************************************/

    public shops: shop.Super[];
    public progress: {
      getShops: boolean;      
    };
    public promises: {
      getShops: ng.IPromise<boolean>;
    };

    private urlPrefix: string = "/grocRound/admin/shops";

    /***************************************************/

    constructor(
      private readonly $q: ng.IQService,
      private readonly $http: ng.IHttpService,
      private readonly $timeout: ng.ITimeoutService,
      private readonly ToastService: toastService.Instance,
      private readonly ContextsService: contextsService.Instance
    ) {

      this.progress = {
        getShops: false
      };
      this.promises = {
        getShops: this.$q.resolve( false )
      };

      this.shops = [];

      this.getShops();

    }

    /***************************************************/

    public getShops = (): ng.IPromise<boolean> => {

      this.progress.getShops = true;

      let promise = this.$http.get( this.urlPrefix + "/getShops" )
        .then(( response: ng.IHttpResponse<{}> ) => {

          this.progress.getShops = false;

          let responseData: networkCall.ResponseData = response.data as networkCall.ResponseData;

          if ( responseData.success ) {

            this.$timeout(() => {

              if ( this.shops.length ) {
                this.shops = [];
              }

              responseData.payload.foundShops.forEach(( shop: shop.Super ) => {
                this.shops.push( shop );
              } );

            } );

            return this.$q.resolve( true );

          } else {

            let message = ( responseData.message ) ? responseData.message : "Couldn't get shop records";

            this.ToastService.showSimple( message );

            return this.$q.reject( {
              message: message
            } );

          }

        } )
        .catch(( reason: any ) => {

          this.progress.getShops = false;

          let message = "Shops not found";
          this.ToastService.showSimple( message );
          return this.$q.reject( {
            message: message
          } );

        } );

      angular.copy( promise, this.promises.getShops );

      return this.promises.getShops;

    }

    /***************************************************/

    public getShop = ( shopId: string ): ng.IPromise<shop.Super> => {

      return this.$http.get( this.urlPrefix + "/getShop/" + shopId )
        .then(( response: ng.IHttpResponse<{}> ) => {

          let responseData: networkCall.ResponseData = response.data as networkCall.ResponseData;

          if ( responseData.success ) {

            return this.$q.resolve( responseData.payload.foundShop );

          } else {

            let message = ( responseData.message ) ? responseData.message : "Couldn't get shop record";

            this.ToastService.showSimple( message );

            return this.$q.reject( {
              message: message
            } );

          }

        } )
        .catch(( reason: any ) => {

          this.progress.getShops = false;

          let message = "Shop not found";
          this.ToastService.showSimple( message );
          return this.$q.reject( {
            message: message
          } );

        } );

    }

    /***************************************************/

    public addShop = ( details: interfaces.AddDetails ): ng.IPromise<void> => {

      return this.$http.post( this.urlPrefix + "/addShop", details )
        .then(( response: ng.IHttpResponse<{}> ) => {

          let responseData: networkCall.ResponseData = response.data as networkCall.ResponseData;

          if ( responseData.success ) {

            this.$timeout(() => {
              this.shops.push( responseData.payload.addedShop );
            } );

            this.ToastService.showSimple( "Shop Added" );

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

    public updateShop = ( shopId: string, details: interfaces.UpdateDetails ): ng.IPromise<void> => {

      return this.$http.post( this.urlPrefix + "/updateShop/" + shopId, details )
        .then(( response: ng.IHttpResponse<{}> ) => {

          let responseData: networkCall.ResponseData = response.data as networkCall.ResponseData;

          if ( responseData.success ) {

            this.$timeout(() => {

              let matches = this.shops.filter(( shop ) => {
                return ( responseData.payload.updatedShop.id === shop.id );
              } );

              if ( matches.length ) {
                angular.copy( responseData.payload.updatedShop, this.shops[ this.shops.indexOf( matches[ 0 ] ) ] );
              }

            } );

            this.ToastService.showSimple( "Shop record updated" );

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

    public removeShop = ( shopId: string ): ng.IPromise<void> => {

      return this.$http.get( this.urlPrefix + "/deleteShop/" + shopId )
        .then(( response: ng.IHttpResponse<{}> ) => {

          let responseData: networkCall.ResponseData = response.data as networkCall.ResponseData;

          if ( responseData.success ) {

            this.$timeout(() => {

              let matches = this.shops.filter(( shop ) => {
                return ( shop.id === shopId );
              } );

              if ( matches.length ) {
                this.shops.splice( this.shops.indexOf( matches[ 0 ] ), 1 );
              }

            } );

            this.ToastService.showSimple( "Shop record deleted" );

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