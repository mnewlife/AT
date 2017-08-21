/******************************************************************************/

import * as Promise from "bluebird";

import * as dataModel from "../../../data-model";
import * as storage from "./index";

/******************************************************************************/

export interface MakeConditions<FiltrationCriteria, QueryConditions> {
  ( filtrationCriteria: FiltrationCriteria ): Promise<QueryConditions>;
}

/*****************************************************************/

export interface MakeSortCriteria<SortCriteria extends storage.BaseSortCriteria> {
  ( sortCriteria: SortCriteria ): Promise<string>;
}

/*****************************************************************/

export interface GenerateAddDetails<AddDetails> {
  ( documents: AddDetails[] ): any[];
}

/*****************************************************************/

export interface GenerateUpdateDetails<UpdateDetails, ImplementationDocument> {
  ( document: ImplementationDocument, details: UpdateDetails ): Promise<ImplementationDocument>;
}

/*****************************************************************/

export interface ConvertToAbstract<ImplementationDocument, AbstractDocument extends dataModel.DataModel> {
  ( documents: ImplementationDocument[] ): Promise<AbstractDocument[]>;
}

/*****************************************************************/