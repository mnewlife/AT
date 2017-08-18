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

export type ModelRange = airtime.Super | airtimeSale.Super | card.Super
  | cardSale.Super | newAirtimeStock.Super | newCardStock.Super;
export type ModelArrayRange = airtime.Super[] | airtimeSale.Super[] | card.Super[]
  | cardSale.Super[] | newAirtimeStock.Super[] | newCardStock.Super[];

/******************************************************************************/
