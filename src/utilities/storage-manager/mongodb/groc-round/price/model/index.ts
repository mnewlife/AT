/******************************************************************************/

import * as mongoose from "mongoose";
import * as interfaces from "../../../../../../interfaces";
import * as mongoDB from "../../../../../../utilities/storage-manager/mongodb";

import { ignoreEmpty } from "../../../preparation";

/******************************************************************************/

export interface Model extends mongoose.Document, mongoDB.Document {
  productId: mongoose.Types.ObjectId;
  shopId: mongoose.Types.ObjectId;
  quantity: number;
  price: number;
}
export type Model_Partial = Partial<Model>;

/******************************************************************************/

let priceSchema = new mongoose.Schema( {

  productId: mongoose.Schema.Types.ObjectId,
  shopId: mongoose.Schema.Types.ObjectId,
  quantity: { type: Number, min: 0, default: 0 },
  price: { type: Number, min: 0, default: 0 },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }

} );

/******************************************************************************/

let PriceMongooseModel = mongoose.model<Model>( "Price", priceSchema );

export { PriceMongooseModel };

/******************************************************************************/
