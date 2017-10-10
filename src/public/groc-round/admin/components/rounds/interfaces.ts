module GrocRoundAdminRoundsComponentInterfaces {
  
    /*******************************************/
  
    import round = Round;
    import profileService = GrocRoundAdminRoundsServiceInterfaces;
  
    /*******************************************/
  
    export interface Instance {
      rounds: round.Super[];
      errorMessage: string;
    }
  
    /*******************************************/
  
  }
  