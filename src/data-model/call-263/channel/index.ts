/******************************************************************************/

import * as dataModel from "../../../data-model";

/******************************************************************************/

export interface Super extends dataModel.DataModel {
  allocated: boolean;
  allocatedTo: string;
  code: string;
  phoneNumber: string;
  password: string;
}

/******************************************************************************/
