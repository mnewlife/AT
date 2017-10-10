
module GrocRoundAdminSuperInfoService {

  import product = Product;
  import user = User;
  import round = Round;

  import interfaces = GrocRoundAdminSuperInfoServiceInterfaces;

  export class Service implements interfaces.Instance {

    /***************************************************/

    constructor() { }

    /***************************************************/

    public users = ( users: user.Super[] ) => {

      let results: user.UserInfo[] = [];

      users.forEach( ( user ) => {

        let temp: user.UserInfo = {
          userId: user.id,
          emailAddress: user.emailAddress
        };

        if ( user.personalDetails && ( user.personalDetails.firstName || user.personalDetails.lastName ) ) {

          let holder = [];

          if ( user.personalDetails.firstName ) {
            holder.push( user.personalDetails.firstName );
          }

          if ( user.personalDetails.lastName ) {
            holder.push( user.personalDetails.lastName );
          }

          temp.fullName = holder.join( " " );

        }

        results.push( temp );

      } );

      return results;

    }

    /***************************************************/

    public rounds = ( rounds: round.Super[] ) => {

      let results: round.RoundInfo[] = [];

      rounds.forEach( ( round ) => {

        results.push( {
          roundId: round.id,
          roundName: round.roundName
        } );

      } );

      return results;

    }

    /***************************************************/

    public products = ( products: product.Super[] ) => {

      let results: product.ProductInfo[] = [];

      products.forEach( ( product ) => {

        results.push( {
          productId: product.id,
          label: product.label
        } );

      } );

      return results;

    }

    /***************************************************/

  }

}

/*******************************************************************/