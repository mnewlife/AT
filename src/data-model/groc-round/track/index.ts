/******************************************************************************/

import * as dataModel from "../../../data-model";

/******************************************************************************/

export interface Super extends dataModel.DataModel {
  round: dataModel.grocRound.round.RoundInfo;
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