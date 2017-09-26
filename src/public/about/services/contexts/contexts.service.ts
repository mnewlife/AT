
module AboutContextsService {

  import interfaces = AboutContextsServiceInterfaces;
  import user = User;

  export class Service implements interfaces.Instance {

    /***************************************************/

    public currentUser: user.Super;
    public decoded: any;

    /***************************************************/

    constructor( private readonly $http: ng.IHttpService ) {

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

        if ( decoded.payload.currentUser ) {
          this.currentUser = decoded.payload.currentUser;
        }

      }

    }

    /***************************************************/

    public signOut = () => {

      let promise = this.$http.get( "/core/auth/signOut" )
        .then(( response: ng.IHttpResponse<{}> ) => {

          window.location.href = "/passpoint";

        } )
        .catch(( reason: any ) => {

          window.alert( "Something went wrong signing you out" );

        } );

    }

    /***************************************************/

  }

}

  /*******************************************************************/