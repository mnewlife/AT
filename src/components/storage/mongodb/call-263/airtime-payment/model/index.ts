/******************************************************************************/

import * as mongoose from "mongoose";
import * as mongoDB from "../../../../../../components/storage/mongodb";

import { ignoreEmpty } from "../../../preparation";

/******************************************************************************/

export interface Model extends ModelNuance, mongoose.Document { }
export interface ModelNuance extends mongoDB.Document {
  user: mongoDB.UserInfo;
  channelId: mongoose.Types.ObjectId;
  transaction: Transaction;
}
export interface PartialModel {
  user?: Partial<mongoDB.UserInfo>;
  channelId?: mongoose.Types.ObjectId;
  transaction?: Partial<Transaction>;
};

export interface Transaction {
  identifier: string;
  amount: number;
  method: string;
}

/******************************************************************************/

let airtimePaymentSchema = new mongoose.Schema( {

  user: {
    userId: mongoose.Schema.Types.ObjectId,
    emailAddress: { type: String, set: ignoreEmpty },
    fullName: { type: String, set: ignoreEmpty }
  },
  channelId: mongoose.Schema.Types.ObjectId,
  transaction: {
    identifier: { type: String, set: ignoreEmpty },
    amount: { type: Number, min: 0, default: 0 },
    method: { type: String, set: ignoreEmpty }
  },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }

} );

/******************************************************************************/

let MongooseModel = mongoose.model<Model>( "AirtimePayment", airtimePaymentSchema );

export { MongooseModel };

/******************************************************************************/
