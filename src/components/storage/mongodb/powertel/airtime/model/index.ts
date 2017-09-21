/******************************************************************************/

import * as mongoose from "mongoose";

import * as mongoDB from "../../../../../../components/storage/mongodb";

import { ignoreEmpty } from "../../../preparation";

/******************************************************************************/

export interface Model extends mongoose.Document, ModelNuance { }
export interface ModelNuance extends mongoDB.Document {
  checkpoint: Date;
  newStockValue: number;
  amountSold: number;
  balance: number;
}
export type PartialModel = Partial<ModelNuance>;

/******************************************************************************/

let airtimeSchema = new mongoose.Schema( {

  checkpoint: { type: Date, default: Date.now },
  newStockValue: { type: Number, min: 0, default: 0 },
  amountSold: { type: Number, min: 0, default: 0 },
  balance: { type: Number, min: 0, default: 0 },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }

} );

/******************************************************************************/

let MongooseModel = mongoose.model<Model>( "Airtime", airtimeSchema );

export { MongooseModel };

/******************************************************************************/
