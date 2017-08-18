/******************************************************************************/

import * as dataModel from "../../../data-model";

/******************************************************************************/

export interface Super extends dataModel.Happening, dataModel.DataModel {
  context: string;
  identifier: string;
  tags: string[];
  data: any;
}

/******************************************************************************/