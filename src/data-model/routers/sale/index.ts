/******************************************************************************/

import * as dataModel from "../../../data-model";

/******************************************************************************/

export interface Super extends dataModel.DataModel {
  buyer: Buyer;
  simCard?: SimCard;
  type: string;
  paymentMethod: string;
  unitCost: number;
  amount: number;
  totalCost: number;
}

/******************************************************************************/

export interface Buyer {
  fullName: string;
  emailAddress?: string;
  phoneNumber?: string;
}

export interface SimCard {
  cardId: string;
  mdn: number;
}

/******************************************************************************/