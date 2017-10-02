/******************************************************************************/

import * as dataModel from "../../../data-model";

/******************************************************************************/

export interface Super extends dataModel.DataModel {
  type: string;
  typeId: string;
  subject: string;
  timeMeasure: string;
  amount: number;
}

/******************************************************************************/