/******************************************************************************/

import * as mongoose from "mongoose";

import * as mongoDB from "../../../../../../components/storage/mongodb";

import * as x from "../../../basic-schema";

/******************************************************************************/

export interface Model extends mongoose.Document, ModelNuance { }
export interface ModelNuance extends mongoDB.Document {
  pin: number;
  puk: number;
  mdn: number;
  buyer?: Buyer;
  user?: user.UserInfo;
}
export interface PartialModel extends Partial<Pick<ModelNuance, "pin" | "puk" | "mdn">> {
  buyer?: Partial<Buyer>;
  user?: Partial<user.UserInfo>;
};

export interface Buyer {
  cardSaleId: mongoose.Types.ObjectId;
  fullName: string;
}

/******************************************************************************/

let cardSchema = new mongoose.Schema( {

  pin: { type: Number, min: 0, default: 0 },
  puk: { type: Number, min: 0, default: 0 },
  mdn: { type: Number, min: 0, default: 0 },
  buyer: {
    cardSaleId: mongoose.Schema.Types.ObjectId,
    fullName: { type: String, set: ignoreEmpty }
  },
  user: {
    userId: mongoose.Schema.Types.ObjectId,
    emailAddress: { type: String, set: ignoreEmpty },
    fullName: { type: String, set: ignoreEmpty }
  },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }

} );

/******************************************************************************/

let MongooseModel = mongoose.model<Model>( "Card", cardSchema );

export { MongooseModel };

/******************************************************************************/
