/******************************************************************************/

import * as mongoose from "mongoose";
import * as src from "../../../../../../src";
import * as mongoDB from "../../../../../../components/storage/mongodb";

import { ignoreEmpty } from "../../../preparation";

/******************************************************************************/

export interface Model extends Model_Nuance, mongoose.Document { }
export interface Model_Nuance extends mongoDB.Document {
  buyer: Buyer;
  simCard?: SimCard;
  type: string;
  paymentMethod: string;
  unitCost: number;
  amount: number;
  totalCost: number;
}
export interface Model_Partial extends Partial<Pick<Model_Nuance, "type" | "paymentMethod" | "unitCost" | "amount" | "totalCost">> {
  buyer?: Partial<Buyer_Nuance>;
  simCard?: Partial<SimCard_Nuance>;
};

export interface Buyer extends Buyer_Nuance, mongoose.Document { }
export interface Buyer_Nuance extends mongoDB.Document {
  fullName: string;
  emailAddress?: string;
  phoneNumber?: string;
}

export interface SimCard extends SimCard_Nuance, mongoose.Document { }
export interface SimCard_Nuance extends mongoDB.Document {
  cardId: mongoose.Types.ObjectId;
  mdn: number;
}

/******************************************************************************/

let saleSchema = new mongoose.Schema( {

  buyer: {
    fullName: { type: String, set: ignoreEmpty },
    emailAddress: { type: String, set: ignoreEmpty },
    phoneNumber: { type: String, set: ignoreEmpty }
  },
  simCard: {
    cardId: mongoose.Schema.Types.ObjectId,
    mdn: { type: Number, min: 0, default: 0 }
  },
  type: { type: String, set: ignoreEmpty },
  paymentMethod: { type: String, set: ignoreEmpty },
  unitCost: { type: Number, min: 0, default: 0 },
  amount: { type: Number, min: 0, default: 0 },
  totalCost: { type: Number, min: 0, default: 0 },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }

} );

/******************************************************************************/

let SaleMongooseModel = mongoose.model<Model>( "Sale", saleSchema );

export { SaleMongooseModel };

/******************************************************************************/
