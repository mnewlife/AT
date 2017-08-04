/******************************************************************************/

import * as interfaces from "../../../../../interfaces/index";
import * as mongoose from "mongoose";

/******************************************************************************/

export type ProgressionModel = interfaces.dataModel.implementations.ProgressionModel;

let progressionSchema = new mongoose.Schema( {

  userId: mongoose.Schema.Types.ObjectId,
  subject: String,
  timeMeasure: {
    identifier: String,
    label: String
  },
  amounts: {
    additions: { type: Number, min: 0, default: 0 },
    subtrations: { type: Number, min: 0, default: 0 },
    endAmount: { type: Number, min: 0, default: 0 }
  },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }

} );

/******************************************************************************/

let ProgressionMongooseModel = mongoose.model<ProgressionModel>( "Progression", progressionSchema );

export { ProgressionMongooseModel };

/******************************************************************``************/
