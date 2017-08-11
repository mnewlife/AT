/******************************************************************************/

import * as mongoose from "mongoose";
import * as interfaces from "../../../../../../interfaces";
import * as mongoDB from "../../../../../../components/storage/mongodb";

import { ignoreEmpty } from "../../../preparation";

/******************************************************************************/

export interface Model extends Model_Nuance, mongoose.Document { }
export interface Model_Nuance extends mongoDB.Document {
  initialBalance: number;
  newBalance: number;
  amount: number;
}
export type Model_Partial = Partial<Model_Nuance>;

/******************************************************************************/

let newAirtimeStockSchema = new mongoose.Schema( {

  initialBalance: { type: Number, min: 0, default: 0 },
  newBalance: { type: Number, min: 0, default: 0 },
  amount: { type: Number, min: 0, default: 0 },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }

} );

/******************************************************************************/

let NewAirtimeStockMongooseModel = mongoose.model<Model>( "NewAirtimeStock", newAirtimeStockSchema );

export { NewAirtimeStockMongooseModel };

/******************************************************************************/
