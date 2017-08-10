/******************************************************************************/

import * as airtime from "./airtime";
import * as airtimeSales from "./airtime-sales";
import * as cardSales from "./card-sales";
import * as cards from "./cards";
import * as newAirtimeStock from "./new-airtime-stock";
import * as newCardStock from "./new-card-stock";

/******************************************************************************/

export { airtime, airtimeSales, cardSales, cards, newAirtimeStock, newCardStock };

/******************************************************************************/

export interface Airtime {
  readonly get: airtime.Get;
  readonly getOne: airtime.GetOne;
  readonly add: airtime.Add;
  readonly update: airtime.Update;
  readonly remove: airtime.Remove;
}

export interface AirtimeSales {
  readonly get: airtimeSales.Get;
  readonly getOne: airtimeSales.GetOne;
  readonly add: airtimeSales.Add;
  readonly update: airtimeSales.Update;
  readonly remove: airtimeSales.Remove;
}

export interface CardSales {
  readonly get: cardSales.Get;
  readonly getOne: cardSales.GetOne;
  readonly makeTransfer: cardSales.Add;
  readonly update: cardSales.Update;
  readonly remove: cardSales.Remove;
}

export interface Cards {
  readonly get: cards.Get;
  readonly getOne: cards.GetOne;
  readonly add: cards.Add;
  readonly update: cards.Update;
  readonly remove: cards.Remove;
}

export interface NewAirtimeStock {
  readonly get: newAirtimeStock.Get;
  readonly getOne: newAirtimeStock.GetOne;
  readonly add: newAirtimeStock.Add;
  readonly update: newAirtimeStock.Update;
  readonly remove: newAirtimeStock.Remove;
}

export interface NewCardStock {
  readonly get: newCardStock.Get;
  readonly getOne: newCardStock.GetOne;
  readonly add: newCardStock.Add;
  readonly update: newCardStock.Update;
  readonly remove: newCardStock.Remove;
}

/******************************************************************************/
