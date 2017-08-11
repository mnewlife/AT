/******************************************************************************/

import * as interfaces from "../../../../../interfaces";

/******************************************************************************/

export interface BaseEvent extends interfaces.dataModel.Happening {
  context: "Middleware";
}

/******************************************************************************/

export interface RetrieveMwareListsFailedData {
  mware: interfaces.components.sharedLogic.AppMiddleware;
  subject: string;
  subjectModule: interfaces.components.MiddlewareBorn;
  reason: any
};
export interface RetrieveMwareListsFailed extends BaseEvent {
  identifier: "RetrieveMwareListsFailed";
  data: RetrieveMwareListsFailedData;
}

/******************************************************************************/
