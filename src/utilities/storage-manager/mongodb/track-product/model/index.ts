/******************************************************************************/

import * as interfaces from "../../../../../interfaces/index";
import * as mongoose from "mongoose";

/******************************************************************************/

export type TrackProductModel = interfaces.dataModel.implementations.TrackProductModel;

let trackProductSchema = new mongoose.Schema( {

  trackId : mongoose.Schema.Types.ObjectId ,
  productId : mongoose.Schema.Types.ObjectId ,
  quantity : { type : Number , min : 0 , default : 0 } ,
  price : { type : Number , min : 0 , default : 0 } ,

  createdAt : { type : Date , default : Date.now } ,
  updatedAt : { type : Date , default : Date.now }

} );

/******************************************************************************/

let TrackProductMongooseModel = mongoose.model<TrackProductModel>( "TrackProduct" , trackProductSchema );

export { TrackProductMongooseModel };

/******************************************************************************/
