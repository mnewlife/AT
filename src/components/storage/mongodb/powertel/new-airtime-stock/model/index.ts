/******************************************************************************/

import * as mongoose from "mongoose";

import * as mongoDB from "../../../../../../components/storage/mongodb";

import * as x from "../../../basic-schema";

/******************************************************************************/

export interface Model extends mongoose.Document, ModelNuance { }
export interface ModelNuance extends mongoDB.Document {
  initialBalance: number;
  newBalance: number;
  amount: number;
}
export type PartialModel = Partial<ModelNuance>;

/******************************************************************************/

let newAirtimeStockSchema = new mongoose.Schema( {

  initialBalance: { type: Number, min: 0, default: 0 },
  newBalance: { type: Number, min: 0, default: 0 },
  amount: { type: Number, min: 0, default: 0 },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }

} );

/******************************************************************************/

let MongooseModel = mongoose.model<Model>( "NewAirtimeStock", newAirtimeStockSchema );

export { MongooseModel };

/******************************************************************************/
