/******************************************************************************/

import * as mongoose from "mongoose";

import * as mongoDB from "../../../../../../components/storage/mongodb";

import * as x from "../../../basic-schema";

/******************************************************************************/

export interface Model extends mongoose.Document, ModelNuance { }
export interface ModelNuance extends mongoDB.Document {
  cardId: mongoose.Types.ObjectId;
  mdn: number;
  cost: number;
  conditions?: {
    withRouter?: boolean;
    routerType?: string;
  };
}
export type PartialModel = Partial<ModelNuance>;

/******************************************************************************/

let cardSaleSchema = new mongoose.Schema( {

  cardId: mongoose.Schema.Types.ObjectId,
  mdn: { type: Number, min: 0, default: 0 },
  cost: { type: Number, min: 0, default: 0 },
  conditions: {
    withRouter: { type: Boolean, default: false },
    routerType: { type: String, set: ignoreEmpty },
  },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }

} );

/******************************************************************************/

let MongooseModel = mongoose.model<Model>( "CardSale", cardSaleSchema );

export { MongooseModel };

/******************************************************************************/
