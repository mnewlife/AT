/******************************************************************************/

import * as interfaces from "../../../../../interfaces";

/******************************************************************************/

export interface BaseEvent extends interfaces.dataModel.Happening {
  context: "Middleware";
}

/******************************************************************************/

export interface RetrieveMwareListsFailedData {
  mware: interfaces.utilities.sharedLogic.AppMiddleware;
  subject: string;
  subjectModule: interfaces.utilities.MiddlewareBorn;
  reason: any
};
export interface RetrieveMwareListsFailed extends BaseEvent {
  identifier: "RetrieveMwareListsFailed";
  data: RetrieveMwareListsFailedData;
}

/******************************************************************************/
