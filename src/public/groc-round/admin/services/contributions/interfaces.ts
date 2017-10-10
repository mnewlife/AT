module GrocRoundAdminContributionsServiceInterfaces {

  /*******************************************/

  import contribution = Contribution;
  import user = User;
  import round = Round;

  export interface Instance {
    getContributions: GetContributions;
    getContribution: GetContribution;
    addContribution: AddContribution;
    updateContribution: UpdateContribution;
    removeContribution: RemoveContribution;
  }

  /*******************************************/

  export interface AddDetails {
    user: user.UserInfo;
    round: round.RoundInfo;
    payment: {
      identifier: string;
      amount: number;
      method: string;
    };
  }
  
  /******************************************************************************/
  
  export type UpdateDetails = Partial<{
    round: Partial<round.RoundInfo>;
    payment: Partial<{
      identifier: string;
      amount: number;
      method: string;
    }>;
  }>;

  /*******************************************/

  export interface GetContributions {
    ( round: string, user: string ): ng.IPromise<contribution.Super[]>;
  }

  export interface GetContribution {
    ( contributionId: string ): ng.IPromise<contribution.Super>;
  }

  export interface AddContribution {
    ( details: AddDetails ): ng.IPromise<contribution.Super>;
  }

  export interface UpdateContribution {
    ( contributionId: string, details: UpdateDetails ): ng.IPromise<contribution.Super>;
  }

  export interface RemoveContribution {
    ( contributionId: string ): ng.IPromise<void>;
  }

  /*******************************************/

}
