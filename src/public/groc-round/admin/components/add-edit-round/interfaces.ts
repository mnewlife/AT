module GrocRoundAdminAddEditRoundComponentInterfaces {
  
    /*******************************************/
  
    import roundsService = GrocRoundAdminRoundsServiceInterfaces;
    import round = Round;
  
    /*******************************************/
  
    export interface Instance {
      editMode: boolean;
      errorMessage: string;

      loading: boolean;
      adding: boolean;
      updating: boolean;
  
      addDetails: roundsService.AddDetails;
      updateDetails: roundsService.UpdateDetails;
  
      addRound: AddRound;
      updateRound: UpdateRound;
    }
  
    /*******************************************/

    export interface AddRound {
      ( details: roundsService.UpdateDetails ): any;
    }
  
    export interface UpdateRound {
      ( roundId: string, details: roundsService.UpdateDetails ): any;
    }
  
    /*******************************************/
  
  }
  