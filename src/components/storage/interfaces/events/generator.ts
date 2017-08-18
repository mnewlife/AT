/******************************************************************************/

import * as dataModel from "../../../../data-model";

import * as storage from "../";
import * as baseEvent from "./";

/******************************************************************************/

export interface Generate <C extends string, FC, SC extends storage.BaseSortCriteria, AD, UD, DMA extends dataModel.ModelArrayRange> {
  methods: GenerateMethods<C, FC, SC, AD, UD, DMA>;
  structure: GenerateStructure<C, FC, SC, AD, UD, DMA>;
}

/******************************************************************************/

export interface GenerateMethods<C extends string, FC, SC extends storage.BaseSortCriteria, AD, UD, DMA extends dataModel.ModelArrayRange> extends BaseMethods {
  got: ( data: GotData<FC, SC> ) => Got<C, FC, SC>;
  getFailed: ( data: GetFailedData<FC, SC> ) => GetFailed<C, FC, SC>;

  gotById: ( data: GotByIdData ) => GotById<C>;
  getByIdFailed: ( data: GetByIdFailedData ) => GetByIdFailed<C>;

  added: ( data: AddedData<DMA> ) => Added<C, DMA>;
  addFailed: ( data: AddFailedData<AD> ) => AddFailed<C, AD>;

  updated: ( data: UpdatedData<DMA> ) => Updated<C, DMA>;
  updateFailed: ( data: UpdateFailedData<FC, UD> ) => UpdateFailed<C, FC, UD>;

  removed: ( data: RemovedData<FC> ) => Removed<C, FC>;
  removeFailed: ( data: RemoveFailedData<FC> ) => RemoveFailed<C, FC>;
}

/******************************************************************************/

export interface GenerateStructure<C extends string, FC, SC extends storage.BaseSortCriteria, AD, UD, DMA extends dataModel.ModelArrayRange> extends BaseEvents {
  gotData: GotData<FC, SC>;
  got: Got<C, FC, SC>;
  getFailedData: GetFailedData<FC, SC>;
  getFailed: GetFailed<C, FC, SC>;

  gotByIdData: GotByIdData;
  gotById: GotById<C>;
  getByIdFailedData: GetByIdFailedData;
  getByIdFailed: GetByIdFailed<C>;

  addedData: AddedData<DMA>;
  added: Added<C, DMA>;
  addFailedData: AddFailedData<AD>;
  addFailed: AddFailed<C, AD>;

  updatedData: UpdatedData<DMA>,
  updated: Updated<C, DMA>;
  updateFailedData: UpdateFailedData<FC, UD>;
  updateFailed: UpdateFailed<C, FC, UD>;

  removedData: RemovedData<FC>,
  removed: Removed<C, FC>;
  removeFailedData: RemoveFailedData<FC>;
  removeFailed: RemoveFailed<C, FC>;
}

/******************************************************************************/

export interface BaseMethods {
  got: ( data: GotData<any, storage.BaseSortCriteria> ) => Got<string, any, storage.BaseSortCriteria>;
  getFailed: ( data: GetFailedData<any, storage.BaseSortCriteria> ) => GetFailed<string, any, storage.BaseSortCriteria>;

  gotById: ( data: GotByIdData ) => GotById<string>;
  getByIdFailed: ( data: GetByIdFailedData ) => GetByIdFailed<string>;

  added: ( data: AddedData<dataModel.ModelArrayRange> ) => Added<string, dataModel.ModelArrayRange>;
  addFailed: ( data: AddFailedData<any> ) => AddFailed<string, any>;

  updated: ( data: UpdatedData<dataModel.ModelArrayRange> ) => Updated<string, dataModel.ModelArrayRange>;
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

  addedData: AddedData<dataModel.ModelArrayRange>;
  added: Added<string, dataModel.ModelArrayRange>;
  addFailedData: AddFailedData<any>;
  addFailed: AddFailed<string, any>;

  updatedData: UpdatedData<dataModel.ModelArrayRange>,
  updated: Updated<string, dataModel.ModelArrayRange>;
  updateFailedData: UpdateFailedData<any, any>;
  updateFailed: UpdateFailed<string, any, any>;

  removedData: RemovedData<any>,
  removed: Removed<string, any>;
  removeFailedData: RemoveFailedData<any>;
  removeFailed: RemoveFailed<string, any>;
}

/******************************************************************************/

export interface GotData<FC, SC> extends baseEvent.GotData {
  filtrationCriteria: FC;
  sortCriteria: SC;
}
export interface Got<C, FC, SC> extends baseEvent.Got {
  context: C;
  data: GotData<FC, SC>;
}

export interface GetFailedData<FC, SC> extends baseEvent.GetFailedData {
  filtrationCriteria: FC;
  sortCriteria: SC;
}
export interface GetFailed<C, FC, SC> extends baseEvent.GetFailed {
  context: C;
  data: GetFailedData<FC, SC>;
}

/******************************************************************************/

export interface GotByIdData extends baseEvent.GotByIdData { }
export interface GotById<C> extends baseEvent.GotById {
  context: C;
  data: GotByIdData;
}

export interface GetByIdFailedData extends baseEvent.GetByIdFailedData { }
export interface GetByIdFailed<C> extends baseEvent.GetByIdFailed {
  context: C;
  data: GetByIdFailedData;
}

/******************************************************************************/

export interface AddedData<DMA extends dataModel.ModelArrayRange> extends baseEvent.AddedData {
  documents: DMA;
}
export interface Added<C, DMA extends dataModel.ModelArrayRange> extends baseEvent.Added {
  context: C;
  data: AddedData<DMA>;
}

export interface AddFailedData<AD> extends baseEvent.AddFailedData {
  details: AD[];
};
export interface AddFailed<C, AD> extends baseEvent.AddFailed {
  context: C;
  data: AddFailedData<AD>;
}

/******************************************************************************/

export interface UpdatedData<DMA extends dataModel.ModelArrayRange> extends baseEvent.UpdatedData {
  documents: DMA;
}
export interface Updated<C, DMA extends dataModel.ModelArrayRange> extends baseEvent.Updated {
  context: C;
  data: UpdatedData<DMA>;
}

export interface UpdateFailedData<FC, UD> extends baseEvent.UpdateFailedData {
  conditions?: FC;
  updates: UD;
};
export interface UpdateFailed<C, FC, UD> extends baseEvent.UpdateFailed {
  context: C;
  data: UpdateFailedData<FC, UD>;
}

/******************************************************************************/

export interface RemovedData<FC> extends baseEvent.RemovedData {
  conditions?: FC;
};
export interface Removed<C, FC> extends baseEvent.Removed {
  context: C;
  data: RemovedData<FC>;
}

export interface RemoveFailedData<FC> extends baseEvent.RemoveFailedData {
  conditions?: FC;
};
export interface RemoveFailed<C, FC> extends baseEvent.RemoveFailed {
  context: C;
  data: RemoveFailedData<FC>;
}

/******************************************************************************/
