module GrocRoundAdminTrackComponentInterfaces {

  /*******************************************/

  import track = Track;
  import tracksService = GrocRoundAdminTracksServiceInterfaces;

  /*******************************************/

  export interface Instance {
    track: track.Super;

    loading: boolean;
    
    errorMessage: string;
  }

  /*******************************************/

}
