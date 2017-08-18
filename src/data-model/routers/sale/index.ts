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

export interface Buyer extends dataModel.DataModel {
  fullName: string;
  emailAddress?: string;
  phoneNumber?: string;
}

export interface SimCard extends dataModel.DataModel {
  cardId: string;
  mdn: number;
}

/******************************************************************************/