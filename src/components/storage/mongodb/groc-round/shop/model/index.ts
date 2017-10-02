/******************************************************************************/

import * as mongoose from "mongoose";

import * as mongoDB from "../../../../../../components/storage/mongodb";

import * as x from "../../../basic-schema";

/******************************************************************************/

export interface Model extends mongoose.Document, ModelNuance { }
export interface ModelNuance extends mongoDB.Document {
  shopName: string;
  images?: string[];
  numProducts: number;
}

export interface ShopInfo {
  shopId: mongoose.Types.ObjectId;
  shopName: string;
}

/******************************************************************************/

export let ShopInfoSchema = {
  shopId: x.ObjectIdSchema,
  shopName: x.StringSchema
};

let shopSchema = new mongoose.Schema( {

  shopName: x.StringSchema,
  images: [ x.StringSchema ],
  numProducts: x.NumberSchema,

  createdAt: x.DateSchema,
  updatedAt: x.DateSchema

} );

/******************************************************************************/

let MongooseModel = mongoose.model<Model>( "Shop", shopSchema );

export { MongooseModel };

/******************************************************************************/
