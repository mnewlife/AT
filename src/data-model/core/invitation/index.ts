/******************************************************************************/

import * as root from "../../../interfaces";
import * as dataModel from "../../../data-model";

/******************************************************************************/

export interface Super extends dataModel.DataModel {
  user: dataModel.core.user.UserInfo;
  app: root.AppName;
  invitees: Invitee[];
}

export interface Invitee {
  emailAddress: string;
  userId?: string;
  fullName?: string;
  converted: boolean;
}

/******************************************************************************/