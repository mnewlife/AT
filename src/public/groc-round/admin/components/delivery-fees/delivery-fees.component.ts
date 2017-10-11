module GrocRoundAdminDeliveryFeesComponent {

  import interfaces = GrocRoundAdminDeliveryFeesComponentInterfaces;
  import toastService = ToastServiceInterfaces;
  import deliveryFeesService = GrocRoundAdminDeliveryFeesServiceInterfaces;
  import deliveryFee = DeliveryFee;

  export class Component implements interfaces.Instance {

    /***************************************************/

    public deliveryFees: deliveryFee.Super[];
    public errorMessage: string;
    public loading: boolean;

    /***************************************************/

    constructor(
      private readonly $location: ng.ILocationService,
      private readonly DeliveryFeesService: deliveryFeesService.Instance
    ) {

      this.deliveryFees = [];

      let qs = this.$location.search();

      if ( !qs || !qs.roundId || !qs.userId ) {
        window.history.back();
        return;
      }

      this.getDeliveryFees( qs.roundId, qs.userId );

    }

    /***************************************************/

    private readonly getDeliveryFees = ( roundId: string, userId: string ) => {

      this.loading = true;

      this.DeliveryFeesService.getDeliveryFees( roundId, userId )
        .then( ( deliveryFees: deliveryFee.Super[] ) => {

          deliveryFees.forEach( ( subject ) => {
            this.deliveryFees.push( subject );
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
