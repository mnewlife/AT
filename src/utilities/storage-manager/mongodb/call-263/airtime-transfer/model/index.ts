/******************************************************************************/

import * as mongoose from "mongoose";
import * as interfaces from "../../../../../../interfaces";
import * as mongoDB from "../../../../../../utilities/storage-manager/mongodb";

import { ignoreEmpty } from "../../../preparation";

/******************************************************************************/

export interface Model extends mongoose.Document, mongoDB.Document {
  userId: mongoose.Types.ObjectId;
  channelId: mongoose.Types.ObjectId;
  paymentId: mongoose.Types.ObjectId;
  transfer: Transfer;
}
export interface Model_Partial extends Partial<Pick<Model, "userId" | "channelId" | "paymentId">> {
  transfer?: Partial<Transfer_Nuance>;
}

export interface Transfer_Nuance extends mongoDB.Document {
  identifier: string;
  amount: number;
  paymentRecorded: boolean;
}
export interface Transfer extends Transfer_Nuance, mongoose.Document { }

/******************************************************************************/

let airtimeTransferSchema = new mongoose.Schema( {

  userId: mongoose.Schema.Types.ObjectId,
  channelId: mongoose.Schema.Types.ObjectId,
  paymentId: mongoose.Schema.Types.ObjectId,
  transfer: {
    identifier: { type: String, set: ignoreEmpty },
    amount: { type: Number, min: 0, default: 0 },
    paymentRecorded: { type: String, set: ignoreEmpty },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }

} );

/******************************************************************************/

let AirtimeTransferMongooseModel = mongoose.model<Model>( "AirtimeTransfer", airtimeTransferSchema );

export { AirtimeTransferMongooseModel };

/******************************************************************************/
