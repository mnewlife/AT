/******************************************************************************/

import * as mongoose from "mongoose";
import * as interfaces from "../../../../interfaces/index";
import * as implementationsInterfaces from "../../../../interfaces/data-model/implementations";

/******************************************************************************/

export interface Model extends interfaces.dataModel.progression.Base, mongoose.Document {
  userId: mongoose.Types.ObjectId;
}

/******************************************************************************/
