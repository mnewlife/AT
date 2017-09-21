/******************************************************************************/

import * as mongoose from "mongoose";
import * as mongoDB from "../../../../../../components/storage/mongodb";

import { ignoreEmpty } from "../../../preparation";

/******************************************************************************/

export interface Model extends mongoose.Document, ModelNuance {}
export interface ModelNuance extends mongoDB.Document {
  allocated: boolean;
  allocatedTo: mongoose.Types.ObjectId;
  code: string;
  phoneNumber: string;
  password: string;
}
export type PartialModel = Partial<Model>;

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

let MongooseModel = mongoose.model<Model>( "Channel", channelSchema );

export { MongooseModel };

/******************************************************************************/
