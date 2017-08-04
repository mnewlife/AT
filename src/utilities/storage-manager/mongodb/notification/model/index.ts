/******************************************************************************/

import * as interfaces from "../../../../../interfaces/index";
import * as mongoose from "mongoose";

/******************************************************************************/

export type NotificationModel = interfaces.dataModel.implementations.NotificationModel;

let notificationSchema = new mongoose.Schema( {

  userId : mongoose.Schema.Types.ObjectId ,
  app : String ,
  type : String ,
  label : String ,
  seen : { type : Boolean , default : false } ,
  cleared : { type : Boolean , default : false } ,

  createdAt : { type : Date , default : Date.now } ,
  updatedAt : { type : Date , default : Date.now }

} );

/******************************************************************************/

let NotificationMongooseModel = mongoose.model<NotificationModel>( "Notification" , notificationSchema );

export { NotificationMongooseModel };

/******************************************************************************/
