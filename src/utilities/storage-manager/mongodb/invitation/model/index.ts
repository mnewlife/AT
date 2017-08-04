/******************************************************************************/

import * as interfaces from "../../../../../interfaces/index";
import * as mongoose from "mongoose";

/******************************************************************************/

export type InvitationModel = interfaces.dataModel.implementations.InvitationModel;

let invitationSchema = new mongoose.Schema( {

  inviterId : mongoose.Schema.Types.ObjectId ,
  app : String ,
  invitees : [ {
    userId : mongoose.Schema.Types.ObjectId ,
    emailAddress : String ,
    converted : { type : Boolean , default : false }
  } ] ,

  createdAt : { type : Date , default : Date.now } ,
  updatedAt : { type : Date , default : Date.now }

} );

/******************************************************************************/

let InvitationMongooseModel = mongoose.model<InvitationModel>( "Invitation" , invitationSchema );

export { InvitationMongooseModel };

/******************************************************************************/
