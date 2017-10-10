module GrocRoundAdminSelectService {

  import product = Product;
  import user = User;
  import round = Round;
  import track = Track;

  import interfaces = GrocRoundAdminSelectServiceInterfaces;

  export class Service implements interfaces.Instance {

    /***************************************************/

    constructor() { }

    /***************************************************/

    public getRound = ( id: string, array: round.RoundInfo[] ): round.RoundInfo => {

      if ( !id ) {
        return null;
      }

      let matches = array.filter( ( round ) => {
        return ( round.roundId === id );
      } );

      return ( matches.length ) ? matches[ 0 ] : null;

    }

    public getTrack = ( id: string, array: track.TrackInfo[] ): track.TrackInfo => {

      if ( !id ) {
        return null;
      }

      let matches = array.filter( ( track ) => {
        return ( track.trackId === id );
      } );

      return ( matches.length ) ? matches[ 0 ] : null;

    }

    /***************************************************/

  }

}

/*******************************************************************/