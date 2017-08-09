/******************************************************************************/

import * as mongoose from "mongoose";
import * as interfaces from "../../../../../../interfaces";
import * as mongoDB from "../../../../../../utilities/storage-manager/mongodb";

import { ignoreEmpty } from "../../../preparation";

/******************************************************************************/

export interface Model extends Model_Nuance, mongoose.Document { }
export interface Model_Nuance extends mongoDB.Document {
  checkpoint: Date;
  newStockValue: number;
  amountSold: number;
  balance: number;
}
export type Model_Partial = Partial<Model_Nuance>;

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

let AirtimeMongooseModel = mongoose.model<Model>( "Airtime", airtimeSchema );

export { AirtimeMongooseModel };

/******************************************************************************/
