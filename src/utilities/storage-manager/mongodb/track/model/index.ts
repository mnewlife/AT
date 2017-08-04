/******************************************************************************/

import * as interfaces from "../../../../../interfaces/index";
import * as mongoose from "mongoose";

/******************************************************************************/

export type TrackModel = interfaces.dataModel.implementations.TrackModel;

let trackSchema = new mongoose.Schema( {

  roundId : mongoose.Schema.Types.ObjectId ,
  trackName : String ,
  contributionValue : { type : Number , min : 0 , default : 0 } ,
  installmentValues : [ {
    value : { type : Number , min : 0 , default : 0 } ,
    interval : String
  } ] ,
  adminFeePercentage : { type : Number , min : 0 , default : 0 } ,
  numProducts : { type : Number , min : 0 , default : 0 } ,
  costProducts : { type : Number , min : 0 , default : 0 } ,
  numShops : { type : Number , min : 0 , default : 0 } ,
  shops : [ String ] ,

  createdAt : { type : Date , default : Date.now } ,
  updatedAt : { type : Date , default : Date.now }

} );

/******************************************************************************/

let TrackMongooseModel = mongoose.model<TrackModel>( "Track" , trackSchema );

export { TrackMongooseModel };

/******************************************************************************/
