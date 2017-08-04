/******************************************************************************/

import * as interfaces from "../../../../../interfaces/index";
import * as mongoose from "mongoose";

/******************************************************************************/

export type ArticleModel = interfaces.dataModel.implementations.ArticleModel;

let articleSchema = new mongoose.Schema( {

  userId : mongoose.Schema.Types.ObjectId ,
  title : String ,
  images : [ String ] ,
  tags : [ String ] ,
  content : String ,

  createdAt : { type : Date , default : Date.now } ,
  updatedAt : { type : Date , default : Date.now }

} );

/******************************************************************************/

let ArticleMongooseModel = mongoose.model<ArticleModel>( "Article" , articleSchema );

export { ArticleMongooseModel };

/******************************************************************************/
