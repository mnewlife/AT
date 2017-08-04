/******************************************************************************/

import * as interfaces from "../../../../../interfaces/index";
import * as mongoose from "mongoose";

import { ignoreEmpty } from "../../preparation/index";

/******************************************************************************/

export type PriceModel = interfaces.dataModel.implementations.PriceModel;

let priceSchema = new mongoose.Schema( {

  productId: { type: mongoose.Schema.Types.ObjectId, set: ignoreEmpty },
  shopId: { type: mongoose.Schema.Types.ObjectId, set: ignoreEmpty },
  quantity: { type: Number, min: 0, default: 0 },
  price: { type: Number, min: 0, default: 0 },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }

} );

/******************************************************************************/

let PriceMongooseModel = mongoose.model<PriceModel>( "Price", priceSchema );

export { PriceMongooseModel };

/******************************************************************************/
