
module GrocRoundAdminRoundComponent {

  import round = Round;

  import interfaces = GrocRoundAdminRoundComponentInterfaces;
  import toastService = ToastServiceInterfaces;
  import dialogService = DialogServiceInterfaces;
  import roundsService = GrocRoundAdminRoundsServiceInterfaces;

  export class Component implements interfaces.Instance {

    /***************************************************/

    public round: round.Super;
    public loading: boolean;
    public errorMessage: string;

    /***************************************************/

    constructor(
      private readonly $q: ng.IQService,
      private readonly $location: ng.ILocationService,
      private readonly $routeParams: ng.route.IRouteParamsService,
      private readonly $mdDialog: ng.material.IDialogService,
      private readonly ToastService: toastService.Instance,
      private readonly DialogService: dialogService.Instance,
      private readonly RoundsService: roundsService.Instance
    ) {

      this.initMembers();
      this.deriveRoundId();

    }

    /***************************************************/

    private initMembers = () => {

      this.round = {} as any;
      this.loading = false;

    }

    /***************************************************/

    private deriveRoundId = () => {

      if ( this.$routeParams.roundId ) {
        this.getRoundRecord( this.$routeParams.roundId );
      } else {
        window.history.back();
      }

    }

    /***************************************************/

    private getRoundRecord = ( id: string ) => {

      this.loading = true;

      this.RoundsService.getRound( id )
        .then( ( foundRound: round.Super ) => {

          angular.copy( foundRound, this.round );
          this.errorMessage = null;

        } )
        .catch( ( reason: any ) => {

          this.errorMessage = ( reason && reason.message ) ? reason.message : "Couldn't get round record";

        } )
        .finally( () => {

          this.loading = false;

        } );

    }

    /***************************************************/

  }

}

/*******************************************************************/
