/******************************************************************************/

import * as mongoose from "mongoose";
import * as interfaces from "../../../../../../interfaces";
import * as mongoDB from "../../../../../../components/storage/mongodb";

import { ignoreEmpty } from "../../../preparation";

/******************************************************************************/

export interface Model extends Model_Nuance, mongoose.Document { }
export interface Model_Nuance extends mongoDB.Document {
  cardId: mongoose.Types.ObjectId;
  mdn: number;
  cost: number;
  conditions?: {
    withRouter?: boolean;
    routerType?: string;
  };
}
export type Model_Partial = Partial<Model_Nuance>;

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

let CardSaleMongooseModel = mongoose.model<Model>( "CardSale", cardSaleSchema );

export { CardSaleMongooseModel };

/******************************************************************************/
