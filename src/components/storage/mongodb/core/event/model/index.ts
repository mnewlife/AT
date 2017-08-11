/******************************************************************************/

import * as mongoose from "mongoose";
import * as interfaces from "../../../../../../interfaces";
import * as mongoDB from "../../../../../../components/storage/mongodb";

import { ignoreEmpty } from "../../../preparation";

/******************************************************************************/

export interface Model extends mongoose.Document, mongoDB.Document {
  context: string;
  identifier: string;
  tags: string[];
  data: any;
}
export type Model_Partial = Partial<Pick<Model, "context" | "identifier" | "tags" | "data">>;

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
