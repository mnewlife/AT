/******************************************************************************/

import * as interfaces from "../../../../../interfaces/index";
import * as mongoose from "mongoose";

/******************************************************************************/

export type AirtimeTransferModel = interfaces.dataModel.implementations.AirtimeTransferModel;

let airtimeTransferSchema = new mongoose.Schema( {

  userId : mongoose.Schema.Types.ObjectId ,
  channelId : mongoose.Schema.Types.ObjectId ,
  paymentId : mongoose.Schema.Types.ObjectId ,
  transferDetails : {
    identifier : String ,
    amount : { type : Number , min : 0 , default : 0 }
  } ,
  paymentRecorded : { type : Boolean , default : false } ,

  createdAt : { type : Date , default : Date.now } ,
  updatedAt : { type : Date , default : Date.now }

} );

/******************************************************************************/

let AirtimeTransferMongooseModel = mongoose.model<AirtimeTransferModel>( "AirtimeTransfer" , airtimeTransferSchema );

export { AirtimeTransferMongooseModel };

/******************************************************************************/
