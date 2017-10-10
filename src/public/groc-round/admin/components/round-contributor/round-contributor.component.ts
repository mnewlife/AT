
module GrocRoundAdminRoundContributorComponent {

  import roundContributor = RoundContributor;

  import interfaces = GrocRoundAdminRoundContributorComponentInterfaces;
  import toastService = ToastServiceInterfaces;
  import dialogService = DialogServiceInterfaces;
  import roundContributorsService = GrocRoundAdminRoundContributorsServiceInterfaces;

  export class Component implements interfaces.Instance {

    /***************************************************/

    public roundContributor: roundContributor.Super;
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
      private readonly RoundContributorsService: roundContributorsService.Instance
    ) {

      this.initMembers();
      this.deriveRoundContributorId();

    }

    /***************************************************/

    private initMembers = () => {

      this.roundContributor = {} as any;

    }

    /***************************************************/

    private deriveRoundContributorId = () => {

      if ( this.$routeParams.roundContributorId ) {
        this.getRoundContributorRecord( this.$routeParams.roundContributorId );
      } else {
        window.history.back();
      }

    }

    /***************************************************/

    private getRoundContributorRecord = ( id: string ) => {

      let loading = true;

      this.RoundContributorsService.getRoundContributor( id )
        .then( ( foundRoundContributor: roundContributor.Super ) => {

          angular.copy( foundRoundContributor, this.roundContributor );
          this.errorMessage = null;

        } )
        .catch( ( reason: any ) => {

          this.errorMessage = ( reason && reason.message ) ? reason.message : "Couldn't get roundContributor record";

        } )
        .finally( () => {

          this.loading = false;

        } );

    }

    /***************************************************/

  }

}

/*******************************************************************/
