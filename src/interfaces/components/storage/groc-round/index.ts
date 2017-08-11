/******************************************************************************/

import * as appStorage from "../../../../interfaces/components/storage/groc-round";

import * as price from "./price";
import * as product from "./product";
import * as shop from "./shop";
import * as events from "./events";

/******************************************************************************/

export { price, product, shop, events };

/******************************************************************************/

export interface StorageController { }

/******************************************************************************/

export interface Price extends StorageController {
  get: appStorage.price.Get;
  getById: appStorage.price.GetById;

  add: appStorage.price.Add;
  addBatch: appStorage.price.AddBatch;

  update: appStorage.price.Update;
  updateById: appStorage.price.UpdateById;

  remove: appStorage.price.Remove;
  removeById: appStorage.price.RemoveById;
}

/******************************************************************************/

export interface Product extends StorageController {
  get: appStorage.product.Get;
  getById: appStorage.product.GetById;

  add: appStorage.product.Add;
  addBatch: appStorage.product.AddBatch;

  update: appStorage.product.Update;
  updateById: appStorage.product.UpdateById;

  remove: appStorage.product.Remove;
  removeById: appStorage.product.RemoveById;
};

/******************************************************************************/

export interface Shop extends StorageController {
  get: appStorage.shop.Get;
  getById: appStorage.shop.GetById;

  add: appStorage.shop.Add;
  addBatch: appStorage.shop.AddBatch;

  update: appStorage.shop.Update;
  updateById: appStorage.shop.UpdateById;

  remove: appStorage.shop.Remove;
  removeById: appStorage.shop.RemoveById;
};

/******************************************************************************/