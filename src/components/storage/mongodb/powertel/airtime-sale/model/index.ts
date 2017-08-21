/******************************************************************************/

import * as mongoose from "mongoose";

import * as mongoDB from "../../../../../../components/storage/mongodb";

import { ignoreEmpty } from "../../../preparation";

/******************************************************************************/

export interface Model extends mongoose.Document, mongoDB.Document {
  buyerName: string;
  card?: CardInfo;
  user?: mongoDB.UserInfo;
  amount: number;
  bundles?: {
    gb: number;
    days: number;
  };
}
export type PartialModel = Partial<{
  buyerName: string;
  card: Partial<CardInfo_Nuance>;
  user: Partial<mongoDB.UserInfo_Nuance>;
  amount: number;
  bundles: Partial<{
    gb: number;
    days: number;
  }>;
}>;

export interface CardInfo extends CardInfo_Nuance, mongoose.Document { }
export interface CardInfo_Nuance extends mongoDB.Document {
  cardId: mongoose.Types.ObjectId;
  mdn: number;
}

/******************************************************************************/

let airtimeSaleSchema = new mongoose.Schema( {

  buyerName: { type: String, set: ignoreEmpty },
  card: {
    cardId: { type: String, set: ignoreEmpty },
    mdn: { type: Number, min: 0, default: 0 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  },
  user: {
    userId: mongoose.Schema.Types.ObjectId,
    emailAddress: { type: String, set: ignoreEmpty },
    fullName: { type: String, set: ignoreEmpty },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
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
