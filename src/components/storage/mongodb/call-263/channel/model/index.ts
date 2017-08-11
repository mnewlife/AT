/******************************************************************************/

import * as mongoose from "mongoose";
import * as interfaces from "../../../../../../interfaces";
import * as mongoDB from "../../../../../../components/storage/mongodb";

import { ignoreEmpty } from "../../../preparation";

/******************************************************************************/

export interface Model extends mongoose.Document, mongoDB.Document {
  allocated: boolean;
  allocatedTo: mongoose.Types.ObjectId;
  code: string;
  phoneNumber: string;
  password: string;
}
export type Model_Partial = Partial<Model>;

/******************************************************************************/

let channelSchema = new mongoose.Schema( {

  allocated: { type: Boolean, default: false },
  allocatedTo: mongoose.Schema.Types.ObjectId,
  code: { type: String, set: ignoreEmpty },
  phoneNumber: { type: String, set: ignoreEmpty },
  password: { type: String, set: ignoreEmpty },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }

} );

/******************************************************************************/

let ChannelMongooseModel = mongoose.model<Model>( "Channel", channelSchema );

export { ChannelMongooseModel };

/******************************************************************************/
