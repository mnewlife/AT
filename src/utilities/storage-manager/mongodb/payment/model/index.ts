/******************************************************************************/

import * as interfaces from "../../../../../interfaces/index";
import * as mongoose from "mongoose";

/******************************************************************************/

export type PaymentModel = interfaces.dataModel.implementations.PaymentModel;

let paymentSchema = new mongoose.Schema( {

  userId : mongoose.Schema.Types.ObjectId ,
  channelId : mongoose.Schema.Types.ObjectId ,
  transactionDetails : {
    identifier : String ,
    amount : String ,
    method : String
  } ,
  transferDone : { type : Boolean , default : false } ,

  createdAt : { type : Date , default : Date.now } ,
  updatedAt : { type : Date , default : Date.now }

} );

/******************************************************************************/

let PaymentMongooseModel = mongoose.model<PaymentModel>( "Payment" , paymentSchema );

export { PaymentMongooseModel };

/******************************************************************************/
