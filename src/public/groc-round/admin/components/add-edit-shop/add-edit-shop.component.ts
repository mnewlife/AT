
module GrocRoundAdminAddEditShopComponent {

  import interfaces = GrocRoundAdminAddEditShopComponentInterfaces;
  import toastService = ToastServiceInterfaces;
  import dialogService = DialogServiceInterfaces;
  import shopsService = GrocRoundAdminShopsServiceInterfaces;
  import shop = Shop;

  export class Component implements interfaces.Instance {

    /***************************************************/

    public progress: shopsService.Instance[ "progress" ];
    public editMode: boolean;
    public errorMessage: string;

    public loading: boolean;
    public adding: boolean;
    public updating: boolean;
    public deleting: boolean;

    public addDetails: shopsService.AddDetails;
    public updateDetails: shopsService.UpdateDetails;
    public shopId: string;

    private promises: shopsService.Instance[ "promises" ];

    /***************************************************/

    constructor(
      private readonly $q: ng.IQService,
      private readonly $routeParams: ng.route.IRouteParamsService,
      private readonly $location: ng.ILocationService,
      private readonly $mdDialog: ng.material.IDialogService,
      private readonly ToastService: toastService.Instance,
      private readonly DialogService: dialogService.Instance,
      private readonly ShopsService: shopsService.Instance
    ) {

      this.initMembers();
      this.determineMode();

    }

    /***************************************************/

    private initMembers = () => {

      this.promises = this.ShopsService.promises;
      this.progress = this.ShopsService.progress;

      this.addDetails = {
        shopName: ""
      };

      this.updateDetails = {
        shopName: ""
      };

    }

    /***************************************************/

    private determineMode = () => {

      if ( this.$routeParams.shopId ) {
        this.editMode = true;
        this.shopId = this.$routeParams.shopId;
        this.findShopInfo();
      } else {
        this.editMode = false;
      }

    }

    /***************************************************/

    private findShopInfo = () => {

      this.loading = true;

      let matches = this.ShopsService.shops.filter(( shop ) => {
        return ( this.shopId === shop.id );
      } );

      if ( matches.length ) {

        this.copyDetails( matches[ 0 ] );
        this.loading = false;

      } else {

        this.ShopsService.getShop( this.shopId )
          .then(( foundShop: shop.Super ) => {

            this.copyDetails( foundShop );

          } )
          .catch(( reason: any ) => {

            this.errorMessage = ( reason && reason.message ) ? reason.message : "Couldn't get shop record";

          } )
          .finally(() => {

            this.loading = false;

          } );

      }

    }

    /***************************************************/

    private readonly copyDetails = ( foundShop: shop.Super ) => {

      this.updateDetails = {
        shopName: foundShop.shopName
      };

    }

    /***************************************************/

    public addShop = (): any => {

      if ( !this.addDetails.shopName ) {
        return this.ToastService.showSimple( "Shop name is missing" );
      }

      this.adding = true;

      return this.ShopsService.addShop( this.addDetails )
        .then(( response: any ) => {

          this.$location.path( "/shops" );

        } )
        .finally(() => {

          this.adding = false;

        } );

    }

    /***************************************************/

    public updateShop = (): any => {

      if ( !this.shopId ) {
        return this.ToastService.showSimple( "Shop ID is missing" );
      }

      if ( !this.updateDetails.shopName ) {
        return this.ToastService.showSimple( "Shop name is missing" );
      }

      this.updating = true;

      return this.ShopsService.updateShop( this.shopId, this.updateDetails )
        .then(( response: any ) => {

          this.$location.path( "/shops" );

        } )
        .finally(() => {

          this.updating = false;

        } );

    }

    /***************************************************/

    public deleteShop = (): any => {

      if ( !this.shopId ) {
        return this.ToastService.showSimple( "Shop ID is missing" );
      }

      this.deleting = true;

      this.DialogService.showConfirm( "Delete Shop", "Are you sure?", null )
        .then(( sure: boolean ) => {

          if ( sure ) {
            return this.ShopsService.removeShop( this.shopId );
          } else {
            return this.$q.reject();
          }

        } )
        .then(( response: any ) => {

          this.$location.path( "/shops" );

        } )
        .finally(() => {

          this.deleting = false;

        } );

    }

    /***************************************************/

  }

}

/*******************************************************************/
