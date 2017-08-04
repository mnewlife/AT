/******************************************************************************/

import * as interfaces from "../../../../../interfaces/index";
import * as mongoose from "mongoose";

/******************************************************************************/

export type RoundModel = interfaces.dataModel.implementations.RoundModel;

let roundSchema = new mongoose.Schema( {

  roundName : String ,
  inProgress : { type : Boolean , default : false } ,
  duration : {
    start : { type : Date , default : Date.now } ,
    end : { type : Date , default : Date.now } ,
    span : String
  } ,
  deliveryFee : { type : Number , min : 0 , default : 0 } ,
  numContributions : { type : Number , min : 0 , default : 0 } ,
  totalValueContributions : { type : Number , min : 0 , default : 0 } ,
  numContributors : { type : Number , min : 0 , default : 0 } ,
  numDeliveryFees : { type : Number , min : 0 , default : 0 } ,
  totalDeliveryFees : { type : Number , min : 0 , default : 0 } ,
  numTracks : { type : Number , min : 0 , default : 0 } ,
  totalValueCartProducts : { type : Number , min : 0 , default : 0 } ,

  createdAt : { type : Date , default : Date.now } ,
  updatedAt : { type : Date , default : Date.now }

} );

/******************************************************************************/

let RoundMongooseModel = mongoose.model<RoundModel>( "Round" , roundSchema );

export { RoundMongooseModel };

/******************************************************************************/
