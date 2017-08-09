/******************************************************************************/

import * as mongoose from "mongoose";
import * as interfaces from "../../../../../../interfaces";
import * as mongoDB from "../../../../../../utilities/storage-manager/mongodb";

import { ignoreEmpty } from "../../../preparation";

/******************************************************************************/

export interface Model extends mongoose.Document, mongoDB.Document {
  pin: number;
  puk: number;
  mdn: number;
  buyer?: Buyer;
  user?: mongoDB.UserInfo;
}
export interface Model_Partial extends Partial<Pick<Model, "pin" | "puk" | "mdn">> {
  buyer?: Partial<Buyer_Nuance>;
  user?: Partial<mongoDB.UserInfo_Nuance>;
};

export interface Buyer extends Buyer_Nuance, mongoose.Document { }
export interface Buyer_Nuance extends mongoDB.Document {
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
    fullName: { type: String, set: ignoreEmpty },
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

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }

} );

/******************************************************************************/

let CardMongooseModel = mongoose.model<Model>( "Card", cardSchema );

export { CardMongooseModel };

/******************************************************************************/
