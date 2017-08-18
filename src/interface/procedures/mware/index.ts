/******************************************************************************/

import * as src from "../../../src";
import * as events from "./events";

/******************************************************************************/

export interface Events {
  retrieveMwareListsFailed: ( params: events.RetrieveMwareListsFailedData ) => events.RetrieveMwareListsFailed;
}

export interface RetrieveMwareLists {
  ( mware: src.AppMiddleware, subject: string, subjectModule: src.components.MiddlewareBorn ): void;
}

/******************************************************************************/
