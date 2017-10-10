module GrocRoundAdminAddEditContributionComponentInterfaces {
  
    /*******************************************/
  
    import contributionsService = GrocRoundAdminContributionsServiceInterfaces;
    import contribution = Contribution;
  
    /*******************************************/
  
    export interface Instance {
      editMode: boolean;
      errorMessage: string;
  
      loading: boolean;
      adding: boolean;
      updating: boolean;
  
      addDetails: contributionsService.AddDetails;
      updateDetails: contributionsService.UpdateDetails;
  
      addContribution: AddContribution;
      updateContribution: UpdateContribution;
    }
  
    /*******************************************/
  
    export interface AddContribution {
      ( details: contributionsService.UpdateDetails ): any;
    }
  
    export interface UpdateContribution {
      ( contributionId: string, details: contributionsService.UpdateDetails ): any;
    }
  
    /*******************************************/
  
  }
  