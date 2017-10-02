/******************************************************************************/

import * as mongoose from "mongoose";

/******************************************************************************/

export let StringSchema = String;
export let NumberSchema = { type: Number, min: 0, default: 0 };
export let BooleanSchema = { type: Boolean, default: false };
export let DateSchema = { type: Date, default: Date.now };
export let ObjectIdSchema = mongoose.Schema.Types.ObjectId;
export let MixedSchema = mongoose.Schema.Types.Mixed;

/******************************************************************************/
