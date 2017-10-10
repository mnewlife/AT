module GrocRoundAdminRoundContributorComponentInterfaces {

  /*******************************************/

  import roundContributor = RoundContributor;
  import roundContributorsService = GrocRoundAdminRoundContributorsServiceInterfaces;

  /*******************************************/

  export interface Instance {
    roundContributor: roundContributor.Super;

    loading: boolean;

    errorMessage: string;
  }

  /*******************************************/

}
