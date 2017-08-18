/******************************************************************************/

import * as express from "express";

import * as src from "../../../../../src";
import * as registrationevents from "../../../../../src/procedures/core/developer/registration/events";

/******************************************************************************/

export interface Events {

}

export interface AddAdmin {
  ( emailAddress: string, password: string, req: express.Request, forceThrow?: boolean ): Promise<dataModel.core.user.Admin>;
}

export interface VerifyAccount {
  ( userId: string, code: string, forceThrow?: boolean ): Promise<void>;
}

/******************************************************************************/