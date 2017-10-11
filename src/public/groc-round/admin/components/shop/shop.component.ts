
module GrocRoundAdminShopComponent {

  import shop = Shop;

  import interfaces = GrocRoundAdminShopComponentInterfaces;
  import toastService = ToastServiceInterfaces;
  import dialogService = DialogServiceInterfaces;
  import shopsService = GrocRoundAdminShopsServiceInterfaces;

  export class Component implements interfaces.Instance {

    /***************************************************/

    public shop: shop.Super;
    public loading: boolean;
    public deleting: boolean;
    public errorMessage: string;

    /***************************************************/

    constructor(
      private readonly $q: ng.IQService,
      private readonly $location: ng.ILocationService,
      private readonly $routeParams: ng.route.IRouteParamsService,
      private readonly $mdDialog: ng.material.IDialogService,
      private readonly ToastService: toastService.Instance,
      private readonly DialogService: dialogService.Instance,
      private readonly ShopsService: shopsService.Instance
    ) {

      this.initMembers();
      this.deriveShopId();

    }

    /***************************************************/

    private initMembers = () => {

      this.shop = {} as any;

    }

    /***************************************************/

    private deriveShopId = () => {

      if ( this.$routeParams.shopId ) {
        this.getShopRecord( this.$routeParams.shopId );
      } else {
        window.history.back();
      }

    }

    /***************************************************/

    private getShopRecord = ( id: string ) => {

      this.loading = true;

      let matches = this.ShopsService.shops.filter( ( shop ) => {
        return ( shop.id === id );
      } );

      if ( matches.length ) {

        this.shop = this.ShopsService.shops[ this.ShopsService.shops.indexOf( matches[ 0 ] ) ];
        this.errorMessage = null;
        this.loading = false;

      } else {

        this.ShopsService.getShop( id )
          .then( ( foundShop: shop.Super ) => {

            angular.copy( foundShop, this.shop );
            this.errorMessage = null;

          } )
          .catch( ( reason: any ) => {

            this.errorMessage = ( reason && reason.message ) ? reason.message : "Couldn't get shop record";

          } )
          .finally( () => {

            this.loading = false;

          } );

      }

    }

    /***************************************************/

    public deleteShop = (): any => {

      this.deleting = true;

      this.DialogService.showConfirm( "Delete Shop", "Are you sure?", null )
        .then( ( sure: boolean ) => {

          if ( sure ) {
            return this.ShopsService.removeShop( this.shop.id );
          } else {
            return this.$q.reject();
          }

        } )
        .then( ( response: any ) => {

          this.$location.path( "/shops" );

        } )
        .finally( () => {

          this.deleting = false;

        } )

    }

    /***************************************************/

  }

}

/*******************************************************************/
