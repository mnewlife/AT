/******************************************************************************/

import * as mongoose from "mongoose";

import * as mongoDB from "../../../../../../components/storage/mongodb";

import * as x from "../../../basic-schema";

/******************************************************************************/

export interface Model extends mongoose.Document, ModelNuance { }
export interface ModelNuance extends mongoDB.Document {
  roundName: string;
  inProgress: boolean;
  duration: {
    start: Date;
    end: Date;
    months: number;
  };
  deliveries: {
    fee: number;
    numPayments: number;
    valuePayments: number;
  };
  contributions: {
    num: number;
    value: number;
  };
  numTracks: number;
  valueCartProducts: number;
};

export interface RoundInfo {
  roundId: mongoose.Types.ObjectId;
  roundName: string;
}

/******************************************************************************/

export let RoundInfoSchema = {
  roundId: x.ObjectIdSchema,
  roundName: x.StringSchema
};

let roundSchema = new mongoose.Schema( {

  roundName: x.StringSchema,
  inProgress: x.BooleanSchema,
  duration: {
    start: { type: Date },
    end: { type: Date },
    months: x.NumberSchema,
  },
  deliveries: {
    fee: x.NumberSchema,
    numPayments: x.NumberSchema,
    valuePayments: x.NumberSchema,
  },
  contributions: {
    num: x.NumberSchema,
    value: x.NumberSchema,
  },
  numTracks: x.NumberSchema,
  valueCartProducts: x.NumberSchema,

  createdAt: x.DateSchema,
  updatedAt: x.DateSchema

} );

/******************************************************************************/

let MongooseModel = mongoose.model<Model>( "Round", roundSchema );

export { MongooseModel };

/******************************************************************************/
