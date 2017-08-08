/******************************************************************************/

import * as interfaces from "../../../../../interfaces";

import * as airtimePayment from "../airtime-payment";
import * as airtimeTransfer from "../airtime-transfer";
import * as channel from "../channel";

/******************************************************************************/

export interface BaseEvent extends interfaces.dataModel.Happening {
  context: "Call263|AirtimePayment" | "Call263|AirtimeTransfer" | "Call263|Channel";
}

/******************************************************************************/

export type FiltrationCriteriaRange = airtimePayment.FiltrationCriteria | airtimeTransfer.FiltrationCriteria
  | channel.FiltrationCriteria;

/******************************************************************************/

export type AddDetailsRange = airtimePayment.AddDetails | airtimeTransfer.AddDetails
  | channel.AddDetails;

export type AddDetailsArrayRange = airtimePayment.AddDetails[] | airtimeTransfer.AddDetails[]
  | channel.AddDetails[];

/******************************************************************************/

export type UpdateDetailsRange = airtimePayment.UpdateDetails | airtimeTransfer.UpdateDetails
  | channel.UpdateDetails;

export type UpdateDetailsArrayRange = airtimePayment.UpdateDetails[] | airtimeTransfer.UpdateDetails[]
  | channel.UpdateDetails[];

/******************************************************************************/

export type SortOptionsRange = airtimePayment.SortOptions | airtimeTransfer.SortOptions
  | channel.SortOptions;

/******************************************************************************/

export type SortCriteriaRange = airtimePayment.SortCriteria | airtimeTransfer.SortCriteria
  | channel.SortCriteria;

/******************************************************************************/

export interface GotData {
  filtrationCriteria: FiltrationCriteriaRange;
  sortCriteria: SortCriteriaRange;
  limit: number;
  ids: string[];
};
export interface Got extends BaseEvent {
  identifier: "Got";
  data: GotData;
}

/******************************************************************************/

export interface GetFailedData {
  filtrationCriteria: FiltrationCriteriaRange;
  sortCriteria: SortCriteriaRange;
  limit: number;
  reason: any
};
export interface GetFailed extends BaseEvent {
  identifier: "GetFailed";
  data: GetFailedData;
}

/******************************************************************************/

export interface GotByIdData {
  id: string;
};
export interface GotById extends BaseEvent {
  identifier: "GotById";
  data: GotByIdData;
}

/******************************************************************************/

export interface GetByIdFailedData {
  id: string;
  reason: any;
};
export interface GetByIdFailed extends BaseEvent {
  identifier: "GetByIdFailed";
  data: GetByIdFailedData;
}

/******************************************************************************/

export interface AddedData {
  documents: interfaces.dataModel.call263.ModelArrayRange;
};
export interface Added extends BaseEvent {
  identifier: "Added";
  data: AddedData;
}

/******************************************************************************/

export interface AddFailedData {
  details: AddDetailsArrayRange;
  reason: any
};
export interface AddFailed extends BaseEvent {
  identifier: "AddFailed";
  data: AddFailedData;
}

/******************************************************************************/

export interface UpdatedData {
  id?: string;
  conditions?: FiltrationCriteriaRange;
  documents: interfaces.dataModel.call263.ModelArrayRange;
};
export interface Updated extends BaseEvent {
  identifier: "Updated";
  data: UpdatedData;
}

/******************************************************************************/

export interface UpdateFailedData {
  id?: string;
  conditions?: FiltrationCriteriaRange;
  updates: UpdateDetailsRange;
  reason: any
};
export interface UpdateFailed extends BaseEvent {
  identifier: "UpdateFailed";
  data: UpdateFailedData;
}

/******************************************************************************/

export interface RemovedData {
  id?: string;
  conditions?: FiltrationCriteriaRange;
};
export interface Removed extends BaseEvent {
  identifier: "Removed";
  data: RemovedData;
}

/******************************************************************************/

export interface RemoveFailedData {
  id?: string;
  conditions?: FiltrationCriteriaRange;
  reason: any
};
export interface RemoveFailed extends BaseEvent {
  identifier: "RemoveFailed";
  data: RemoveFailedData;
}

/******************************************************************************/
