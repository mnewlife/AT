/******************************************************************************/

import * as src from "../../../../../src";

/******************************************************************************/

export interface BaseEvent extends dataModel.Happening {
  context: "Middleware";
}

/******************************************************************************/

export interface RetrieveMwareListsFailedData {
  mware: src.components.sharedLogic.AppMiddleware;
  subject: string;
  subjectModule: src.components.MiddlewareBorn;
  reason: any
};
export interface RetrieveMwareListsFailed extends BaseEvent {
  identifier: "RetrieveMwareListsFailed";
  data: RetrieveMwareListsFailedData;
}

/******************************************************************************/
