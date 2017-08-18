/******************************************************************************/

import * as Promise from "bluebird";

import * as dataModel from "../../../data-model";
import * as storage from "./index";

/******************************************************************************/

export interface MakeConditions<FC, QC> {
  ( filtrationCriteria: FC ): Promise<QC>;
}

/*****************************************************************/

export interface MakeSortCriteria<SC extends storage.BaseSortCriteria> {
  ( sortCriteria: SC ): Promise<string>;
}

/*****************************************************************/

export interface ConvertAddDetails<AD> {
  ( documents: AD[] ): any[];
}

/*****************************************************************/

export interface GenerateUpdateDetails<UD> {
  ( document: any, details: UD ): Promise<any>;
}

/*****************************************************************/

export interface ConvertToAbstract<DMA> {
  ( documents: any[] ): Promise<DMA>;
}

/*****************************************************************/