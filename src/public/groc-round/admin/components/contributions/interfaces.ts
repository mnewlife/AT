module GrocRoundAdminContributionsComponentInterfaces {
  
    /*******************************************/
  
    import contribution = Contribution;
    import profileService = GrocRoundAdminContributionsServiceInterfaces;
  
    /*******************************************/
  
    export interface Instance {
      contributions: contribution.Super[];
      errorMessage: string;
    }
  
    /*******************************************/
  
  }
  