/******************************************************************************/

import * as interfaces from "../../../../interfaces";

/******************************************************************************/

export interface Super extends interfaces.dataModel.DataModel {
  allocated: boolean;
  allocatedTo: string;
  code: string;
  phoneNumber: string;
  password: string;
}

/******************************************************************************/
