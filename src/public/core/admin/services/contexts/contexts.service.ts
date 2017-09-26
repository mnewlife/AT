
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

      let decoded = null;

      try {
        if ( ( window as any ).jsonString ) {
          decoded = JSON.parse(( window as any ).jsonString );
        }
      } catch ( ex ) {
        console.log( "Something went wrong, " + ex );
      }


      if ( decoded ) {

        if ( decoded.payload ) {

          this.payload = decoded.payload;

          if ( decoded.payload.currentUser ) {

            this.currentUser = decoded.payload.currentUser;

            if ( this.currentUser.personalDetails ) {
              if ( this.currentUser.personalDetails.dateOfBirth ) {
                this.currentUser.personalDetails.dateOfBirth = new Date( this.currentUser.personalDetails.dateOfBirth );
              }
            }

          }
          if ( decoded.payload.innerContext ) {
            this.handleInnerContexts( decoded.payload.innerContext );
          }

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