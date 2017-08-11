/******************************************************************************/

import * as express from "express";

import * as interfaces from "../../../../../interfaces";
import * as registrationevents from "../../../../../interfaces/tasks/core/developer/registration/events";

/******************************************************************************/

export interface Emitter {

}

export interface AddAdmin {
  ( emailAddress: string, password: string, req: express.Request, forceThrow?: boolean ): Promise<interfaces.dataModel.core.user.Admin>;
}

export interface VerifyAccount {
  ( userId: string, code: string, forceThrow?: boolean ): Promise<void>;
}

/******************************************************************************/