/******************************************************************************/

import * as dataModel from "../../../data-model";

/******************************************************************************/

export interface Super extends dataModel.DataModel {
  track: dataModel.grocRound.track.TrackInfo;
  product: dataModel.grocRound.product.ProductInfo;
  quantity: number;
  value: number;
}

/******************************************************************************/