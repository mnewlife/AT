/******************************************************************************/

import * as interfaces from "../../../../../interfaces/index";
import * as mongoose from "mongoose";

/******************************************************************************/

export type RoundContributorModel = interfaces.dataModel.implementations.RoundContributorModel;

let roundContributorSchema = new mongoose.Schema( {

  roundId : mongoose.Schema.Types.ObjectId ,
  userId : mongoose.Schema.Types.ObjectId ,
  numContributions : { type : Number , min : 0 , default : 0 } ,
  totalValueContributions : { type : Number , min : 0 , default : 0 } ,
  contributionsDue : { type : Number , min : 0 , default : 0 } ,
  tracks : [ {
    trackId : String ,
    deviations : [ {
      type : String ,
      productId : mongoose.Schema.Types.ObjectId
    } ]
  } ] ,
  numCartProducts : { type : Number , min : 0 , default : 0 } ,
  costCart : { type : Number , min : 0 , default : 0 } ,
  deliveryFeesPaid : { type : Number , min : 0 , default : 0 } ,


  createdAt : { type : Date , default : Date.now } ,
  updatedAt : { type : Date , default : Date.now }

} );

/******************************************************************************/

let RoundContributorMongooseModel = mongoose.model<RoundContributorModel>( "RoundContributor" , roundContributorSchema );

export { RoundContributorMongooseModel };

/******************************************************************************/
