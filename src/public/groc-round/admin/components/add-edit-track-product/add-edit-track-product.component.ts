module GrocRoundAdminAddEditTrackProductComponent {

  import interfaces = GrocRoundAdminAddEditTrackProductComponentInterfaces;
  import toastService = ToastServiceInterfaces;
  import dialogService = DialogServiceInterfaces;

  import trackProductsService = GrocRoundAdminTrackProductsServiceInterfaces;
  import autoCompleteService = GrocRoundAdminAutoCompleteServiceInterfaces;
  import selectService = GrocRoundAdminSelectServiceInterfaces;
  import cartsService = GrocRoundAdminCartsServiceInterfaces;
  import productsService = GrocRoundAdminProductsServiceInterfaces;
  import usersService = GrocRoundAdminUsersServiceInterfaces;
  import tracksService = GrocRoundAdminTracksServiceInterfaces;
  import superInfoService = GrocRoundAdminSuperInfoServiceInterfaces;

  import trackProduct = TrackProduct;
  import cart = Cart;
  import user = User;
  import track = Track;
  import product = Product;

  export class Component implements interfaces.Instance {

    /***************************************************/

    public editMode: boolean;
    public errorMessage: string;

    public loading: boolean;
    public adding: boolean;
    public updating: boolean;
    public deleting: boolean;

    public addDetails: trackProductsService.AddDetails;
    public updateDetails: trackProductsService.UpdateDetails;

    public metaTrack: track.TrackInfo;
    public metaProduct: product.ProductInfo;

    public products: product.ProductInfo[];

    public productText: string;
    public selectedItem: any;

    /***************************************************/

    constructor(
      private readonly $q: ng.IQService,
      private readonly $routeParams: ng.route.IRouteParamsService,
      private readonly $location: ng.ILocationService,
      private readonly ToastService: toastService.Instance,
      private readonly TrackProductsService: trackProductsService.Instance,
      private readonly AutoCompleteService: autoCompleteService.Instance,
      private readonly SelectService: selectService.Instance,
      private readonly ProductsService: productsService.Instance,
      private readonly TracksService: tracksService.Instance
    ) {

      this.clearMembers();
      this.determineModeAndGetData();
      this.attachToPromises();

    }

    /***************************************************/

    private clearMembers = () => {

      this.products = [];

      this.productText = null;
      this.selectedItem = null;

      this.addDetails = {
        track: null,
        product: null,
        quantity: 0,
        value: 0
      };

      this.updateDetails = {
        quantity: 0,
        value: 0
      };

    }

    /***************************************************/

    private determineModeAndGetData = () => {

      if ( this.$routeParams.trackProductId ) {

        this.editMode = true;

        this.loading = true;

        this.getTrackProductInfo( this.$routeParams.trackProductId )
          .finally( () => {

            this.loading = false;

          } );

      } else {

        let qs = this.$location.search();

        if ( !qs || !qs.trackId ) {
          window.history.back();
          return;
        }

        this.editMode = false;

        this.getTrack();

      }

    }

    /***************************************************/

    private attachToPromises = () => {

      this.ProductsService.promises.getProducts
        .then( ( done: boolean ) => {

          if ( done ) {

            this.errorMessage = null;

            this.ProductsService.products.forEach( ( product ) => {

              this.products.push( {
                productId: product.id,
                label: product.label
              } );

            } );

          }

        } )
        .catch( ( reason: any ) => {

          this.errorMessage = ( reason && reason.message ) ? reason.message : "Couldn't get shops";

        } );

    }

    /***************************************************/


    private getTrack = () => {

      this.loading = true;

      this.TracksService.getTrack( this.$location.search().trackId )
        .then( ( foundTrack: track.Super ) => {

          this.addDetails.track = {
            trackId: foundTrack.id,
            trackName: foundTrack.trackName
          };

        } )
        .catch( ( reason: any ) => {

          this.errorMessage = ( reason && reason.message ) ? reason.message : "Couldn't get trackProduct record";

        } )
        .finally( () => {

          this.loading = false;

        } );


    }

    /***************************************************/

    private getTrackProductInfo = ( id: string ) => {

      this.loading = true;

      return this.TrackProductsService.getTrackProduct( id )
        .then( ( foundTrackProduct: trackProduct.Super ) => {

          this.metaTrack = foundTrackProduct.track;
          this.metaProduct = foundTrackProduct.product;

          this.updateDetails.quantity = foundTrackProduct.quantity;
          this.updateDetails.value = foundTrackProduct.value;

        } )
        .catch( ( reason: any ) => {

          this.errorMessage = ( reason && reason.message ) ? reason.message : "Couldn't get trackProduct record";

        } )
        .finally( () => {

          this.loading = false;

        } );

    }

    /***************************************************/

    public queryProducts = ( query: string ) => {
      return this.AutoCompleteService.queryProducts( query, this.products );
    }

    /***************************************************/

    public addTrackProduct = (): any => {

      let product = this.AutoCompleteService.getProduct( this.productText, this.products );
      if ( product ) {
        this.addDetails.product = {
          productId: product.productId,
          label: product.label
        };
      } else {
        return this.ToastService.showSimple( "Product info is missing" );
      }

      if ( !this.addDetails.track ) {
        return this.ToastService.showSimple( "Track info is missing" );
      }

      if ( !this.addDetails.quantity ) {
        return this.ToastService.showSimple( "Quantity is missing" );
      }

      if ( !this.addDetails.value ) {
        return this.ToastService.showSimple( "Value is missing" );
      }

      this.adding = true;

      return this.TrackProductsService.addTrackProduct( this.addDetails )
        .then( ( response: any ) => {

          this.$location.path( "/trackProducts?track=" + this.addDetails.track.trackId );

        } )
        .finally( () => {

          this.adding = false;

        } );

    }

    /***************************************************/

    public updateTrackProduct = (): any => {

      if ( !this.updateDetails.quantity ) {
        return this.ToastService.showSimple( "Quantity is missing" );
      }

      if ( !this.updateDetails.value ) {
        return this.ToastService.showSimple( "Value is missing" );
      }

      this.updating = true;

      return this.TrackProductsService.updateTrackProduct( this.$routeParams.trackProductId, this.updateDetails )
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
