/******************************************************************************/

import * as interfaces from "../../../../interfaces";

/******************************************************************************/

export interface Super extends interfaces.dataModel.DataModel {
  buyer: Buyer;
  simCard?: SimCard;
  type: string;
  paymentMethod: string;
  unitCost: number;
  amount: number;
  totalCost: number;
}

/******************************************************************************/

export interface Buyer extends interfaces.dataModel.DataModel {
  fullName: string;
  emailAddress?: string;
  phoneNumber?: string;
}

export interface SimCard extends interfaces.dataModel.DataModel {
  cardId: string;
  mdn: number;
}

/******************************************************************************/