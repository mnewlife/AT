/******************************************************************************/

import * as mongoose from "mongoose";
import * as interfaces from "../../../../../../interfaces";
import * as mongoDB from "../../../../../../utilities/storage-manager/mongodb";

import { ignoreEmpty } from "../../../preparation";

/******************************************************************************/

export interface Model extends mongoose.Document, mongoDB.Document {
  pin: number;
  puk: number;
  mdn: number;
  buyer?: {
    cardSaleId: string;
    fullName: string;
  };
  user?: interfaces.dataModel.core.UserInfo;
}
export type Model_Partial = Partial<Model>;

/******************************************************************************/

let eventSchema = new mongoose.Schema( {

  context: { type: String, set: ignoreEmpty },
  identifier: { type: String, set: ignoreEmpty },
  tags: [ String ],
  data: mongoose.Schema.Types.Mixed,

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }

} );

/******************************************************************************/

let EventMongooseModel = mongoose.model<Model>( "Event", eventSchema );

export { EventMongooseModel };

/******************************************************************************/
