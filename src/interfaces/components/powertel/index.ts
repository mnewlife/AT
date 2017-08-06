/******************************************************************************/

import * as developer from "./developer";
import * as admin from "./admin";
import * as consumer from "./consumer";

/******************************************************************************/

export { developer, admin, consumer };

/******************************************************************************/

export interface Developer { }

export interface Admin {
  readonly airtime: admin.Airtime;
  readonly airtimeSales: admin.AirtimeSales;
  readonly cardSales: admin.CardSales;
  readonly cards: admin.Cards;
  readonly newAirtimeStock: admin.NewAirtimeStock;
  readonly newCardStock: admin.NewCardStock;
}

export interface Consumer { }

/******************************************************************************/
