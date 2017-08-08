/******************************************************************************/

import * as interfaces from "../../../../../../interfaces";
import * as model from "../";
import * as storageManagerEvents from "../../events";

/******************************************************************************/

export type context = "Core|User";

/******************************************************************************/

export interface GotData extends storageManagerEvents.GotData {
  filtrationCriteria: model.FiltrationCriteria;
  sortCriteria: model.SortCriteria;
}
export interface Got extends storageManagerEvents.Got {
  context: context;
  data: GotData;
}

export interface GetFailedData extends storageManagerEvents.GetFailedData {
  filtrationCriteria: model.FiltrationCriteria;
  sortCriteria: model.SortCriteria;
}
export interface GetFailed extends storageManagerEvents.GetFailed {
  context: context;
  data: GetFailedData;
}

/******************************************************************************/

export interface GotByIdData extends storageManagerEvents.GotByIdData { }
export interface GotById extends storageManagerEvents.GotById {
  context: context;
  data: GotByIdData;
}

export interface GetByIdFailedData extends storageManagerEvents.GetByIdFailedData { }
export interface GetByIdFailed extends storageManagerEvents.GetByIdFailed {
  context: context;
  data: GetByIdFailedData;
}

/******************************************************************************/

export interface AddedData extends storageManagerEvents.AddedData {
  documents: interfaces.dataModel.core.user.Super[];
}
export interface Added extends storageManagerEvents.Added {
  context: context;
  data: AddedData;
}

export interface AddFailedData extends storageManagerEvents.AddFailedData {
  details: model.AddDetails[];
};
export interface AddFailed extends storageManagerEvents.AddFailed {
  context: context;
  data: AddFailedData;
}

/******************************************************************************/

export interface UpdatedData extends storageManagerEvents.UpdatedData {
  documents: interfaces.dataModel.core.user.Super[];
}
export interface Updated extends storageManagerEvents.Updated {
  context: context;
  data: UpdatedData;
}

export interface UpdateFailedData extends storageManagerEvents.UpdateFailedData {
  conditions?: model.FiltrationCriteria;
  updates: model.UpdateDetails;
};
export interface UpdateFailed extends storageManagerEvents.UpdateFailed {
  context: context;
  data: UpdateFailedData;
}

/******************************************************************************/

export interface RemovedData extends storageManagerEvents.RemovedData {
  conditions?: model.FiltrationCriteria;
};
export interface Removed extends storageManagerEvents.Removed {
  context: context;
  data: RemovedData;
}

export interface RemoveFailedData extends storageManagerEvents.RemoveFailedData {
  conditions?: model.FiltrationCriteria;
};
export interface RemoveFailed extends storageManagerEvents.RemoveFailed {
  context: context;
  data: RemoveFailedData;
}

/******************************************************************************/
