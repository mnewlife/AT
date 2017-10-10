module GrocRoundAdminRoundContributorsServiceInterfaces {

  /*******************************************/

  import roundContributor = RoundContributor;
  import user = User;
  import round = Round;

  export interface Instance {
    getRoundContributors: GetRoundContributors;
    getRoundContributor: GetRoundContributor;
    addRoundContributor: AddRoundContributor;
    updateRoundContributor: UpdateRoundContributor;
  }

  /*******************************************/

  export interface AddDetails {
    round: round.RoundInfo;
    user: user.UserInfo;
  }
  
  /******************************************************************************/
  
  export type UpdateDetails = Partial<{
    complete: boolean;
  }>;

  /*******************************************/

  export interface GetRoundContributors {
    ( round: string, user: string ): ng.IPromise<roundContributor.Super[]>;
  }

  export interface GetRoundContributor {
    ( roundContributorId: string ): ng.IPromise<roundContributor.Super>;
  }

  export interface AddRoundContributor {
    ( details: AddDetails ): ng.IPromise<roundContributor.Super>;
  }

  export interface UpdateRoundContributor {
    ( roundContributorId: string, details: UpdateDetails ): ng.IPromise<roundContributor.Super>;
  }

  /*******************************************/

}
