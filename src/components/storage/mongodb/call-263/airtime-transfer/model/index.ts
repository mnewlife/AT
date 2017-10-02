/******************************************************************************/

import * as mongoose from "mongoose";
import * as mongoDB from "../../../../../../components/storage/mongodb";

import * as x from "../../../basic-schema";

/******************************************************************************/

export interface Model extends ModelNuance, mongoose.Document {}
export interface ModelNuance extends mongoDB.Document {
  userId: mongoose.Types.ObjectId;
  channelId: mongoose.Types.ObjectId;
  paymentId: mongoose.Types.ObjectId;
  transfer: Transfer;
}
export interface PartialModel extends Partial<Pick<Model, "userId" | "channelId" | "paymentId">> {
  transfer?: Partial<Transfer>;
}

export interface Transfer {
  identifier: string;
  amount: number;
  paymentRecorded: boolean;
}

/******************************************************************************/

let airtimeTransferSchema = new mongoose.Schema( {

  userId: mongoose.Schema.Types.ObjectId,
  channelId: mongoose.Schema.Types.ObjectId,
  paymentId: mongoose.Schema.Types.ObjectId,
  transfer: {
    identifier: { type: String, set: ignoreEmpty },
    amount: { type: Number, min: 0, default: 0 },
    paymentRecorded: { type: String, set: ignoreEmpty }
  },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }

} );

/******************************************************************************/

let MongooseModel = mongoose.model<Model>( "AirtimeTransfer", airtimeTransferSchema );

export { MongooseModel };

/******************************************************************************/
