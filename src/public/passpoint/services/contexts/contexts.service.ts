
module PasspointContextsService {

  import interfaces = PasspointContextsServiceInterfaces;

  export class Service implements interfaces.Instance {

    /***************************************************/

    public appContext: string;
    public innerContext: string;
    public nextInnerContext: string;
    public decoded: any;
    public checked: boolean;

    /***************************************************/

    constructor( private readonly $location: ng.ILocationService ) {

      let decoded = null;

      try {
        if ( ( window as any ).jsonString ) {
          decoded = JSON.parse(( window as any ).jsonString );
        }
      } catch ( ex ) {
        console.log( "Something went wrong, " + ex );
      }

      if ( decoded && decoded.payload ) {

        this.decoded = decoded;

        if ( decoded.payload.appContext ) {
          this.appContext = decoded.payload.appContext;
        }
        if ( decoded.payload.innerContext ) {
          this.handleInnerContext( decoded.payload.innerContext );
        }
        if ( decoded.payload.nextInnerContext ) {
          this.nextInnerContext = decoded.payload.nextInnerContext;
        }

      }

    }

    /***************************************************/

    private readonly handleInnerContext = ( innerContext: string ) => {

      this.innerContext = innerContext;
      if ( this.innerContext === "change-email-address" ) {
        this.$location.path( "/sign-in" );
      }
      if ( this.innerContext === "request-reset-code" ) {
        this.$location.path( "/sign-in" );
      }
      if ( this.innerContext === "reset-password" ) {
        this.$location.path( "/sign-in" );
      }
      if ( this.innerContext === "delete-account" ) {
        this.$location.path( "/sign-in" );
      }
      if ( this.innerContext === "verify-account" ) {
        this.$location.path( "/sign-in" );
      }
      if ( this.innerContext === "sign-up" ) {
        this.$location.path( "/sign-up" );
      }

    }

    /***************************************************/

  }

}

  /*******************************************************************/