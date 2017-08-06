/******************************************************************************/

import * as interfaces from "../../../../interfaces";

/******************************************************************************/

export interface Super extends interfaces.dataModel.DataModel {
  buyer: {
    fullName: string;
    emailAddress?: string;
    phoneNumber?: string;
  };
  simCard?: {
    cardId: string;
    mdn: number;
  };
  type: string;
  paymentMethod: string;
  unitCost: number;
  amount: number;
  totalCost: number;
}

/******************************************************************************/