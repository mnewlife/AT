/******************************************************************************/

import * as interfaces from "../../../../../interfaces/index";
import * as mongoose from "mongoose";

/******************************************************************************/

export type CartProductModel = interfaces.dataModel.implementations.CartProductModel;

let cartProductSchema = new mongoose.Schema( {

  userId : mongoose.Schema.Types.ObjectId ,
  roundId : mongoose.Schema.Types.ObjectId ,
  cartId : mongoose.Schema.Types.ObjectId ,
  product : {
    productId : mongoose.Schema.Types.ObjectId ,
    quantity : { type : Number , min : 0 , default : 0 } ,
    price : { type : Number , min : 0 , default : 0 }
  } ,

  createdAt : { type : Date , default : Date.now } ,
  updatedAt : { type : Date , default : Date.now }

} );

/******************************************************************************/

let CartProductMongooseModel = mongoose.model<CartProductModel>( "CartProduct" , cartProductSchema );

export { CartProductMongooseModel };

/******************************************************************************/
