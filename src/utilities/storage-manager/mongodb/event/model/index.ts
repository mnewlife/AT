/******************************************************************************/

import * as interfaces from "../../../../../interfaces/index";
import * as mongoose from "mongoose";

/******************************************************************************/

let a : mongoose.Document;

export type EventModel = interfaces.dataModel.implementations.EventModel;

let eventSchema = new mongoose.Schema( {

  context : String ,
  identifier : String ,
  tags : [ String ] ,
  data : mongoose.Schema.Types.Mixed ,

  createdAt : { type : Date , default : Date.now } ,
  updatedAt : { type : Date , default : Date.now }

} );

/******************************************************************************/

let EventMongooseModel = mongoose.model<EventModel>( "Event" , eventSchema );

export { EventMongooseModel };

/******************************************************************************/
