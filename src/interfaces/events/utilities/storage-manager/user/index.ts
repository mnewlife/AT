/******************************************************************************/

import * as express from "express";
import * as mongoose from "mongoose";

import * as interfaces from "../../../../../interfaces/index";
import * as dataImplementations from "../../../../../interfaces/data-model/implementations/index";

/******************************************************************************/

type context = "StorageUser";

/******************************************************************************/

export interface GotData {
  filtrationCriteria: any;
  sortCriteria: any;
  limit: number;
  numDocuments: number;
};
export interface Got extends interfaces.dataModel.Happening {
  context: context;
  identifier: "Got";
  data: GotData;
}

export interface GetFailedData {
  filtrationCriteria: any;
  sortCriteria: any;
  limit: number;
  reason: any
};
export interface GetFailed extends interfaces.dataModel.Happening {
  context: context;
  identifier: "GetFailed";
  data: GetFailedData;
}

/******************************************************************************/

export interface GotByIdData {
  id: mongoose.Types.ObjectId;
};
export interface GotById extends interfaces.dataModel.Happening {
  context: context;
  identifier: "GotById";
  data: GotByIdData;
}

export interface GetByIdFailedData {
  id: mongoose.Types.ObjectId;
  reason: any
};
export interface GetByIdFailed extends interfaces.dataModel.Happening {
  context: context;
  identifier: "GetByIdFailed";
  data: GetByIdFailedData;
}

/******************************************************************************/

export interface AddedData {
  document: dataImplementations.UserModel;
};
export interface Added extends interfaces.dataModel.Happening {
  context: context;
  identifier: "Added";
  data: AddedData;
}

export interface AddFailedData {
  details: any;
  reason: any
};
export interface AddFailed extends interfaces.dataModel.Happening {
  context: context;
  identifier: "AddFailed";
  data: AddFailedData;
}

/******************************************************************************/

export interface UpdatedData {
  id?: mongoose.Types.ObjectId;
  conditions?: any;
  document: dataImplementations.UserModel;
};
export interface Updated extends interfaces.dataModel.Happening {
  context: context;
  identifier: "Updated";
  data: UpdatedData;
}

export interface UpdateFailedData {
  id?: mongoose.Types.ObjectId;
  conditions?: any;
  details: any;
  reason: any
};
export interface UpdateFailed extends interfaces.dataModel.Happening {
  context: context;
  identifier: "UpdateFailed";
  data: UpdateFailedData;
}

/******************************************************************************/

export interface RemovedData {
  id?: mongoose.Types.ObjectId;
  conditions?: any;
};
export interface Removed extends interfaces.dataModel.Happening {
  context: context;
  identifier: "Removed";
  data: RemovedData;
}

export interface RemoveFailedData {
  id?: mongoose.Types.ObjectId;
  conditions?: any;
  reason: any
};
export interface RemoveFailed extends interfaces.dataModel.Happening {
  context: context;
  identifier: "RemoveFailed";
  data: RemoveFailedData;
}

/******************************************************************************/
