/******************************************************************************/

import * as appStorage from "../../../../interfaces/components/storage/core";

import * as user from "./user";
import * as event from "./event";
import * as events from "./events";

/******************************************************************************/

export { user, event, events };

/******************************************************************************/

export interface StorageController { }

/******************************************************************************/

export interface User extends StorageController {
  get: appStorage.user.Get;
  getById: appStorage.user.GetById;

  add: appStorage.user.Add;
  addBatch: appStorage.user.AddBatch;

  update: appStorage.user.Update;
  updateById: appStorage.user.UpdateById;

  remove: appStorage.user.Remove;
  removeById: appStorage.user.RemoveById;
}

/******************************************************************************/

export interface Event extends StorageController {
  get: appStorage.event.Get;
  getById: appStorage.event.GetById;

  add: appStorage.event.Add;
  addBatch: appStorage.event.AddBatch;

  update: appStorage.event.Update;
  updateById: appStorage.event.UpdateById;

  remove: appStorage.event.Remove;
  removeById: appStorage.event.RemoveById;
};

/******************************************************************************/