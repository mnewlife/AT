module Track {

  /******************************************************************************/

  import dataModel = DataModel;
  import round = Round;

  /******************************************************************************/

  export interface Super extends dataModel.DataModel {
    round: round.RoundInfo;
    trackName: string;
    contributions: {
      installmentValue: number;
      totalValue: number;
    };
    adminFeePercentage: number;
    products: {
      num: number;
      value: number;
    };
  }
  
  export interface TrackInfo {
    trackId: string;
    trackName: string;
  }

  /******************************************************************************/

}