/******************************************************************************/

import * as interfaces from "../../../../../interfaces/index";
import * as mongoose from "mongoose";

/******************************************************************************/

export type DeliveryFeeModel = interfaces.dataModel.implementations.DeliveryFeeModel;

let deliveryFeeSchema = new mongoose.Schema( {

  userId : mongoose.Schema.Types.ObjectId ,
  roundId : mongoose.Schema.Types.ObjectId ,
  payment : {
    identifier : String ,
    amount : { type : Number , min : 0 , default : 0 } ,
    method : String
  } ,

  createdAt : { type : Date , default : Date.now } ,
  updatedAt : { type : Date , default : Date.now }

} );

/******************************************************************************/

let DeliveryFeeMongooseModel = mongoose.model<DeliveryFeeModel>( "DeliveryFee" , deliveryFeeSchema );

export { DeliveryFeeMongooseModel };

/******************************************************************************/
