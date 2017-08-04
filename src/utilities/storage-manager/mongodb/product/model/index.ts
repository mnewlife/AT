/******************************************************************************/

import * as interfaces from "../../../../../interfaces/index";
import * as mongoose from "mongoose";

import { ignoreEmpty } from "../../preparation/index";

/******************************************************************************/

export type ProductModel = interfaces.dataModel.implementations.ProductModel;

let productSchema = new mongoose.Schema( {

  label: { type: String, set: ignoreEmpty },
  images: [ { type: String, set: ignoreEmpty }],
  priceValues: {
    min: {
      shopId: { type: mongoose.Schema.Types.ObjectId, set: ignoreEmpty },
      price: { type: Number, default: 0, min: 0 }
    },
    max: {
      shopId: { type: mongoose.Schema.Types.ObjectId, set: ignoreEmpty },
      price: { type: Number, default: 0, min: 0 }
    },
    median: {
      shopId: { type: mongoose.Schema.Types.ObjectId, set: ignoreEmpty },
      price: { type: Number, default: 0, min: 0 }
    },
    mean: {
      shopId: { type: mongoose.Schema.Types.ObjectId, set: ignoreEmpty },
      price: { type: Number, default: 0, min: 0 }
    }
  },
  effectivePrice: {
    shopId: { type: mongoose.Schema.Types.ObjectId, set: ignoreEmpty },
    price: { type: Number, default: 0, min: 0 }
  },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }

} );

/******************************************************************************/

let ProductMongooseModel = mongoose.model<ProductModel>( "Product", productSchema );

export { ProductMongooseModel };

/******************************************************************************/
