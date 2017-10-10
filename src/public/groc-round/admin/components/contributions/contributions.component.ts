module GrocRoundAdminContributionsComponent {

  import interfaces = GrocRoundAdminContributionsComponentInterfaces;
  import toastService = ToastServiceInterfaces;
  import contributionsService = GrocRoundAdminContributionsServiceInterfaces;
  import contribution = Contribution;

  export class Component implements interfaces.Instance {

    /***************************************************/

    public contributions: contribution.Super[];
    public errorMessage: string;

    /***************************************************/

    constructor(
      private readonly $location: ng.ILocationService,
      private readonly ContributionsService: contributionsService.Instance
    ) {

      this.contributions = [];

      let qs = this.$location.search();

      if ( !qs || !qs.roundId || !qs.userId ) {
        window.history.back();
        return;
      }

      this.getContributions( qs.roundId, qs.userId );

    }

    /***************************************************/

    private readonly getContributions = ( roundId: string, userId: string ) => {

      this.ContributionsService.getContributions( roundId, userId )
        .then( ( contributions: contribution.Super[] ) => {

          contributions.forEach( ( subject ) => {
            this.contributions.push( subject );
          } );

        } )
        .catch( ( reason: any ) => {

          this.errorMessage = ( reason && reason.message ) ? reason.message : "Operation Failed";

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
