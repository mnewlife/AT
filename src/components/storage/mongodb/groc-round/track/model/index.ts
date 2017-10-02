/******************************************************************************/

import * as mongoose from "mongoose";

import * as mongoDB from "../../../../../../components/storage/mongodb";

import * as x from "../../../basic-schema";
import * as round from "../../round/model";

/******************************************************************************/

export interface Model extends mongoose.Document, ModelNuance { }
export interface ModelNuance extends mongoDB.Document {
  round: round.RoundInfo;
  trackName: string;
  contributions: {
    installmentValue: number;
    totalValue: number;
  };
  adminFeePercentage: number;
  products: {
    num: number;
    value: number;
  };
}

export interface TrackInfo {
  trackId: mongoose.Types.ObjectId;
  trackName: string;
};

/******************************************************************************/

export let TrackInfoSchema = {
  trackId: x.ObjectIdSchema,
  trackName: x.StringSchema
};

let trackSchema = new mongoose.Schema( {

  round: round.RoundInfoSchema,
  trackName: x.StringSchema,
  contributions: {
    installmentValue: x.NumberSchema,
    totalValue: x.NumberSchema,
  },
  adminFeePercentage: x.NumberSchema,
  products: {
    num: x.NumberSchema,
    value: x.NumberSchema,
  },

  createdAt: x.DateSchema,
  updatedAt: x.DateSchema

} );

/******************************************************************************/

let MongooseModel = mongoose.model<Model>( "Track", trackSchema );

export { MongooseModel };

/******************************************************************************/
