/******************************************************************************/

import * as mongoose from "mongoose";
import * as interfaces from "../../../interfaces";

/******************************************************************************/

export interface Super extends Base {
  userId: string;
}

export interface Base extends interfaces.dataModel.DataModel {
  userId: any;
  subscription: string;
}

/******************************************************************************/
