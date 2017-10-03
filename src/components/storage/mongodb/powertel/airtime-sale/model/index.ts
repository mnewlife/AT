/******************************************************************************/

import * as mongoose from "mongoose";

import * as mongoDB from "../../../../../../components/storage/mongodb";

import * as x from "../../../basic-schema";
import * as user from "../../../core/user/model";

/******************************************************************************/

export interface Model extends mongoose.Document, ModelNuance { }
export interface ModelNuance extends mongoDB.Document {
  buyerName: string;
  card?: CardInfo;
  user?: user.UserInfo;
  amount: number;
  bundles?: {
    gb: number;
    days: number;
  };
}
export type PartialModel = Partial<{
  buyerName: string;
  card: Partial<CardInfo>;
  user: Partial<user.UserInfo>;
  amount: number;
  bundles: Partial<{
    gb: number;
    days: number;
  }>;
}>;

export interface CardInfo {
  cardId: mongoose.Types.ObjectId;
  mdn: number;
}

/******************************************************************************/

let airtimeSaleSchema = new mongoose.Schema( {

  buyerName: { type: String },
  card: {
    cardId: { type: String },
    mdn: { type: Number, min: 0, default: 0 }
  },
  user: {
    userId: mongoose.Schema.Types.ObjectId,
    emailAddress: { type: String },
    fullName: { type: String }    
  },
  amount: { type: Number, min: 0, default: 0 },
  bundles: {
    gb: { type: Number, min: 0, default: 0 },
    days: { type: Number, min: 0, default: 0 }
  },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }

} );

/******************************************************************************/

let MongooseModel = mongoose.model<Model>( "AirtimeSale", airtimeSaleSchema );

export { MongooseModel };

/******************************************************************************/
