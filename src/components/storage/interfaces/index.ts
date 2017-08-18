/******************************************************************************/

import * as Promise from "bluebird";

import * as dataModel from "../../../data-model";
import * as publicMethods from "./public-methods";

import * as call263 from './call-263';
import * as core from './core';
import * as grocRound from './groc-round';
import * as powertel from './powertel';
import * as routers from './routers';

/******************************************************************************/

export { call263, core, grocRound, powertel, routers };

/******************************************************************************/

export interface ClassInstance {
  readonly call263: call263.ClassInstance;
  readonly core: core.ClassInstance;
  readonly grocRound: grocRound.ClassInstance;
  readonly powertel: powertel.ClassInstance;
  readonly routers: routers.ClassInstance;
}

export interface StorageController {
  get: publicMethods.Get<any, BaseSortCriteria, dataModel.DataModel[]>;
  getById: publicMethods.GetById<dataModel.DataModel>;
  addBatch: publicMethods.AddBatch<any, dataModel.DataModel[]>;
  add: publicMethods.Add<any, dataModel.DataModel>;
  update: publicMethods.Update<any, any, dataModel.DataModel[]>;
  updateById: publicMethods.UpdateById<any, dataModel.DataModel>;
  remove: publicMethods.Remove<any>;
  removeById: publicMethods.RemoveById;
}

/******************************************************************************/

export interface Generate<FC, SC extends BaseSortCriteria, AD, UD, DM extends dataModel.ModelRange, DMA extends dataModel.ModelArrayRange> extends StorageController {
  get: publicMethods.Get<FC, SC, DMA>;
  getById: publicMethods.GetById<DM>;
  addBatch: publicMethods.AddBatch<AD, DMA>;
  add: publicMethods.Add<AD, DM>;
  update: publicMethods.Update<FC, UD, DMA>;
  updateById: publicMethods.UpdateById<UD, DM>;
  remove: publicMethods.Remove<FC>;
  removeById: publicMethods.RemoveById;
}

/******************************************************************************/

export interface BaseSortCriteria {
  criteria: string;
  order: "Ascending" | "Descending";
}

/******************************************************************************/