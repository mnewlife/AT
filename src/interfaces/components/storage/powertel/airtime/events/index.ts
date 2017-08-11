/******************************************************************************/

import * as interfaces from "../../../../../../interfaces";
import * as model from "../";
import * as storageEvents from "../../events";

/******************************************************************************/

export type context = "Powertel|Airtime";

/******************************************************************************/

export interface GotData extends storageEvents.GotData {
  filtrationCriteria: model.FiltrationCriteria;
  sortCriteria: model.SortCriteria;
}
export interface Got extends storageEvents.Got {
  context: context;
  data: GotData;
}

export interface GetFailedData extends storageEvents.GetFailedData {
  filtrationCriteria: model.FiltrationCriteria;
  sortCriteria: model.SortCriteria;
}
export interface GetFailed extends storageEvents.GetFailed {
  context: context;
  data: GetFailedData;
}

/******************************************************************************/

export interface GotByIdData extends storageEvents.GotByIdData { }
export interface GotById extends storageEvents.GotById {
  context: context;
  data: GotByIdData;
}

export interface GetByIdFailedData extends storageEvents.GetByIdFailedData { }
export interface GetByIdFailed extends storageEvents.GetByIdFailed {
  context: context;
  data: GetByIdFailedData;
}

/******************************************************************************/

export interface AddedData extends storageEvents.AddedData {
  documents: interfaces.dataModel.powertel.airtime.Super[];
}
export interface Added extends storageEvents.Added {
  context: context;
  data: AddedData;
}

export interface AddFailedData extends storageEvents.AddFailedData {
  details: model.AddDetails[];
};
export interface AddFailed extends storageEvents.AddFailed {
  context: context;
  data: AddFailedData;
}

/******************************************************************************/

export interface UpdatedData extends storageEvents.UpdatedData {
  documents: interfaces.dataModel.powertel.airtime.Super[];
}
export interface Updated extends storageEvents.Updated {
  context: context;
  data: UpdatedData;
}

export interface UpdateFailedData extends storageEvents.UpdateFailedData {
  conditions?: model.FiltrationCriteria;
  updates: model.UpdateDetails;
};
export interface UpdateFailed extends storageEvents.UpdateFailed {
  context: context;
  data: UpdateFailedData;
}

/******************************************************************************/

export interface RemovedData extends storageEvents.RemovedData {
  conditions?: model.FiltrationCriteria;
};
export interface Removed extends storageEvents.Removed {
  context: context;
  data: RemovedData;
}

export interface RemoveFailedData extends storageEvents.RemoveFailedData {
  conditions?: model.FiltrationCriteria;
};
export interface RemoveFailed extends storageEvents.RemoveFailed {
  context: context;
  data: RemoveFailedData;
}

/******************************************************************************/
