/******************************************************************************/

import * as interfaces from "../../../../interfaces";
import * as events from "./events";
import * as sharedLogic from "../../../../interfaces/utilities/shared-logic";

/******************************************************************************/

export interface Emitter {
  retrieveMwareListsFailed: ( params: events.RetrieveMwareListsFailedData ) => events.RetrieveMwareListsFailed;
}

export interface RetrieveMwareLists {
  ( mware: sharedLogic.AppMiddleware, subject: string, subjectModule: interfaces.utilities.MiddlewareBorn ): void;
}

/******************************************************************************/
