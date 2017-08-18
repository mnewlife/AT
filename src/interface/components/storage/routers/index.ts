/******************************************************************************/

import * as appStorage from "../../../../src/components/storage/routers";

import * as amounts from "./amounts";
import * as newRouterStock from "./new-router-stock";
import * as sale from "./sale";
import * as events from "./events";

/******************************************************************************/

export { amounts, newRouterStock, sale, events };

/******************************************************************************/

export interface StorageController { }

/******************************************************************************/

export interface Amounts extends StorageController {
  get: appStorage.amounts.Get;
  getById: appStorage.amounts.GetById;

  add: appStorage.amounts.Add;
  addBatch: appStorage.amounts.AddBatch;

  update: appStorage.amounts.Update;
  updateById: appStorage.amounts.UpdateById;

  remove: appStorage.amounts.Remove;
  removeById: appStorage.amounts.RemoveById;
};

/******************************************************************************/

export interface NewRouterStock extends StorageController {
  get: appStorage.newRouterStock.Get;
  getById: appStorage.newRouterStock.GetById;

  add: appStorage.newRouterStock.Add;
  addBatch: appStorage.newRouterStock.AddBatch;

  update: appStorage.newRouterStock.Update;
  updateById: appStorage.newRouterStock.UpdateById;

  remove: appStorage.newRouterStock.Remove;
  removeById: appStorage.newRouterStock.RemoveById;
};

/******************************************************************************/

export interface Sale extends StorageController {
  get: appStorage.sale.Get;
  getById: appStorage.sale.GetById;

  add: appStorage.sale.Add;
  addBatch: appStorage.sale.AddBatch;

  update: appStorage.sale.Update;
  updateById: appStorage.sale.UpdateById;

  remove: appStorage.sale.Remove;
  removeById: appStorage.sale.RemoveById;
};

/******************************************************************************/