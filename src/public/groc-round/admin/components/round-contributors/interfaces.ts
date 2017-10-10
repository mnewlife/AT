module GrocRoundAdminRoundContributorsComponentInterfaces {
  
    /*******************************************/
  
    import roundContributor = RoundContributor;
    import profileService = GrocRoundAdminRoundContributorsServiceInterfaces;
  
    /*******************************************/
  
    export interface Instance {
      roundContributors: roundContributor.Super[];
      errorMessage: string;
    }
  
    /*******************************************/
  
  }
  