/******************************************************************************/

import * as interfaces from "../../../../../interfaces/index";
import * as mongoose from "mongoose";

/******************************************************************************/

export type DisbursementModel = interfaces.dataModel.implementations.DisbursementModel;

let disbursementSchema = new mongoose.Schema( {

  userId : mongoose.Schema.Types.ObjectId ,
  roundId : mongoose.Schema.Types.ObjectId ,
  complete : { type : Boolean , default : false } ,

  createdAt : { type : Date , default : Date.now } ,
  updatedAt : { type : Date , default : Date.now }

} );

/******************************************************************************/

let DisbursementMongooseModel = mongoose.model<DisbursementModel>( "Disbursement" , disbursementSchema );

export { DisbursementMongooseModel };

/******************************************************************************/
