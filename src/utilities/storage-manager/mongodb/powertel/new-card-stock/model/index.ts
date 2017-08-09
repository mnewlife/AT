/******************************************************************************/

import * as mongoose from "mongoose";
import * as interfaces from "../../../../../../interfaces";
import * as mongoDB from "../../../../../../utilities/storage-manager/mongodb";

import { ignoreEmpty } from "../../../preparation";

/******************************************************************************/

export interface Model extends Model_Nuance, mongoose.Document { }
export interface Model_Nuance extends mongoDB.Document {
  mdnRange?: {
    min: number;
    max: number;
  };
  initialCount: number;
  newCount: number;
  amount: number;
}
export interface Model_Partial extends Partial<Pick<Model, "initialCount" | "newCount" | "amount">> {
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

let NewCardStockMongooseModel = mongoose.model<Model>( "NewCardStock", newCardStockSchema );

export { NewCardStockMongooseModel };

/******************************************************************************/
