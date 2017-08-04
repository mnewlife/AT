/******************************************************************************/

import * as express from "express";
import * as Promise from "bluebird";

import * as interfaces from "../../../../interfaces/index";
import * as events from "../../../../interfaces/events/utilities/shared-logic/middleware/index";
import * as sharedLogic from "../../../../interfaces/utilities/shared-logic/index";

/******************************************************************************/

export interface Emitter {
  retrieveMwareListsFailed: ( params: events.RetrieveMwareListsFailedData ) => events.RetrieveMwareListsFailed;
}

export interface RetrieveMwareLists {
  ( mware: sharedLogic.AppMiddleware, subject: string, subjectModule: interfaces.utilities.MiddlewareBorn ): void;
}

/******************************************************************************/
