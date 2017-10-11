module GrocRoundAdminTrackProductsComponent {

  import interfaces = GrocRoundAdminTrackProductsComponentInterfaces;
  import toastService = ToastServiceInterfaces;
  import trackProductsService = GrocRoundAdminTrackProductsServiceInterfaces;
  import trackProduct = TrackProduct;

  export class Component implements interfaces.Instance {

    /***************************************************/

    public trackProducts: trackProduct.Super[];
    public errorMessage: string;
    public loading: boolean;

    public trackId: string;

    /***************************************************/

    constructor(
      private readonly $routeParams: ng.route.IRouteParamsService,
      private readonly $location: ng.ILocationService,
      private readonly TrackProductsService: trackProductsService.Instance
    ) {

      this.trackProducts = [];

      if ( this.$routeParams.trackId ) {
        this.trackId = this.$routeParams.trackId;
        this.getTrackProducts( this.$routeParams.trackId );
      } else {
        window.history.back();
      }

    }

    /***************************************************/

    private readonly getTrackProducts = ( trackId: string ) => {

      this.loading = true;

      this.TrackProductsService.getTrackProducts( trackId )
        .then( ( trackProducts: trackProduct.Super[] ) => {

          trackProducts.forEach( ( subject ) => {
            this.trackProducts.push( subject );
          } );

        } )
        .catch( ( reason: any ) => {

          this.errorMessage = ( reason && reason.message ) ? reason.message : "Operation Failed";

        } )
        .finally( () => {

          this.loading = false;

        } );

    }

    /***************************************************/

    public route = ( destination: string ) => {

      if ( destination ) {
        this.$location.path( destination );
      }

    }

    /***************************************************/

  }

}

  /*******************************************************************/
