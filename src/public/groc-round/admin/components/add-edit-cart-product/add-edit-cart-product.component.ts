module GrocRoundAdminAddEditCartProductComponent {

  import interfaces = GrocRoundAdminAddEditCartProductComponentInterfaces;
  import toastService = ToastServiceInterfaces;
  import dialogService = DialogServiceInterfaces;

  import cartProductsService = GrocRoundAdminCartProductsServiceInterfaces;
  import autoCompleteService = GrocRoundAdminAutoCompleteServiceInterfaces;
  import cartsService = GrocRoundAdminCartsServiceInterfaces;
  import productsService = GrocRoundAdminProductsServiceInterfaces;

  import cartProduct = CartProduct;
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

    public addDetails: cartProductsService.AddDetails;
    public updateDetails: cartProductsService.UpdateDetails;

    public metaUser: user.UserInfo;
    public metaRound: round.RoundInfo;

    public products: product.ProductInfo[];

    public productText: string;

    /***************************************************/

    constructor(
      private readonly $q: ng.IQService,
      private readonly $routeParams: ng.route.IRouteParamsService,
      private readonly $location: ng.ILocationService,
      private readonly ToastService: toastService.Instance,
      private readonly CartProductsService: cartProductsService.Instance,
      private readonly AutoCompleteService: autoCompleteService.Instance,
      private readonly CartsService: cartsService.Instance,
      private readonly ProductsService: productsService.Instance
    ) {

      this.clearMembers();
      this.determineModeAndGetData();
      this.attachToPromises();

    }

    /***************************************************/

    private clearMembers = () => {

      this.loading = false;
      this.adding = false;
      this.updating = false;

      this.productText = "";

      this.addDetails = {
        user: null,
        round: null,
        cartId: null,
        product: {
          productId: "",
          label: "",
          quantity: 0,
          value: 0
        }
      };

      this.updateDetails = {
        product: null
      };

    }

    /***************************************************/

    private determineModeAndGetData = () => {

      if ( this.$routeParams.cartProductId ) {

        this.editMode = true;

        this.loading = true;

        this.getCartProductInfo( this.$routeParams.cartProductId )
          .finally( () => {

            this.loading = false;

          } );

      } else {

        let qs = this.$location.search();
        if ( !qs.cartId ) {
          window.history.back();
          return;
        }

        this.editMode = false;

        this.loading = true;

        this.getCartInfo( qs.cartId )
          .finally( () => {

            this.loading = false;

          } );

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

    private getCartInfo = ( id: string ) => {

      return this.CartsService.getCart( id )
        .then( ( foundCart: cart.Super ) => {

          this.addDetails.user = foundCart.user;
          this.addDetails.round = foundCart.round;
          this.addDetails.cartId = id;

        } )
        .catch( ( reason: any ) => {

          this.errorMessage = ( reason && reason.message ) ? reason.message : "Couldn't get cartProduct record";

        } );


    }

    private getCartProductInfo = ( id: string ) => {

      return this.CartProductsService.getCartProduct( id )
        .then( ( foundCartProduct: cartProduct.Super ) => {

          this.metaUser = foundCartProduct.user;
          this.metaRound = foundCartProduct.round;

          this.updateDetails = {
            product: foundCartProduct.product
          };

        } )
        .catch( ( reason: any ) => {

          this.errorMessage = ( reason && reason.message ) ? reason.message : "Couldn't get cartProduct record";

        } );

    }

    /***************************************************/

    public queryProducts = ( query: string ) => {
      this.AutoCompleteService.queryProducts( query, this.products );
    }

    /***************************************************/

    public addCartProduct = (): any => {

      let product: product.ProductInfo = this.AutoCompleteService.getProduct( this.productText, this.products );

      if ( product ) {
        this.addDetails.product.productId = product.productId;
        this.addDetails.product.label = product.label;
      } else {
        return this.ToastService.showSimple( "Product info is missing" );
      }

      if ( !this.addDetails.product.quantity ) {
        return this.ToastService.showSimple( "Product quantity is missing" );
      }

      if ( !this.addDetails.product.value ) {
        return this.ToastService.showSimple( "Product value is missing" );
      }

      this.adding = true;

      return this.CartProductsService.addCartProduct( this.addDetails )
        .then( ( response: any ) => {

          this.$location.path( "/cartProducts/" + this.addDetails.cartId );

        } )
        .finally( () => {

          this.adding = false;

        } );

    }

    /***************************************************/

    public updateCartProduct = (): any => {

      let product: product.ProductInfo = this.AutoCompleteService.getProduct( this.productText, this.products );

      if ( product ) {
        this.updateDetails.product.productId = product.productId;
        this.updateDetails.product.label = product.label;
      } else {
        return this.ToastService.showSimple( "Product info is missing" );
      }

      if ( !this.updateDetails.product.quantity ) {
        return this.ToastService.showSimple( "Product quantity is missing" );
      }

      if ( !this.updateDetails.product.value ) {
        return this.ToastService.showSimple( "Product value is missing" );
      }

      this.updating = true;

      return this.CartProductsService.updateCartProduct( this.$routeParams.cartProductId, this.updateDetails )
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
