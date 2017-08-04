/******************************************************************************/

import * as appStorage from "../../../../interfaces/utilities/storage-manager/routers";

import * as newRouterStock from "./new-router-stock";
import * as sale from "./sale";

/******************************************************************************/

export { newRouterStock, sale };

/******************************************************************************/

export interface StorageController { }

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