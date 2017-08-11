/******************************************************************************/

import * as appStorage from "../../../../interfaces/components/storage/powertel";

import * as airtimeSale from "./airtime-sale";
import * as card from "./card";
import * as cardSale from "./card-sale";
import * as newAirtimeStock from "./new-airtime-stock";
import * as newCardStock from "./new-card-stock";
import * as airtime from "./airtime";
import * as events from "./events";

/******************************************************************************/

export { airtimeSale, card, cardSale, newAirtimeStock, newCardStock, airtime, events };

/******************************************************************************/

export interface StorageController { }

/******************************************************************************/

export interface AirtimeSale extends StorageController {
  get: appStorage.airtimeSale.Get;
  getById: appStorage.airtimeSale.GetById;

  add: appStorage.airtimeSale.Add;
  addBatch: appStorage.airtimeSale.AddBatch;

  update: appStorage.airtimeSale.Update;
  updateById: appStorage.airtimeSale.UpdateById;

  remove: appStorage.airtimeSale.Remove;
  removeById: appStorage.airtimeSale.RemoveById;
}

/******************************************************************************/

export interface Card extends StorageController {
  get: appStorage.card.Get;
  getById: appStorage.card.GetById;

  add: appStorage.card.Add;
  addBatch: appStorage.card.AddBatch;

  update: appStorage.card.Update;
  updateById: appStorage.card.UpdateById;

  remove: appStorage.card.Remove;
  removeById: appStorage.card.RemoveById;
};

/******************************************************************************/

export interface CardSale extends StorageController {
  get: appStorage.cardSale.Get;
  getById: appStorage.cardSale.GetById;

  add: appStorage.cardSale.Add;
  addBatch: appStorage.cardSale.AddBatch;

  update: appStorage.cardSale.Update;
  updateById: appStorage.cardSale.UpdateById;

  remove: appStorage.cardSale.Remove;
  removeById: appStorage.cardSale.RemoveById;
};

/******************************************************************************/

export interface NewAirtimeStock extends StorageController {
  get: appStorage.newAirtimeStock.Get;
  getById: appStorage.newAirtimeStock.GetById;

  add: appStorage.newAirtimeStock.Add;
  addBatch: appStorage.newAirtimeStock.AddBatch;

  update: appStorage.newAirtimeStock.Update;
  updateById: appStorage.newAirtimeStock.UpdateById;

  remove: appStorage.newAirtimeStock.Remove;
  removeById: appStorage.newAirtimeStock.RemoveById;
};

/******************************************************************************/

export interface NewCardStock extends StorageController {
  get: appStorage.newCardStock.Get;
  getById: appStorage.newCardStock.GetById;

  add: appStorage.newCardStock.Add;
  addBatch: appStorage.newCardStock.AddBatch;

  update: appStorage.newCardStock.Update;
  updateById: appStorage.newCardStock.UpdateById;

  remove: appStorage.newCardStock.Remove;
  removeById: appStorage.newCardStock.RemoveById;
};

/******************************************************************************/

export interface Airtime extends StorageController {
  get: appStorage.airtime.Get;
  getById: appStorage.airtime.GetById;

  add: appStorage.airtime.Add;
  addBatch: appStorage.airtime.AddBatch;

  update: appStorage.airtime.Update;
  updateById: appStorage.airtime.UpdateById;

  remove: appStorage.airtime.Remove;
  removeById: appStorage.airtime.RemoveById;
};

/******************************************************************************/