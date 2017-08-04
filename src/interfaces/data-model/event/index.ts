/******************************************************************************/

import * as mongoose from "mongoose";
import * as interfaces from "../../../interfaces";

/******************************************************************************/

export interface Super extends Base {}

export interface Base extends interfaces.dataModel.Happening, interfaces.dataModel.DataModel { }

/******************************************************************************/
