/******************************************************************************/

import * as mongoose from "mongoose";
import * as interfaces from "../../../../../../interfaces";
import * as mongoDB from "../../../../../../components/storage/mongodb";

import { ignoreEmpty } from "../../../preparation";

/******************************************************************************/

export interface Model extends Model_Nuance, mongoose.Document { }
export interface Model_Nuance extends mongoDB.Document {
  label: string;
  images?: string[];
  priceValues: PriceValues;
  effectivePrice: PriceValue
}

export type Model_Partial = Partial<{
  label: string;
  images: string[];
  priceValues: PriceValues_Partial;
  effectivePrice: Partial<PriceValue>;
}>;

export interface PriceValues extends PriceValues_Nuance, mongoose.Document { }
export interface PriceValues_Nuance extends mongoDB.Document {
  min?: PriceValue;
  max?: PriceValue;
  median?: PriceValue;
  mean?: PriceValue;
};
export type PriceValues_Partial = Partial<{
  min: Partial<PriceValue_Partial>;
  max: Partial<PriceValue_Partial>;
  median: Partial<PriceValue_Partial>;
  mean: Partial<PriceValue_Partial>;
}> & {
  createdAt?: Date;
  updatedAt?: Date;
};

export interface PriceValue extends PriceValue_Nuance, mongoose.Document { }
export interface PriceValue_Nuance extends mongoDB.Document {
  shopId: mongoose.Types.ObjectId;
  price: number;
};
export interface PriceValue_Partial {
  shopId?: mongoose.Types.ObjectId;
  price: number;
  createdAt?: Date;
  updatedAt?: Date;
}

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
