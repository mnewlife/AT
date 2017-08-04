/******************************************************************************/

import * as interfaces from "../../../../../interfaces/index";
import * as mongoose from "mongoose";

/******************************************************************************/

export type CartModel = interfaces.dataModel.implementations.CartModel;

let cartSchema = new mongoose.Schema( {

  userId : mongoose.Schema.Types.ObjectId ,
  roundId : mongoose.Schema.Types.ObjectId ,
  adminFeePercentage : { type : Number , min : 0 , default : 0 } ,
  numProducts : { type : Number , min : 0 , default : 0 } ,
  costProducts : { type : Number , min : 0 , default : 0 } ,

  createdAt : { type : Date , default : Date.now } ,
  updatedAt : { type : Date , default : Date.now }

} );

/******************************************************************************/

let CartMongooseModel = mongoose.model<CartModel>( "Cart" , cartSchema );

export { CartMongooseModel };

/******************************************************************************/
