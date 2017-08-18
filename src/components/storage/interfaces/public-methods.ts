/******************************************************************************/

import * as Promise from "bluebird";

import * as dataModel from "../../../data-model";
import * as storage from "./index";

/******************************************************************************/

export interface Get<FC, SC extends storage.BaseSortCriteria, DMA> {
  ( filtrationCriteria: FC, sortCriteria: SC, limit: number, forceThrow?: boolean ): Promise<DMA>;
}

/******************************************************************************/

export interface GetById<DM> {
  ( entityId: string, forceThrow?: boolean ): Promise<DM>;
}

/******************************************************************************/

export interface AddBatch<AD, DMA> {
  ( detailArray: AD[], forceThrow?: boolean ): Promise<DMA>;
}

export interface Add<AD, DM> {
  ( details: AD, forceThrow?: boolean ): Promise<DM>;
}

/******************************************************************************/

export interface Update<FC, UD, DMA> {
  ( filtrationCriteria: FC, updates: UD, forceThrow?: boolean ): Promise<DMA>;
}

export interface UpdateById<UD, DM> {
  ( entityId: string, updates: UD, forceThrow?: boolean ): Promise<DM>;
}

/******************************************************************************/

export interface Remove<FC> {
  ( filtrationCriteria: FC, forceThrow?: boolean ): Promise<void>;
}

export interface RemoveById {
  ( entityId: string, forceThrow?: boolean ): Promise<void>;
}

/******************************************************************************/