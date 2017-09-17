
module ContextsService {

  import interfaces = ContextsServiceInterfaces;

  export class Service implements interfaces.Instance {

    /***************************************************/

    readonly appContext: string;
    readonly innerContext: string;

    /***************************************************/

    constructor() {

      let payload = null;

      try {
        if ( ( window as any ).jsonString ) {
          payload = JSON.parse(( window as any ).jsonString );
        }
      } catch ( ex ) {
        console.log( "Something went wrong, " + ex );
      }

      if ( payload ) {
        if ( payload.appContext ) {
          this.appContext = payload.appContext;
        }
        if ( payload.innerContext ) {
          this.innerContext = payload.innerContext;
        }
      }

    }

    /***************************************************/

  }

}

  /*******************************************************************/