/******************************************************************************/

import * as mongoose from "mongoose";

import * as mongoDB from "../../../../../../components/storage/mongodb";

import * as x from "../../../basic-schema";

/******************************************************************************/

export interface Model extends mongoose.Document, ModelNuance { }
export interface ModelNuance extends mongoDB.Document {
  buyer: Buyer;
  simCard?: SimCard;
  type: string;
  paymentMethod: string;
  unitCost: number;
  amount: number;
  totalCost: number;
}
export interface PartialModel extends Partial<Pick<ModelNuance, "type" | "paymentMethod" | "unitCost" | "amount" | "totalCost">> {
  buyer?: Partial<Buyer>;
  simCard?: Partial<SimCard>;
};

export interface Buyer {
  fullName: string;
  emailAddress?: string;
  phoneNumber?: string;
}

export interface SimCard {
  cardId: mongoose.Types.ObjectId;
  mdn: number;
}

/******************************************************************************/

let saleSchema = new mongoose.Schema( {

  buyer: {
    fullName: { type: String },
    emailAddress: { type: String },
    phoneNumber: { type: String }
  },
  simCard: {
    cardId: mongoose.Schema.Types.ObjectId,
    mdn: { type: Number, min: 0, default: 0 }
  },
  type: { type: String },
  paymentMethod: { type: String },
  unitCost: { type: Number, min: 0, default: 0 },
  amount: { type: Number, min: 0, default: 0 },
  totalCost: { type: Number, min: 0, default: 0 },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }

} );

/******************************************************************************/

let MongooseModel = mongoose.model<Model>( "Sale", saleSchema );

export { MongooseModel };

/******************************************************************************/
