module GrocRoundAdminTracksComponent {

  import interfaces = GrocRoundAdminTracksComponentInterfaces;
  import toastService = ToastServiceInterfaces;
  import tracksService = GrocRoundAdminTracksServiceInterfaces;
  import track = Track;

  export class Component implements interfaces.Instance {

    /***************************************************/

    public tracks: track.Super[];
    public errorMessage: string;

    /***************************************************/

    constructor(
      private readonly $routeParams: ng.route.IRouteParamsService,
      private readonly $location: ng.ILocationService,
      private readonly TracksService: tracksService.Instance
    ) {

      this.tracks = [];

      if ( this.$routeParams.roundId ) {
        this.getTracks( this.$routeParams.roundId );
      } else {
        window.history.back();
      }

    }

    /***************************************************/

    private readonly getTracks = ( roundId: string ) => {

      this.TracksService.getTracks( roundId )
        .then( ( tracks: track.Super[] ) => {

          tracks.forEach( ( subject ) => {
            this.tracks.push( subject );
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
