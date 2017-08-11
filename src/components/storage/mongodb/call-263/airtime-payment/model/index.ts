/******************************************************************************/

import * as mongoose from "mongoose";
import * as interfaces from "../../../../../../interfaces";
import * as mongoDB from "../../../../../../components/storage/mongodb";

import { ignoreEmpty } from "../../../preparation";

/******************************************************************************/

export interface Model extends mongoose.Document, mongoDB.Document {
  user: mongoDB.UserInfo;
  channelId: mongoose.Types.ObjectId;
  transaction: Transaction;
}
export interface Model_Partial {
  user?: Partial<mongoDB.UserInfo_Nuance>;
  channelId?: mongoose.Types.ObjectId;
  transaction?: Partial<Transaction_Nuance>;
};

export interface Transaction extends Transaction_Nuance, mongoose.Document { }
export interface Transaction_Nuance extends mongoDB.Document {
  identifier: string;
  amount: number;
  method: string;
}

/******************************************************************************/

let airtimePaymentSchema = new mongoose.Schema( {

  user: {
    userId: mongoose.Schema.Types.ObjectId,
    emailAddress: { type: String, set: ignoreEmpty },
    fullName: { type: String, set: ignoreEmpty },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  },
  channelId: mongoose.Schema.Types.ObjectId,
  transaction: {
    identifier: { type: String, set: ignoreEmpty },
    amount: { type: Number, min: 0, default: 0 },
    method: { type: String, set: ignoreEmpty },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }

} );

/******************************************************************************/

let AirtimePaymentMongooseModel = mongoose.model<Model>( "AirtimePayment", airtimePaymentSchema );

export { AirtimePaymentMongooseModel };

/******************************************************************************/
