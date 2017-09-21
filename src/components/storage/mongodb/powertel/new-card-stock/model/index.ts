/******************************************************************************/

import * as mongoose from "mongoose";

import * as mongoDB from "../../../../../../components/storage/mongodb";

import { ignoreEmpty } from "../../../preparation";

/******************************************************************************/

export interface Model extends mongoose.Document, ModelNuance { }
export interface ModelNuance extends mongoDB.Document {
  mdnRange?: {
    min: number;
    max: number;
  };
  initialCount: number;
  newCount: number;
  amount: number;
}
export interface PartialModel extends Partial<Pick<ModelNuance, "initialCount" | "newCount" | "amount">> {
  mdnRange?: Partial<Model[ "mdnRange" ]>;
};

/******************************************************************************/

let newCardStockSchema = new mongoose.Schema( {

  mdnRange: {
    min: { type: Number, min: 0, default: 0 },
    max: { type: Number, min: 0, default: 0 }
  },
  initialCount: { type: Number, min: 0, default: 0 },
  newCount: { type: Number, min: 0, default: 0 },
  amount: { type: Number, min: 0, default: 0 },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }

} );

/******************************************************************************/

let MongooseModel = mongoose.model<Model>( "NewCardStock", newCardStockSchema );

export { MongooseModel };

/******************************************************************************/
