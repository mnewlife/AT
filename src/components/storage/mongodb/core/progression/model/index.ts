/******************************************************************************/

import * as mongoose from "mongoose";
import * as mongoDB from "../../../../../../components/storage/mongodb";

import * as x from "../../../basic-schema";

/******************************************************************************/

export interface Model extends mongoose.Document, ModelNuance { }
export interface ModelNuance extends mongoDB.Document {
  type: string;
  typeId: mongoose.Types.ObjectId;
  subject: string;
  timeMeasure: string;
  amount: number;
}

/******************************************************************************/

let progressionSchema = new mongoose.Schema( {

  type: x.StringSchema,
  typeId: x.ObjectIdSchema,
  subject: x.StringSchema,
  timeMeassure: x.StringSchema,
  amount: x.NumberSchema,

  createdAt: x.DateSchema,
  updatedAt: x.DateSchema

} );

/******************************************************************************/

let MongooseModel = mongoose.model<Model>( "Progression", progressionSchema );

export { MongooseModel };

/******************************************************************************/
