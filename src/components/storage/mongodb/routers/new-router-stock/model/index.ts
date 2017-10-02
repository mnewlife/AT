/******************************************************************************/

import * as mongoose from "mongoose";

import * as mongoDB from "../../../../../../components/storage/mongodb";

import * as x from "../../../basic-schema";

/******************************************************************************/

export interface Model extends mongoose.Document, ModelNuance { }
export interface ModelNuance extends mongoDB.Document {
  type: string;
  initialCount: number;
  newCount: number;
  amount: number;
}
export type PartialModel = Partial<ModelNuance>;

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

let MongooseModel = mongoose.model<Model>( "NewRouterStock", newRouterStockSchema );

export { MongooseModel };

/******************************************************************************/
