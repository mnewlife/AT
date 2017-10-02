/******************************************************************************/

import * as mongoose from "mongoose";

import * as mongoDB from "../../../../../../components/storage/mongodb";

import * as x from "../../../basic-schema";
import * as track from "../../track/model";
import * as product from "../../product/model";

/******************************************************************************/

export interface Model extends mongoose.Document, ModelNuance { }
export interface ModelNuance extends mongoDB.Document {
  track: track.TrackInfo;
  product: product.ProductInfo;
  quantity: number;
  value: number;
}

/******************************************************************************/

let trackProductSchema = new mongoose.Schema( {

  track: track.TrackInfoSchema,
  product: product.ProductInfoSchema,
  quantity: x.NumberSchema,
  value: x.NumberSchema,

  createdAt: x.DateSchema,
  updatedAt: x.DateSchema

} );

/******************************************************************************/

let MongooseModel = mongoose.model<Model>( "TrackProduct", trackProductSchema );

export { MongooseModel };

/******************************************************************************/
