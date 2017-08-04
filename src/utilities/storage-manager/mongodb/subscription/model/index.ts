/******************************************************************************/

import * as interfaces from "../../../../../interfaces/index";
import * as mongoose from "mongoose";

/******************************************************************************/

export type SubscriptionModel = interfaces.dataModel.implementations.SubscriptionModel;

let subscriptionSchema = new mongoose.Schema( {

  userId : String ,
  subscription : String ,

  createdAt : { type : Date , default : Date.now } ,
  updatedAt : { type : Date , default : Date.now }

} );

/******************************************************************************/

let SubscriptionMongooseModel = mongoose.model<SubscriptionModel>( "Subscription" , subscriptionSchema );

export { SubscriptionMongooseModel };

/******************************************************************************/
