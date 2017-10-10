
module GrocRoundAdminAutoCompleteService {

  import product = Product;
  import user = User;
  import round = Round;

  import interfaces = GrocRoundAdminAutoCompleteServiceInterfaces;

  export class Service implements interfaces.Instance {

    /***************************************************/

    constructor() { }

    /***************************************************/

    public queryProducts = ( query: string, productArray: product.ProductInfo[] ) => {

      return this.query( query, productArray, ( product: product.ProductInfo ) => {

        return ( angular.lowercase( product.label ).indexOf( angular.lowercase( query ) ) != -1 );

      } );

    }

    public queryUsers = ( query: string, userArray: user.UserInfo[] ) => {

      return this.query( query, userArray, ( user: user.UserInfo ) => {

        return ( user.emailAddress.indexOf( angular.lowercase( query ) ) != -1 );

      } );

    }

    private query = ( query: string, array: any[], filterFn: ( subject: user.UserInfo | product.ProductInfo ) => boolean ): any[] => {
      return query ? array.filter( filterFn ) : array;
    };

    /***************************************************/

    public getProduct = ( text: string, array: product.ProductInfo[] ): product.ProductInfo => {

      if ( !text ) {
        return null;
      }

      let matches = array.filter( ( product ) => {
        console.log( angular.lowercase( product.label ) );
        console.log( angular.lowercase( text ) );
        return ( angular.lowercase( product.label ) === angular.lowercase( text ) );
      } );

      if ( !matches.length ) {
        return null;
      }

      return matches[ 0 ];

    }

    public getUser = ( text: string, array: user.UserInfo[] ): user.UserInfo => {

      if ( !text ) {
        return null;
      }

      let matches = array.filter( ( user ) => {
        return ( user.emailAddress === text );
      } );

      if ( !matches.length ) {
        return null;
      }

      return matches[ 0 ];

    }

    /***************************************************/

    public reflectUser = ( id: string, users: user.UserInfo[] ): string => {

      let matches = users.filter( ( user ) => {
        return ( user.userId === id );
      } );

      return ( matches.length ) ? matches[ 0 ].emailAddress : "";

    }

    public reflectRound = ( id: string, rounds: round.RoundInfo[] ): string => {

      let matches = rounds.filter( ( round ) => {
        return ( round.roundId === id );
      } );

      return ( matches.length ) ? matches[ 0 ].roundName : "";

    }

    public reflectProduct = ( id: string, products: product.ProductInfo[] ): string => {

      let matches = products.filter( ( product ) => {
        return ( product.productId === id );
      } );

      return ( matches.length ) ? matches[ 0 ].label : "";

    }

    /***************************************************/

  }

}

/*******************************************************************/