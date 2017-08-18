/******************************************************************************/

import * as src from "../../../../src";

/******************************************************************************/

export interface Super extends dataModel.DataModel {
  cardId: string;
  mdn: number;
  cost: number;
  conditions?: {
    withRouter?: boolean;
    routerType?: string;
  };
}

/******************************************************************************/