/******************************************************************************/

import * as Promise from "bluebird";
import * as mongoose from "mongoose";

import * as interfaces from "../../../../interfaces/index";
import * as dataImplementations from "../../../../interfaces/data-model/implementations/index";

/******************************************************************************/

export interface Emitter {
  got: ( params: any ) => any;
  getFailed: ( params: any ) => any;

  gotById: ( params: any ) => any;
  getByIdFailed: ( params: any ) => any;

  added: ( params: any ) => any;
  addFailed: ( params: any ) => any;

  updated: ( params: any ) => any;
  updateFailed: ( params: any ) => any;

  removed: ( params: any ) => any;
  removeFailed: ( params: any ) => any;
}

/******************************************************************************/

export interface Get {
  ( filtrationCriteria: interfaces.dataModel.getParams.event.FiltrationCriteria, sortCriteria: interfaces.dataModel.getParams.event.SortCriteria, limit: number, forceThrow?: boolean ): Promise<dataImplementations.EventModel[]>;
}

/******************************************************************************/

export interface GetById {
  ( eventId: mongoose.Types.ObjectId, forceThrow?: boolean ): Promise<dataImplementations.EventModel>;
}

/******************************************************************************/

export interface AddBatchParams {
  context: string;
  identifier: string;
  tags: string[];
  data: any;
}

export interface AddBatch {
  ( events: AddBatchParams[], forceThrow?: boolean ): Promise<dataImplementations.EventModel[]>;
}

export interface Add {
  ( context: string, identifier: string, tags: string[], data: any, forceThrow?: boolean ): Promise<dataImplementations.EventModel>;
}

/******************************************************************************/

export interface UpdateDetails {
  context?: string;
  identifier?: string;
  tags?: string[];
  data?: any
}

export interface Update {
  ( filtrationCriteria: interfaces.dataModel.getParams.event.FiltrationCriteria, details: UpdateDetails, forceThrow?: boolean ): Promise<dataImplementations.EventModel[]>;
}

export interface UpdateById {
  ( eventId: mongoose.Types.ObjectId, details: UpdateDetails, forceThrow?: boolean ): Promise<dataImplementations.EventModel>;
}

/******************************************************************************/

export interface Remove {
  ( filtrationCriteria: interfaces.dataModel.getParams.event.FiltrationCriteria, forceThrow?: boolean ): Promise<void>;
}

export interface RemoveById {
  ( eventId: mongoose.Types.ObjectId, forceThrow?: boolean ): Promise<void>;
}

/******************************************************************************/
