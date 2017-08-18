/******************************************************************************/

import * as core from "./core";
import * as grocRound from "./groc-round";
import * as call263 from "./call-263";
import * as routers from "./routers";
import * as powertel from "./powertel";

/******************************************************************************/

export { core, grocRound, call263, routers, powertel };

/******************************************************************************/

export interface StorageController { }

/******************************************************************************/

export interface Core extends StorageController {
  user: core.User;
  event: core.Event;
}

/******************************************************************************/

export interface Call263 extends StorageController {
  airtimePayment: call263.AirtimePayment;
  airtimeTransfer: call263.AirtimeTransfer;
  channel: call263.Channel;
}

/******************************************************************************/

export interface GrocRound extends StorageController {
  price: grocRound.Price;
  product: grocRound.Product;
  shop: grocRound.Shop;
}

/******************************************************************************/

export interface Powertel extends StorageController {
  airtime: powertel.Airtime;
  airtimeSale: powertel.AirtimeSale;
  card: powertel.Card;
  cardSale: powertel.CardSale;
  newAirtimeStock: powertel.NewAirtimeStock;
  newCardStock: powertel.NewCardStock;
}

/******************************************************************************/

export interface Routers extends StorageController {
  amounts: routers.Amounts;
  newRouterStock: routers.NewRouterStock;
  sale: routers.Sale;
}

/******************************************************************************/
