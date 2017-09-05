/******************************************************************************/

import * as Promise from "bluebird";

import * as eventListener from "../../../event-listener/interfaces";
import * as dataStructures from "../../helpers/data-structures/interfaces";
import * as moders from "../../helpers/moders/interfaces";

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

export interface Constructor {
  new( emitEvent: eventListener.Emit, mapDetails: dataStructures.MapDetails, checkThrow: moders.CheckThrow ): ClassInstance;
}

export interface StorageController {
  get: publicMethods.Get<any, BaseSortCriteria, dataModel.DataModel>;
  getById: publicMethods.GetById<dataModel.DataModel>;
  addBatch: publicMethods.AddBatch<any, dataModel.DataModel>;
  add: publicMethods.Add<any, dataModel.DataModel>;
  update: publicMethods.Update<any, any, dataModel.DataModel>;
  updateById: publicMethods.UpdateById<any, dataModel.DataModel>;
  remove: publicMethods.Remove<any>;
  removeById: publicMethods.RemoveById;
}

/******************************************************************************/

export interface ModelController<FiltrationCriteria, SortCriteria extends BaseSortCriteria, AddDetails, UpdateDetails, DataModel extends dataModel.DataModel> extends StorageController {
  get: publicMethods.Get<FiltrationCriteria, SortCriteria, DataModel>;
  getById: publicMethods.GetById<DataModel>;
  addBatch: publicMethods.AddBatch<AddDetails, DataModel>;
  add: publicMethods.Add<AddDetails, DataModel>;
  update: publicMethods.Update<FiltrationCriteria, UpdateDetails, DataModel>;
  updateById: publicMethods.UpdateById<UpdateDetails, DataModel>;
  remove: publicMethods.Remove<FiltrationCriteria>;
  removeById: publicMethods.RemoveById;
}

/******************************************************************************/

export interface BaseSortCriteria {
  criteria: string;
  order: "Ascending" | "Descending";
}

/******************************************************************************/