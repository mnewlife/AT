/******************************************************************************/

import * as dataModel from "../../../data-model";

/******************************************************************************/

export interface Super extends dataModel.DataModel {
  round: dataModel.grocRound.round.RoundInfo;
  user: dataModel.core.user.UserInfo;
  contributions: Contributions;
  tracks: TrackInfo[];
  cart: {
    num: number;
    value: number;
  };
  deliveryFees: {
    valuePaid: number;
    valueDue: number;
  };
  complete: boolean;
};

export interface TrackInfo {
  track: dataModel.grocRound.track.TrackInfo;
  deviations: {
    additions: Deviation[];
    subtractions: Deviation[];
  };
}

export interface Deviation {
  product: dataModel.grocRound.product.ProductInfo;
  quantity: number;
  value: number;
}

export interface Contributions {
  num: number;
  value: number;
  valueDue: number;
}

/******************************************************************************/