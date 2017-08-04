/******************************************************************************/

import * as interfaces from "../../../../../interfaces/index";
import * as mongoose from "mongoose";

/******************************************************************************/

export type CallModel = interfaces.dataModel.implementations.CallModel;

let callSchema = new mongoose.Schema( {

  callerId: mongoose.Schema.Types.ObjectId,
  channelId: mongoose.Schema.Types.ObjectId,
  calleeId: mongoose.Schema.Types.ObjectId,
  callDetails: {
    duration: { type: Number, min: 0, default: 0 }
  },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }

} );

/******************************************************************************/

let CallMongooseModel = mongoose.model<CallModel>( "Call", callSchema );

export { CallMongooseModel };

/******************************************************************************/
