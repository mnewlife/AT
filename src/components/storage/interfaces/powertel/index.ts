/******************************************************************************/

import * as airtime from "./airtime";
import * as airtimeSale from "./airtime-sale";
import * as card from "./card";
import * as cardSale from "./card-sale";
import * as newAirtimeStock from "./new-airtime-stock";
import * as newCardStock from "./new-card-stock";

/******************************************************************************/

export { airtime, airtimeSale, card, cardSale, newAirtimeStock, newCardStock };

/******************************************************************************/

export interface ClassInstance {
  readonly airtime: airtime.ClassInstance;
  readonly airtimeSale: airtimeSale.ClassInstance;
  readonly card: card.ClassInstance;
  readonly cardSale: cardSale.ClassInstance;
  readonly newAirtimeStock: newAirtimeStock.ClassInstance;
  readonly newCardStock: newCardStock.ClassInstance;
}

/******************************************************************************/