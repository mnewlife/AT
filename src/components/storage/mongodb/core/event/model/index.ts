/******************************************************************************/

import * as mongoose from "mongoose";
import * as mongoDB from "../../../../../../components/storage/mongodb";

import * as x from "../../../basic-schema";

/******************************************************************************/

export interface Model extends mongoose.Document, ModelNuance { }
export interface ModelNuance extends mongoDB.Document {
  context: string;
  identifier: string;
  tags: string[];
  data: any;
}

/******************************************************************************/

let eventSchema = new mongoose.Schema( {

  context: x.StringSchema,
  identifier: x.StringSchema,
  tags: [ x.StringSchema ],
  data: x.MixedSchema,

  createdAt: x.DateSchema,
  updatedAt: x.DateSchema

} );

/******************************************************************************/

let MongooseModel = mongoose.model<Model>( "Event", eventSchema );

export { MongooseModel };

/******************************************************************************/
