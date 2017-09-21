/******************************************************************************/

import * as mongoose from "mongoose";

import * as mongoDB from "../../../../../../components/storage/mongodb";

import { ignoreEmpty } from "../../../preparation";

/******************************************************************************/

export interface Model extends mongoose.Document, ModelNuance { }
export interface ModelNuance extends mongoDB.Document {
  label: string;
  images?: string[];
  priceValues: PriceValues;
  effectivePrice: PriceValue
}

export type PartialModel = Partial<{
  label: string;
  images: string[];
  priceValues: PriceValuesPartial;
  effectivePrice: Partial<PriceValue>;
}>;

export interface PriceValues {
  min?: PriceValue;
  max?: PriceValue;
  median?: PriceValue;
  mean?: PriceValue;
};
export type PriceValuesPartial = Partial<{
  min: Partial<PriceValuePartial>;
  max: Partial<PriceValuePartial>;
  median: Partial<PriceValuePartial>;
  mean: Partial<PriceValuePartial>;
}>;

export interface PriceValue {
  shopId: mongoose.Types.ObjectId;
  price: number;
};
export interface PriceValuePartial {
  shopId?: mongoose.Types.ObjectId;
  price: number;
}

/******************************************************************************/

let productSchema = new mongoose.Schema( {

  label: { type: String, set: ignoreEmpty },
  images: [ String ],
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
