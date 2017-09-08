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

export interface Instance {
  readonly airtime: airtime.Instance;
  readonly airtimeSale: airtimeSale.Instance;
  readonly card: card.Instance;
  readonly cardSale: cardSale.Instance;
  readonly newAirtimeStock: newAirtimeStock.Instance;
  readonly newCardStock: newCardStock.Instance;
}

/******************************************************************************/