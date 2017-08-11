/******************************************************************************/

import * as interfaces from "../../../interfaces";
import * as events from "./events";

/******************************************************************************/

export interface Emitter {
  retrieveMwareListsFailed: ( params: events.RetrieveMwareListsFailedData ) => events.RetrieveMwareListsFailed;
}

export interface RetrieveMwareLists {
  ( mware: interfaces.AppMiddleware, subject: string, subjectModule: interfaces.components.MiddlewareBorn ): void;
}

/******************************************************************************/
