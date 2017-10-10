module GrocRoundAdminRoundComponentInterfaces {

  /*******************************************/

  import round = Round;
  import roundsService = GrocRoundAdminRoundsServiceInterfaces;

  /*******************************************/

  export interface Instance {
    round: round.Super;

    loading: boolean;
    
    errorMessage: string;
  }

  /*******************************************/

}
