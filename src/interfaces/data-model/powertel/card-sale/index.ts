/******************************************************************************/

import * as interfaces from "../../../../interfaces";

/******************************************************************************/

export interface Super extends interfaces.dataModel.DataModel {
  cardId: string;
  mdn: number;
  cost: number;
  conditions?: {
    withRouter?: boolean;
    routerType?: string;
  };
}

/******************************************************************************/