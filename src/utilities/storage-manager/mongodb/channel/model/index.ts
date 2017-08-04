/******************************************************************************/

import * as interfaces from "../../../../../interfaces/index";
import * as mongoose from "mongoose";

/******************************************************************************/

export type ChannelModel = interfaces.dataModel.implementations.ChannelModel;

let channelSchema = new mongoose.Schema( {

  allocated : { type : Boolean , dafault : false } ,
  allocatedTo : mongoose.Schema.Types.ObjectId ,
  channelDetails : {
    code : String ,
    phoneNumber : String ,
    password : String
  } ,

  createdAt : { type : Date , default : Date.now } ,
  updatedAt : { type : Date , default : Date.now }

} );

/******************************************************************************/

let ChannelMongooseModel = mongoose.model<ChannelModel>( "Channel" , channelSchema );

export { ChannelMongooseModel };

/******************************************************************************/
