/******************************************************************************/

import * as express from "express";

import * as interfaces from "../../../../../interfaces/index";

/******************************************************************************/

type Happening = interfaces.dataModel.Happening;
type context = "Middleware";

/******************************************************************************/

export interface RetrieveMwareListsFailedData {
  mware: interfaces.utilities.sharedLogic.AppMiddleware;
  subject: string;
  subjectModule: interfaces.utilities.MiddlewareBorn;
  reason: any
};
export interface RetrieveMwareListsFailed extends Happening {
  context: context;
  identifier: "RetrieveMwareListsFailed";
  data: RetrieveMwareListsFailedData;
}

/******************************************************************************/
