module GrocRoundAdminAddEditRoundComponent {

  import interfaces = GrocRoundAdminAddEditRoundComponentInterfaces;
  import toastService = ToastServiceInterfaces;
  import dialogService = DialogServiceInterfaces;

  import roundsService = GrocRoundAdminRoundsServiceInterfaces;
  import autoCompleteService = GrocRoundAdminAutoCompleteServiceInterfaces;
  import cartsService = GrocRoundAdminCartsServiceInterfaces;
  import productsService = GrocRoundAdminProductsServiceInterfaces;

  import round = Round;
  import cart = Cart;
  import user = User;
  import product = Product;

  export class Component implements interfaces.Instance {

    /***************************************************/

    public editMode: boolean;
    public errorMessage: string;

    public loading: boolean;
    public adding: boolean;
    public updating: boolean;
    public deleting: boolean;

    public addDetails: roundsService.AddDetails;
    public updateDetails: roundsService.UpdateDetails;

    public minDate: Date;

    /***************************************************/

    constructor(
      private readonly $q: ng.IQService,
      private readonly $routeParams: ng.route.IRouteParamsService,
      private readonly $location: ng.ILocationService,
      private readonly ToastService: toastService.Instance,
      private readonly RoundsService: roundsService.Instance
    ) {

      this.clearMembers();
      this.determineModeAndGetData();

    }

    /***************************************************/

    private clearMembers = () => {

      let now = new Date();

      this.minDate = new Date( 2016, now.getMonth(), now.getDate() );

      this.addDetails = {
        roundName: "",
        inProgress: false,
        duration: {
          start: new Date(),
          end: new Date(),
          months: 0
        },
        deliveries: {
          fee: 0
        }
      };

      this.updateDetails = {
        roundName: "",
        inProgress: false,
        duration: {
          start: new Date(),
          end: new Date(),
          months: 0
        },
        deliveries: {
          fee: 0
        }
      };

    }

    /***************************************************/

    private determineModeAndGetData = () => {

      if ( this.$routeParams.roundId ) {

        this.editMode = true;

        this.getRoundInfo( this.$routeParams.roundId );

      } else {

        this.editMode = false;

      }

    }

    /***************************************************/

    private getRoundInfo = ( id: string ) => {

      this.loading = true;

      this.RoundsService.getRound( id )
        .then( ( foundRound: round.Super ) => {

          this.updateDetails.roundName = foundRound.roundName;
          this.updateDetails.inProgress = foundRound.inProgress;
          this.updateDetails.duration.start = foundRound.duration.start;
          this.updateDetails.duration.end = foundRound.duration.end;
          this.updateDetails.duration.months = foundRound.duration.months;
          this.updateDetails.deliveries.fee = foundRound.deliveries.fee;

        } )
        .catch( ( reason: any ) => {

          this.errorMessage = ( reason && reason.message ) ? reason.message : "Couldn't get round record";

        } )
        .finally( () => {

          this.loading = false;

        } );

    }

    /***************************************************/

    private getMonths = ( startDate: Date, endDate: Date ) => {

      let one_day = 1000 * 60 * 60 * 24;
      let one_month = one_day * 30;

      let difference_in_ms = endDate.getTime() - startDate.getTime();

      return Math.round( difference_in_ms / one_month );

    }

    /***************************************************/

    public calculateMonths = () => {

      this.addDetails.duration.months = this.getMonths( this.addDetails.duration.start, this.addDetails.duration.end );

      this.updateDetails.duration.months = this.getMonths( this.updateDetails.duration.start, this.updateDetails.duration.end );

      console.log( this.addDetails.duration.months );
      console.log( this.updateDetails.duration.months );

    }

    /***************************************************/

    public addRound = (): any => {

      if ( !this.addDetails.roundName ) {
        return this.ToastService.showSimple( "Round name is missing" );
      }

      if ( !this.addDetails.inProgress ) {
        this.addDetails.inProgress = false;
      }

      if ( !this.addDetails.duration ) {
        return this.ToastService.showSimple( "Duration is missing" );
      }

      if ( !this.addDetails.duration.start ) {
        return this.ToastService.showSimple( "Duration start date is missing" );
      }

      if ( !this.addDetails.duration.end ) {
        return this.ToastService.showSimple( "Duration end date is missing" );
      }

      if ( this.addDetails.duration.start > this.addDetails.duration.end ) {
        return this.ToastService.showSimple( "Duration end date cannot be before the start" );
      }

      if ( !this.addDetails.duration.months ) {
        return this.ToastService.showSimple( "Duration span is missing" );
      }

      if ( !this.addDetails.deliveries ) {
        return this.ToastService.showSimple( "Duration is missing" );
      }

      if ( !this.addDetails.deliveries.fee ) {
        return this.ToastService.showSimple( "Delivery fee is missing" );
      }

      this.adding = true;

      return this.RoundsService.addRound( this.addDetails )
        .then( ( response: any ) => {

          this.$location.path( "/rounds/" );

        } )
        .finally( () => {

          this.adding = false;

        } );

    }

    /***************************************************/

    public updateRound = (): any => {

      if ( !this.updateDetails.roundName ) {
        return this.ToastService.showSimple( "Round name is missing" );
      }

      if ( !this.updateDetails.inProgress ) {
        this.updateDetails.inProgress = false;
      }

      if ( !this.updateDetails.duration ) {
        return this.ToastService.showSimple( "Duration is missing" );
      }

      if ( !this.updateDetails.duration.start ) {
        return this.ToastService.showSimple( "Duration start date is missing" );
      }

      if ( !this.updateDetails.duration.end ) {
        return this.ToastService.showSimple( "Duration end date is missing" );
      }

      if ( this.updateDetails.duration.start > this.updateDetails.duration.end ) {
        return this.ToastService.showSimple( "Duration end date cannot be before the start" );
      }

      if ( !this.updateDetails.duration.months ) {
        return this.ToastService.showSimple( "Duration span is missing" );
      }

      if ( !this.updateDetails.deliveries ) {
        return this.ToastService.showSimple( "Duration is missing" );
      }

      if ( !this.updateDetails.deliveries.fee ) {
        return this.ToastService.showSimple( "Delivery fee is missing" );
      }

      this.updating = true;

      return this.RoundsService.updateRound( this.$routeParams.roundId, this.updateDetails )
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
