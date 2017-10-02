/******************************************************************************/

import * as mongoose from "mongoose";

import * as mongoDB from "../../../../../../components/storage/mongodb";

import * as x from "../../../basic-schema";
import * as shop from "../../shop/model";

/******************************************************************************/

export interface Model extends mongoose.Document, ModelNuance { }
export interface ModelNuance extends mongoDB.Document {
  label: string;
  images?: string[];
  prices: {
    shop: shop.ShopInfo;
    quantity: number;
    price: number;
  }[];
  priceValues: PriceValues;
  effectivePrice: PriceValue
}

export interface PriceValues {
  min?: PriceValue;
  max?: PriceValue;
  median?: PriceValue;
  mean?: PriceValue;
};

export interface PriceValue {
  shopId: mongoose.Types.ObjectId;
  price: number;
};

export interface ProductInfo {
  productId: mongoose.Types.ObjectId;
  label: string;
}

/******************************************************************************/

export let ProductInfoSchema = {
  productId: x.ObjectIdSchema,
  label: x.StringSchema
};

let productSchema = new mongoose.Schema( {

  label: x.StringSchema,
  images: [ x.StringSchema ],
  prices: [ {
    shop: shop.ShopInfoSchema,
    quantity: { type: Number, min: 0 },
    price: { type: Number, min: 0 }
  }],
  priceValues: {
    min: {
      shopId: mongoose.Schema.Types.ObjectId,
      price: { type: Number, min: 0, default: 0 }
    },
    max: {
      shopId: mongoose.Schema.Types.ObjectId,
      price: { type: Number, min: 0, default: 0 }
    },
    median: {
      shopId: mongoose.Schema.Types.ObjectId,
      price: { type: Number, min: 0, default: 0 }
    },
    mean: {
      shopId: mongoose.Schema.Types.ObjectId,
      price: { type: Number, min: 0, default: 0 }
    }
  },
  effectivePrice: {
    shopId: mongoose.Schema.Types.ObjectId,
    price: { type: Number, min: 0, default: 0 }
  },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }

} );

/******************************************************************************/

let MongooseModel = mongoose.model<Model>( "Product", productSchema );

export { MongooseModel };

/******************************************************************************/
