/******************************************************************************/

import * as environment from "./environment";
import * as eventManager from "./event-manager";

import * as interfaces from "../../interfaces";

/******************************************************************************/

export { environment, eventManager };

/******************************************************************************/

export interface EventManager {
  readonly emit: eventManager.Emit;

  readonly updateReferences: eventManager.UpdateReferences;
};

/******************************************************************************/

export interface Environment {
  readonly applicationName: string;
  readonly applicationDescription: string;
  readonly contactDetails: environment.EnvironmentContactDetails;
  readonly copyrightMessage: string;
  readonly production: boolean;
  readonly host: string;
}

/******************************************************************************/
