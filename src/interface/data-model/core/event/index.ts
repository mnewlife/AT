/******************************************************************************/

import * as src from "../../../../src";

/******************************************************************************/

export interface Super extends dataModel.Happening, dataModel.DataModel {
  context: string;
  identifier: string;
  tags: string[];
  data: any;
}

/******************************************************************************/