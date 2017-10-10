
module GrocRoundAdminAddPriceService {

  import interfaces = GrocRoundAdminAddPriceServiceInterfaces;
  import shopsService = GrocRoundAdminShopsServiceInterfaces;
  import shop = Shop;

  export class Service implements interfaces.Instance {

    /***************************************************/

    public progress: shopsService.Instance[ "progress" ];

    public shops: shop.Super[];

    public shopId: string;
    public quantity: number;
    public price: number;

    public error: string;

    /***************************************************/

    constructor(
      private readonly $mdDialog: ng.material.IDialogService,
      private readonly ShopsService: GrocRoundAdminShopsServiceInterfaces.Instance
    ) {

      this.clear();

      this.shops = this.ShopsService.shops;

      this.attachToPromise();

      if ( !this.shops.length && !this.ShopsService.progress.getShops ) {
        this.getShops();
      }

    }

    /***************************************************/

    private attachToPromise = () => {

      this.ShopsService.promises.getShops
        .then( ( done: boolean ) => {

          if ( done ) {
            this.error = null;
          }

        } )
        .catch( ( reason: any ) => {

          this.error = ( reason && reason.message ) ? reason.message : "Couldn't get shops";

        } );

    }

    /***************************************************/

    private readonly getShops = () => {

      this.ShopsService.getShops()
        .catch( ( reason: any ) => {

          this.error = ( reason && reason.message ) ? reason.message : "Couldn't get shops";

        } );

    }

    /***************************************************/

    private clear = () => {

      this.shopId = "";
      this.quantity = 1;
      this.price = 0;

      this.error = "";

    }

    /***************************************************/

    public add = () => {

      if ( !this.shopId ) {
        return this.error = "Shop details missing";
      }

      if ( !this.quantity ) {
        return this.error = "Provide quantity";
      }

      if ( !this.price ) {
        return this.error = "Provide price";
      }

      let matches = this.shops.filter( ( shop ) => {
        return ( shop.id == this.shopId );
      } );

      if ( matches.length ) {

        this.$mdDialog.hide( {
          shop: matches[ 0 ],
          quantity: this.quantity,
          price: this.price
        } );

      } else {

        this.$mdDialog.hide( null );

      }

      return this.clear();

    }

    /***************************************************/

    public cancel = () => {

      this.$mdDialog.cancel();

    }

    /***************************************************/

  }

}

    /*******************************************************************/