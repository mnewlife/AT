module GrocRoundAdminAddEditTrackComponent {

  import interfaces = GrocRoundAdminAddEditTrackComponentInterfaces;
  import toastService = ToastServiceInterfaces;
  import dialogService = DialogServiceInterfaces;

  import tracksService = GrocRoundAdminTracksServiceInterfaces;
  import autoCompleteService = GrocRoundAdminAutoCompleteServiceInterfaces;
  import roundsService = GrocRoundAdminRoundsServiceInterfaces;
  import productsService = GrocRoundAdminProductsServiceInterfaces;
  import selectService = GrocRoundAdminSelectServiceInterfaces;

  import track = Track;
  import cart = Cart;
  import user = User;
  import round = Round;
  import product = Product;

  export class Component implements interfaces.Instance {

    /***************************************************/

    public editMode: boolean;
    public errorMessage: string;

    public loading: boolean;
    public adding: boolean;
    public updating: boolean;
    public deleting: boolean;

    public addDetails: tracksService.AddDetails;
    public updateDetails: tracksService.UpdateDetails;

    public metaRound: round.RoundInfo;

    public rounds: round.RoundInfo[];

    /***************************************************/

    constructor(
      private readonly $q: ng.IQService,
      private readonly $routeParams: ng.route.IRouteParamsService,
      private readonly $location: ng.ILocationService,
      private readonly ToastService: toastService.Instance,
      private readonly TracksService: tracksService.Instance,
      private readonly RoundsService: roundsService.Instance,
      private readonly SelectService: selectService.Instance
    ) {

      this.clearMembers();
      this.determineModeAndGetData();

    }

    /***************************************************/

    private clearMembers = () => {

      this.rounds = [];

      this.addDetails = {
        round: null,
        trackName: "",
        contributions: {
          installmentValue: 0,
          totalValue: 0
        },
        adminFeePercentage: 0
      };

      this.updateDetails = {
        trackName: "",
        contributions: {
          installmentValue: 0,
          totalValue: 0
        },
        adminFeePercentage: 0
      };

    }

    /***************************************************/

    private determineModeAndGetData = () => {

      if ( this.$routeParams.trackId ) {

        this.editMode = true;

        this.getTrackInfo( this.$routeParams.trackId );

      } else {

        this.editMode = false;

        this.getRounds();

      }

    }

    /***************************************************/

    private getRounds = () => {

      this.loading = true;

      this.RoundsService.getRounds()
        .then( ( foundRounds: round.Super[] ) => {

          this.rounds = [];

          foundRounds.forEach( ( round ) => {
            this.rounds.push( {
              roundId: round.id,
              roundName: round.roundName
            } );
          } );

        } )
        .catch( ( reason: any ) => {

          this.errorMessage = ( reason && reason.message ) ? reason.message : "Couldn't get track record";

        } )
        .finally( () => {

          this.loading = false;

        } );


    }

    private getTrackInfo = ( id: string ) => {

      this.loading = true;

      this.TracksService.getTrack( id )
        .then( ( foundTrack: track.Super ) => {

          this.metaRound = foundTrack.round;

          this.updateDetails.trackName = foundTrack.trackName;
          this.updateDetails.contributions.installmentValue = foundTrack.contributions.installmentValue;
          this.updateDetails.contributions.totalValue = foundTrack.contributions.totalValue;
          this.updateDetails.adminFeePercentage = foundTrack.adminFeePercentage;

        } )
        .catch( ( reason: any ) => {

          this.errorMessage = ( reason && reason.message ) ? reason.message : "Couldn't get track record";

        } )
        .finally( () => {

          this.loading = false;

        } );

    }

    /***************************************************/

    public addTrack = (): any => {

      let round = this.SelectService.getRound( this.addDetails.round.roundId, this.rounds );
      if ( round ) {
        this.addDetails.round.roundName = round.roundName;
      } else {
        return this.ToastService.showSimple( "Round info is missing" );
      }

      if ( !this.addDetails.trackName ) {
        return this.ToastService.showSimple( "Track name is missing" );
      }

      if ( !this.addDetails.contributions.installmentValue ) {
        return this.ToastService.showSimple( "Installment value is missing" );
      }

      if ( !this.addDetails.contributions.totalValue ) {
        return this.ToastService.showSimple( "Total price of track is missing" );
      }

      if ( !this.addDetails.adminFeePercentage ) {
        return this.ToastService.showSimple( "Track name is missing" );
      }

      this.adding = true;

      return this.TracksService.addTrack( this.addDetails )
        .then( ( response: any ) => {

          this.$location.path( "/tracks/" + this.addDetails.round.roundId );

        } )
        .finally( () => {

          this.adding = false;

        } );

    }

    /***************************************************/

    public updateTrack = (): any => {

      if ( !this.updateDetails.trackName ) {
        return this.ToastService.showSimple( "Track name is missing" );
      }

      if ( !this.updateDetails.contributions.installmentValue ) {
        return this.ToastService.showSimple( "Installment value is missing" );
      }

      if ( !this.updateDetails.contributions.totalValue ) {
        return this.ToastService.showSimple( "Total price of track is missing" );
      }

      if ( !this.updateDetails.adminFeePercentage ) {
        return this.ToastService.showSimple( "Track name is missing" );
      }

      this.updating = true;

      return this.TracksService.updateTrack( this.$routeParams.trackId, this.updateDetails )
        .then( ( response: any ) => {

          window.history.back();

        } )
        .finally( () => {

          this.updating = false;

        } );

    }

    /***************************************************/

  }

}

  /*******************************************************************/
