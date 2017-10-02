/******************************************************************************/

import * as mongoose from "mongoose";

import * as mongoDB from "../../../../../../components/storage/mongodb";

import * as x from "../../../basic-schema";
import * as user from "../../../core/user/model";
import * as product from "../../product/model";
import * as track from "../../track/model";
import * as round from "../../round/model";

/******************************************************************************/

export interface Model extends mongoose.Document, ModelNuance { }
export interface ModelNuance extends mongoDB.Document {
  round: round.RoundInfo;
  user: user.UserInfo;
  contributions: {
    num: number;
    value: number;
    valueDue: number;
  };
  tracks: TrackInfo[];
  cart: {
    num: number;
    value: number;
  };
  deliveryFees: {
    valuePaid: number;
    valueDue: number;
  };
  complete: boolean;
}

export interface TrackInfo {
  track: track.TrackInfo;
  deviations: {
    additions: Deviation[];
    subtractions: Deviation[];
  };
}

export interface Deviation {
  product: product.ProductInfo;
  quantity: number;
  value: number;
}

/******************************************************************************/

export let DeviationSchema = {
  product: product.ProductInfoSchema,
  quantity: x.NumberSchema,
  value: x.NumberSchema
};

export let TrackInfoSchema = {
  track: track.TrackInfoSchema,
  deviations: {
    additions: [ DeviationSchema ],
    subtractions: [ DeviationSchema ]
  }
};

let roundContributorSchema = new mongoose.Schema( {

  round: round.RoundInfoSchema,
  user: user.UserInfoSchema,
  contributions: {
    num: x.NumberSchema,
    value: x.NumberSchema,
    valueDue: x.NumberSchema,
  },
  tracks: [ TrackInfoSchema ],
  cart: {
    num: x.NumberSchema,
    value: x.NumberSchema,
  },
  deliveryFees: {
    valuePaid: x.NumberSchema,
    valueDue: x.NumberSchema,
  },
  complete: x.BooleanSchema,

  createdAt: x.DateSchema,
  updatedAt: x.DateSchema

} );

/******************************************************************************/

let MongooseModel = mongoose.model<Model>( "RoundContributor", roundContributorSchema );

export { MongooseModel };

/******************************************************************************/
