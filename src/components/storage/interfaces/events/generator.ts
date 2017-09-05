/******************************************************************************/

import * as dataModel from "../../../../data-model";

import * as storage from "../";
import * as baseEvent from "./";

/******************************************************************************/

export interface Events<Context extends string, FiltrationCriteria, SortCriteria extends storage.BaseSortCriteria, AddDetails, UpdateDetails, DataModel extends dataModel.DataModel> {
  Methods: Methods<Context, FiltrationCriteria, SortCriteria, AddDetails, UpdateDetails, DataModel>;
  Data: Data<Context, FiltrationCriteria, SortCriteria, AddDetails, UpdateDetails, DataModel>;
}

/******************************************************************************/

export interface Methods<Context extends string, FiltrationCriteria, SortCriteria extends storage.BaseSortCriteria, AddDetails, UpdateDetails, DataModel extends dataModel.DataModel> extends BaseMethods {
  got: ( data: GotData<FiltrationCriteria, SortCriteria> ) => Got<Context, FiltrationCriteria, SortCriteria>;
  getFailed: ( data: GetFailedData<FiltrationCriteria, SortCriteria> ) => GetFailed<Context, FiltrationCriteria, SortCriteria>;

  gotById: ( data: GotByIdData ) => GotById<Context>;
  getByIdFailed: ( data: GetByIdFailedData ) => GetByIdFailed<Context>;

  added: ( data: AddedData<DataModel> ) => Added<Context, DataModel>;
  addFailed: ( data: AddFailedData<AddDetails> ) => AddFailed<Context, AddDetails>;

  updated: ( data: UpdatedData<DataModel> ) => Updated<Context, DataModel>;
  updateFailed: ( data: UpdateFailedData<FiltrationCriteria, UpdateDetails> ) => UpdateFailed<Context, FiltrationCriteria, UpdateDetails>;

  removed: ( data: RemovedData<FiltrationCriteria> ) => Removed<Context, FiltrationCriteria>;
  removeFailed: ( data: RemoveFailedData<FiltrationCriteria> ) => RemoveFailed<Context, FiltrationCriteria>;
}

/******************************************************************************/

export interface Data<Context extends string, FiltrationCriteria, SortCriteria extends storage.BaseSortCriteria, AddDetails, UpdateDetails, DataModel extends dataModel.DataModel> extends BaseEvents {
  gotData: GotData<FiltrationCriteria, SortCriteria>;
  got: Got<Context, FiltrationCriteria, SortCriteria>;
  getFailedData: GetFailedData<FiltrationCriteria, SortCriteria>;
  getFailed: GetFailed<Context, FiltrationCriteria, SortCriteria>;

  gotByIdData: GotByIdData;
  gotById: GotById<Context>;
  getByIdFailedData: GetByIdFailedData;
  getByIdFailed: GetByIdFailed<Context>;

  addedData: AddedData<DataModel>;
  added: Added<Context, DataModel>;
  addFailedData: AddFailedData<AddDetails>;
  addFailed: AddFailed<Context, AddDetails>;

  updatedData: UpdatedData<DataModel>,
  updated: Updated<Context, DataModel>;
  updateFailedData: UpdateFailedData<FiltrationCriteria, UpdateDetails>;
  updateFailed: UpdateFailed<Context, FiltrationCriteria, UpdateDetails>;

  removedData: RemovedData<FiltrationCriteria>,
  removed: Removed<Context, FiltrationCriteria>;
  removeFailedData: RemoveFailedData<FiltrationCriteria>;
  removeFailed: RemoveFailed<Context, FiltrationCriteria>;
}

/******************************************************************************/

export interface BaseMethods {
  got: ( data: GotData<any, storage.BaseSortCriteria> ) => Got<string, any, storage.BaseSortCriteria>;
  getFailed: ( data: GetFailedData<any, storage.BaseSortCriteria> ) => GetFailed<string, any, storage.BaseSortCriteria>;

  gotById: ( data: GotByIdData ) => GotById<string>;
  getByIdFailed: ( data: GetByIdFailedData ) => GetByIdFailed<string>;

  added: ( data: AddedData<dataModel.DataModel> ) => Added<string, dataModel.DataModel>;
  addFailed: ( data: AddFailedData<any> ) => AddFailed<string, any>;

  updated: ( data: UpdatedData<dataModel.DataModel> ) => Updated<string, dataModel.DataModel>;
  updateFailed: ( data: UpdateFailedData<any, any> ) => UpdateFailed<string, any, any>;

  removed: ( data: RemovedData<any> ) => Removed<string, any>;
  removeFailed: ( data: RemoveFailedData<any> ) => RemoveFailed<string, any>;
}

/******************************************************************************/

export interface BaseEvents {
  gotData: GotData<any, storage.BaseSortCriteria>;
  got: Got<string, any, storage.BaseSortCriteria>;
  getFailedData: GetFailedData<any, storage.BaseSortCriteria>;
  getFailed: GetFailed<string, any, storage.BaseSortCriteria>;

  gotByIdData: GotByIdData;
  gotById: GotById<string>;
  getByIdFailedData: GetByIdFailedData;
  getByIdFailed: GetByIdFailed<string>;

  addedData: AddedData<dataModel.DataModel>;
  added: Added<string, dataModel.DataModel>;
  addFailedData: AddFailedData<any>;
  addFailed: AddFailed<string, any>;

  updatedData: UpdatedData<dataModel.DataModel>,
  updated: Updated<string, dataModel.DataModel>;
  updateFailedData: UpdateFailedData<any, any>;
  updateFailed: UpdateFailed<string, any, any>;

  removedData: RemovedData<any>,
  removed: Removed<string, any>;
  removeFailedData: RemoveFailedData<any>;
  removeFailed: RemoveFailed<string, any>;
}

/******************************************************************************/

export interface GotData<FiltrationCriteria, SortCriteria extends storage.BaseSortCriteria> extends baseEvent.GotData {
  filtrationCriteria: FiltrationCriteria;
  sortCriteria: SortCriteria;
}
export interface Got<Context, FiltrationCriteria, SortCriteria extends storage.BaseSortCriteria> extends baseEvent.Got {
  context: Context;
  data: GotData<FiltrationCriteria, SortCriteria>;
}

export interface GetFailedData<FiltrationCriteria, SortCriteria extends storage.BaseSortCriteria> extends baseEvent.GetFailedData {
  filtrationCriteria: FiltrationCriteria;
  sortCriteria: SortCriteria;
}
export interface GetFailed<Context, FiltrationCriteria, SortCriteria extends storage.BaseSortCriteria> extends baseEvent.GetFailed {
  context: Context;
  data: GetFailedData<FiltrationCriteria, SortCriteria>;
}

/******************************************************************************/

export interface GotByIdData extends baseEvent.GotByIdData { }
export interface GotById<Context> extends baseEvent.GotById {
  context: Context;
  data: GotByIdData;
}

export interface GetByIdFailedData extends baseEvent.GetByIdFailedData { }
export interface GetByIdFailed<Context> extends baseEvent.GetByIdFailed {
  context: Context;
  data: GetByIdFailedData;
}

/******************************************************************************/

export interface AddedData<DataModel extends dataModel.DataModel> extends baseEvent.AddedData {
  documents: DataModel[];
}
export interface Added<Context, DataModel extends dataModel.DataModel> extends baseEvent.Added {
  context: Context;
  data: AddedData<DataModel>;
}

export interface AddFailedData<AddDetails> extends baseEvent.AddFailedData {
  details: AddDetails[];
};
export interface AddFailed<Context, AddDetails> extends baseEvent.AddFailed {
  context: Context;
  data: AddFailedData<AddDetails>;
}

/******************************************************************************/

export interface UpdatedData<DataModel extends dataModel.DataModel> extends baseEvent.UpdatedData {
  documents: DataModel[];
}
export interface Updated<Context, DataModel extends dataModel.DataModel> extends baseEvent.Updated {
  context: Context;
  data: UpdatedData<DataModel>;
}

export interface UpdateFailedData<FiltrationCriteria, UpdateDetails> extends baseEvent.UpdateFailedData {
  conditions?: FiltrationCriteria;
  updates: UpdateDetails;
};
export interface UpdateFailed<Context, FiltrationCriteria, UpdateDetails> extends baseEvent.UpdateFailed {
  context: Context;
  data: UpdateFailedData<FiltrationCriteria, UpdateDetails>;
}

/******************************************************************************/

export interface RemovedData<FiltrationCriteria> extends baseEvent.RemovedData {
  conditions?: FiltrationCriteria;
};
export interface Removed<Context, FiltrationCriteria> extends baseEvent.Removed {
  context: Context;
  data: RemovedData<FiltrationCriteria>;
}

export interface RemoveFailedData<FiltrationCriteria> extends baseEvent.RemoveFailedData {
  conditions?: FiltrationCriteria;
};
export interface RemoveFailed<Context, FiltrationCriteria> extends baseEvent.RemoveFailed {
  context: Context;
  data: RemoveFailedData<FiltrationCriteria>;
}

/******************************************************************************/
