module GrocRoundAdminSelectServiceInterfaces {

  /*******************************************/

  import product = Product;
  import user = User;
  import round = Round;
  import track = Track;

  export interface Instance {
    getRound: GetRound;
    getTrack: GetTrack;
  }

  /*******************************************/
  
  export interface GetRound {
    ( id: string, array: round.RoundInfo[] ): round.RoundInfo;
  }

  export interface GetTrack {
    ( id: string, array: track.TrackInfo[] ): track.TrackInfo;
  }

  /*******************************************/

}
