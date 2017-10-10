module Round {

  /******************************************************************************/

  import dataModel = DataModel;

  /******************************************************************************/

  export interface Super extends dataModel.DataModel {
    roundName: string;
    inProgress: boolean;
    duration: {
      start: Date;
      end: Date;
      months: number;
    };
    deliveries: {
      fee: number;
      numPayments: number;
      valuePayments: number;
    };
    contributions: {
      num: number;
      value: number;
    };
    numTracks: number;
    valueCartProducts: number;
  }
  
  export interface RoundInfo {
    roundId: string;
    roundName: string;
  };

  /******************************************************************************/

}