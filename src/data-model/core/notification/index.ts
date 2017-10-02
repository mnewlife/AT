/******************************************************************************/

import * as root from "../../../interfaces";
import * as dataModel from "../../../data-model";

/******************************************************************************/

export interface Super extends dataModel.DataModel {
  user: dataModel.core.user.UserInfo;
  type: string;
  app: root.AppName;
  label: string;
  seen: boolean;
  cleared: boolean;
}

/******************************************************************************/