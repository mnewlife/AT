module GrocRoundAdminRoundsServiceInterfaces {

  /*******************************************/

  import round = Round;

  export interface Instance {
    getRounds: GetRounds;
    getRound: GetRound;
    addRound: AddRound;
    updateRound: UpdateRound;
  }

  /*******************************************/

  export interface AddDetails {
    roundName: string;
    inProgress: boolean;
    duration: {
      start: Date;
      end: Date;
      months: number;
    };
    deliveries: {
      fee: number;
    };
  }

  /******************************************************************************/

  export type UpdateDetails = Partial<{
    roundName: string;
    inProgress: boolean;
    duration: Partial<{
      start: Date;
      end: Date;
      months: number;
    }>;
    deliveries: Partial<{
      fee: number;
    }>;
  }>;

  /*******************************************/

  export interface GetRounds {
    (): ng.IPromise<round.Super[]>;
  }

  export interface GetRound {
    ( roundId: string ): ng.IPromise<round.Super>;
  }

  export interface AddRound {
    ( details: AddDetails ): ng.IPromise<round.Super>;
  }

  export interface UpdateRound {
    ( roundId: string, details: UpdateDetails ): ng.IPromise<round.Super>;
  }

  /*******************************************/

}
