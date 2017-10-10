module GrocRoundAdminAddEditTrackComponentInterfaces {
  
    /*******************************************/
  
    import tracksService = GrocRoundAdminTracksServiceInterfaces;
    import track = Track;
  
    /*******************************************/
  
    export interface Instance {
      editMode: boolean;
      errorMessage: string;
  
      loading: boolean;
      adding: boolean;
      updating: boolean;
  
      addDetails: tracksService.AddDetails;
      updateDetails: tracksService.UpdateDetails;
  
      addTrack: AddTrack;
      updateTrack: UpdateTrack;
    }
  
    /*******************************************/
  
    export interface AddTrack {
      ( details: tracksService.UpdateDetails ): any;
    }
  
    export interface UpdateTrack {
      ( trackId: string, details: tracksService.UpdateDetails ): any;
    }
  
    /*******************************************/
  
  }
  