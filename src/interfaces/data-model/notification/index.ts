/******************************************************************************/

import * as mongoose from "mongoose";
import * as interfaces from "../../../interfaces";

/******************************************************************************/

export interface Super extends Base {
  userId: string;
}

export interface Base extends interfaces.dataModel.DataModel {
  userId: any;
  app: interfaces.AppName;
  type: NotificationType;
  label: string;
  seen: boolean;
  cleared: boolean;
}

export type NotificationType = "security";

/******************************************************************************/
