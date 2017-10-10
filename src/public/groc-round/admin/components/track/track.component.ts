
module GrocRoundAdminTrackComponent {

  import track = Track;

  import interfaces = GrocRoundAdminTrackComponentInterfaces;
  import toastService = ToastServiceInterfaces;
  import dialogService = DialogServiceInterfaces;
  import tracksService = GrocRoundAdminTracksServiceInterfaces;

  export class Component implements interfaces.Instance {

    /***************************************************/

    public track: track.Super;
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
      private readonly TracksService: tracksService.Instance
    ) {

      this.initMembers();
      this.deriveTrackId();

    }

    /***************************************************/

    private initMembers = () => {

      this.track = {} as any;

    }

    /***************************************************/

    private deriveTrackId = () => {

      if ( this.$routeParams.trackId ) {
        this.getTrackRecord( this.$routeParams.trackId );
      } else {
        window.history.back();
      }

    }

    /***************************************************/

    private getTrackRecord = ( id: string ) => {

      let loading = true;

      this.TracksService.getTrack( id )
        .then( ( foundTrack: track.Super ) => {

          angular.copy( foundTrack, this.track );
          this.errorMessage = null;

        } )
        .catch( ( reason: any ) => {

          this.errorMessage = ( reason && reason.message ) ? reason.message : "Couldn't get track record";

        } )
        .finally( () => {

          this.loading = false;

        } );
        
    }

    /***************************************************/

  }

}

/*******************************************************************/
