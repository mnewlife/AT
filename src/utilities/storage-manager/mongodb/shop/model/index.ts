/******************************************************************************/

import * as interfaces from "../../../../../interfaces/index";
import * as mongoose from "mongoose";

import { ignoreEmpty } from "../../preparation/index";

/******************************************************************************/

export type ShopModel = interfaces.dataModel.implementations.ShopModel;

let shopSchema = new mongoose.Schema( {

  shopName: { type: String, set: ignoreEmpty },
  images: [ { type: String, set: ignoreEmpty }],
  numProducts: { type: Number, min: 0, default: 0 },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }

} );

/******************************************************************************/

let ShopMongooseModel = mongoose.model<ShopModel>( "Shop", shopSchema );

export { ShopMongooseModel };

/******************************************************************************/
