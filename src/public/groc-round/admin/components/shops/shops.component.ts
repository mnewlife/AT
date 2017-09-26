
module GrocRoundAdminShopsComponent {

  import user = User;

  import interfaces = GrocRoundAdminShopsComponentInterfaces;
  import toastService = ToastServiceInterfaces;
  import shopsService = GrocRoundAdminShopsServiceInterfaces;
  import shop = Shop;

  export class Component implements interfaces.Instance {

    /***************************************************/

    public shops: shop.Super[];
    public progress: shopsService.Instance[ "progress" ];
    public promises: shopsService.Instance[ "promises" ];
    public errorMessage: string;

    /***************************************************/

    constructor(
      private readonly $q: ng.IQService,
      private readonly $location: ng.ILocationService,
      private readonly $mdDialog: ng.material.IDialogService,
      private readonly ToastService: toastService.Instance,
      private readonly ShopsService: shopsService.Instance
    ) {

      this.shops = this.ShopsService.shops;

      this.attachToPromise();

      if ( !this.shops.length && !this.ShopsService.progress.getShops ) {
        this.getShops();
      }

    }

    /***************************************************/

    public route = ( destination: string ) => {

      if ( destination ) {
        this.$location.path( destination );
      }

    }

    /***************************************************/

    private attachToPromise = () => {

      this.ShopsService.promises.getShops
        .then(( done: boolean ) => {

          if ( done ) {
            this.errorMessage = null;
          }

        } )
        .catch(( reason: any ) => {

          this.errorMessage = ( reason && reason.message ) ? reason.message : "Couldn't get shops";

        } );

    }

    /***************************************************/

    private readonly getShops = () => {

      this.ShopsService.getShops()
        .catch(( reason: any ) => {

          this.errorMessage = ( reason && reason.message ) ? reason.message : "Couldn't get shop records";

        } );

    }

    /***************************************************/

  }

}

/*******************************************************************/
