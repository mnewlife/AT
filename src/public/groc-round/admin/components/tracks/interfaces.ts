module GrocRoundAdminTracksComponentInterfaces {
  
    /*******************************************/
  
    import track = Track;
    import profileService = GrocRoundAdminTracksServiceInterfaces;
  
    /*******************************************/
  
    export interface Instance {
      tracks: track.Super[];
      errorMessage: string;
    }
  
    /*******************************************/
  
  }
  