/******************************************************************************/

import * as mongoose from "mongoose";
import * as interfaces from "../../../../interfaces/index";

/******************************************************************************/

export interface Model extends interfaces.dataModel.event.Base, mongoose.Document { }

/******************************************************************************/
