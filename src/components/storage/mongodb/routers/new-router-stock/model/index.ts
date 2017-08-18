/******************************************************************************/

import * as mongoose from "mongoose";
import * as src from "../../../../../../src";
import * as mongoDB from "../../../../../../components/storage/mongodb";

import { ignoreEmpty } from "../../../preparation";

/******************************************************************************/

export interface Model extends Model_Nuance, mongoose.Document { }
export interface Model_Nuance extends mongoDB.Document {
  type: string;
  initialCount: number;
  newCount: number;
  amount: number;
}
export type Model_Partial = Partial<Model_Nuance>;

/******************************************************************************/

let newRouterStockSchema = new mongoose.Schema( {

  type: { type: String, set: ignoreEmpty },
  initialCount: { type: Number, min: 0, default: 0 },
  newCount: { type: Number, min: 0, default: 0 },
  amount: { type: Number, min: 0, default: 0 },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }

} );

/******************************************************************************/

let NewRouterStockMongooseModel = mongoose.model<Model>( "NewRouterStock", newRouterStockSchema );

export { NewRouterStockMongooseModel };

/******************************************************************************/
