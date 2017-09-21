
module CoreAdminContextsService {

  import interfaces = CoreAdminContextsServiceInterfaces;
  import user = User;

  export class Service implements interfaces.Instance {

    /***************************************************/

    public innerContext: string;
    public currentUser: user.Super;
    public checked: boolean;
    public payload: any;

    /***************************************************/

    constructor( private readonly $location: ng.ILocationService ) {

      let payload = null;

      try {
        if ( ( window as any ).jsonString ) {
          payload = JSON.parse(( window as any ).jsonString );
        }
      } catch ( ex ) {
        console.log( "Something went wrong, " + ex );
      }

      if ( payload ) {
        this.payload = payload;
        if ( payload.currentUser ) {
          this.currentUser = payload.currentUser;
        }
        if ( payload.innerContext ) {
          this.handleInnerContexts( payload.innerContext );
        }
      }

    }

    /***************************************************/

    private handleInnerContexts = ( innerContext: string ) => {

      this.innerContext = innerContext;

    }

    /***************************************************/

  }

}

  /*******************************************************************/