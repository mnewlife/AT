/******************************************************************************/

import * as interfaces from "../../../../../interfaces";

import * as airtime from "../airtime";
import * as airtimeSale from "../airtime-sale";
import * as card from "../card";
import * as cardSale from "../card-sale";
import * as newAirtimeStock from "../new-airtime-stock";
import * as newCardStock from "../new-card-stock";

/******************************************************************************/

export interface BaseEvent extends interfaces.dataModel.Happening {
  context: "Powertel|Airtime" | "Powertel|AirtimeSale" | "Powertel|Card"
  | "Powertel|CardSale" | "Powertel|NewAirtimeStock" | "Powertel|NewCardStock";
}

/******************************************************************************/

export type FiltrationCriteriaRange = airtime.FiltrationCriteria | airtimeSale.FiltrationCriteria
  | card.FiltrationCriteria | cardSale.FiltrationCriteria | newAirtimeStock.FiltrationCriteria
  | newCardStock.FiltrationCriteria;

/******************************************************************************/

export type AddDetailsRange = airtime.AddDetails | airtimeSale.AddDetails
  | card.AddDetails | cardSale.AddDetails | newAirtimeStock.AddDetails
  | newCardStock.AddDetails;

export type AddDetailsArrayRange = airtime.AddDetails[] | airtimeSale.AddDetails[]
  | card.AddDetails[] | cardSale.AddDetails[] | newAirtimeStock.AddDetails[]
  | newCardStock.AddDetails[];

/******************************************************************************/

export type UpdateDetailsRange = airtime.UpdateDetails | airtimeSale.UpdateDetails
  | card.UpdateDetails | cardSale.UpdateDetails | newAirtimeStock.UpdateDetails
  | newCardStock.UpdateDetails;

export type UpdateDetailsArrayRange = airtime.UpdateDetails[] | airtimeSale.UpdateDetails[]
  | card.UpdateDetails[] | cardSale.UpdateDetails[] | newAirtimeStock.UpdateDetails[]
  | newCardStock.UpdateDetails[];

/******************************************************************************/

export type SortOptionsRange = airtime.SortOptions | airtimeSale.SortOptions
  | card.SortOptions | cardSale.SortOptions | newAirtimeStock.SortOptions
  | newCardStock.SortOptions;

/******************************************************************************/

export type SortCriteriaRange = airtime.SortCriteria | airtimeSale.SortCriteria
  | card.SortCriteria | cardSale.SortCriteria | newAirtimeStock.SortCriteria
  | newCardStock.SortCriteria;

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
  documents: interfaces.dataModel.powertel.ModelArrayRange;
};
export interface Added extends BaseEvent {
  identifier: "Added";
  data: AddedData;
}

/******************************************************************************/

export interface AddFailedData {
  details: AddDetailsRange;
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
  documents: interfaces.dataModel.powertel.ModelArrayRange;
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
