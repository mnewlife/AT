/******************************************************************************/

import * as mongoose from "mongoose";

import * as mongoDB from "../../../../../../components/storage/mongodb";

import { ignoreEmpty } from "../../../preparation";

/******************************************************************************/

export interface Model extends mongoose.Document, ModelNuance { }
export interface ModelNuance extends mongoDB.Document {
  type: string;
  count: number;
  newStock: number;
  sold: number;
}
export type PartialModel = Partial<ModelNuance>;

/******************************************************************************/

let amountsSchema = new mongoose.Schema( {

  type: { type: String, set: ignoreEmpty },
  count: { type: Number, min: 0, default: 0 },
  newStock: { type: Number, min: 0, default: 0 },
  sold: { type: Number, min: 0, default: 0 },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }

} );

/******************************************************************************/

let MongooseModel = mongoose.model<Model>( "Amounts", amountsSchema );

export { MongooseModel };

/******************************************************************************/
