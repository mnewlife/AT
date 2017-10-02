/******************************************************************************/

import * as dataModel from "../../../data-model";

/******************************************************************************/

export interface Super extends dataModel.DataModel {
  user: dataModel.core.user.UserInfo;
  title: string;
  images: string[];
  tags: string[];
  content: string;
}

/******************************************************************************/