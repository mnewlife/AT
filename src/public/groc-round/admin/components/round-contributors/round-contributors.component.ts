module GrocRoundAdminRoundContributorsComponent {

  import interfaces = GrocRoundAdminRoundContributorsComponentInterfaces;
  import toastService = ToastServiceInterfaces;
  import roundContributorsService = GrocRoundAdminRoundContributorsServiceInterfaces;
  import roundContributor = RoundContributor;

  export class Component implements interfaces.Instance {

    /***************************************************/

    public roundContributors: roundContributor.Super[];
    public errorMessage: string;
    public loading: boolean;

    /***************************************************/

    constructor(
      private readonly $routeParams: ng.route.IRouteParamsService,
      private readonly $location: ng.ILocationService,
      private readonly RoundContributorsService: roundContributorsService.Instance
    ) {

      this.roundContributors = [];

      let qs = this.$location.search();

      if ( !qs || !qs.roundId || !qs.userId ) {
        window.history.back();
        return;
      }

      this.getRoundContributors( qs.roundId, qs.userId );

    }

    /***************************************************/

    private readonly getRoundContributors = ( roundId: string, userId: string ) => {

      this.loading = true;

      this.RoundContributorsService.getRoundContributors( roundId, userId )
        .then( ( roundContributors: roundContributor.Super[] ) => {

          roundContributors.forEach( ( subject ) => {
            this.roundContributors.push( subject );
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
