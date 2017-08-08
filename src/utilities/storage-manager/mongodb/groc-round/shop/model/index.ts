/******************************************************************************/

import * as mongoose from "mongoose";
import * as interfaces from "../../../../../../interfaces";
import * as mongoDB from "../../../../../../utilities/storage-manager/mongodb";

import { ignoreEmpty } from "../../../preparation";

/******************************************************************************/

export interface Model extends mongoose.Document, mongoDB.Document {
  shopName: string;
  images?: string[];
  numProducts: number;
}
export type Model_Partial = Partial<Model>;

/******************************************************************************/

let shopSchema = new mongoose.Schema( {

  shopName: { type: String, set: ignoreEmpty },
  images: [ String ],
  numProducts: { type: Number, min: 0, default: 0 },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }

} );

/******************************************************************************/

let ShopMongooseModel = mongoose.model<Model>( "Shop", shopSchema );

export { ShopMongooseModel };

/******************************************************************************/
