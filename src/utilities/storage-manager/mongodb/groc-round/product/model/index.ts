/******************************************************************************/

import * as mongoose from "mongoose";
import * as interfaces from "../../../../../../interfaces";
import * as mongoDB from "../../../../../../utilities/storage-manager/mongodb";

import { ignoreEmpty } from "../../../preparation";

/******************************************************************************/

export interface Model extends mongoose.Document, mongoDB.Document {
  label: string;
  images?: string[];
  priceValues: PriceValues;
  effectivePrice: PriceValue
}

export interface Model_Partial extends Partial<Pick<Model, "label" | "images" | "priceValues">> {
  effectivePrice?: Partial<PriceValue>;
}

export interface PriceValues {
  min?: PriceValue;
  max?: PriceValue;
  median?: PriceValue;
  mean?: PriceValue;
};

export interface PriceValue {
  shopId?: string;
  price: number;
};

/******************************************************************************/

let productSchema = new mongoose.Schema( {

  label: { type: String, set: ignoreEmpty },
  images: [ String ],
  priceValues: {
    min: {
      shopId: mongoose.Types.ObjectId,
      price: { type: Number, min: 0, default: 0 }
    },
    max: {
      shopId: mongoose.Types.ObjectId,
      price: { type: Number, min: 0, default: 0 }
    },
    median: {
      shopId: mongoose.Types.ObjectId,
      price: { type: Number, min: 0, default: 0 }
    },
    mean: {
      shopId: mongoose.Types.ObjectId,
      price: { type: Number, min: 0, default: 0 }
    }
  },
  effectivePrice: {
    shopId: mongoose.Types.ObjectId,
    price: { type: Number, min: 0, default: 0 }
  },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }

} );

/******************************************************************************/

let ProductMongooseModel = mongoose.model<Model>( "Product", productSchema );

export { ProductMongooseModel };

/******************************************************************************/
