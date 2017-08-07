/******************************************************************************/

import * as mongoose from "mongoose";
import * as interfaces from "../../../../../../interfaces";
import * as mongoDB from "../../../../../../utilities/storage-manager/mongodb";

import { ignoreEmpty } from "../../../preparation";

/******************************************************************************/

export interface Model extends mongoose.Document, mongoDB.Document {
  user: mongoDB.UserInfo;
  channelId: string;
  transaction: Transaction;
}
export interface Model_Partial {
  user?: Partial<mongoDB.UserInfo>;
  channelId?: string;
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
    amount: { type: Number, set: ignoreEmpty },
    method: { type: String, set: ignoreEmpty }
  },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }

} );

/******************************************************************************/

let AirtimePaymentMongooseModel = mongoose.model<Model>( "AirtimePayment", airtimePaymentSchema );

export { AirtimePaymentMongooseModel };

/******************************************************************************/
