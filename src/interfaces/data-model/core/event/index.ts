/******************************************************************************/

import * as interfaces from "../../../interfaces";

/******************************************************************************/

export interface Super extends interfaces.dataModel.Happening, interfaces.dataModel.DataModel {
  context: string;
  identifier: string;
  tags: string[];
  data: any;
}
export interface Super_Partial extends Partial<Super> { }

/******************************************************************************/