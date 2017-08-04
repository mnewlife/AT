/******************************************************************************/

import * as express from "express";

import * as interfaces from "../../../../../interfaces";
import * as registrationevents from "../../../../../interfaces/components/core/developer/registration/events";

/******************************************************************************/

export interface Emitter {

}

export interface AddDeveloper {
  ( emailAddress: string, password: string, req: express.Request, forceThrow?: boolean ): Promise<interfaces.dataModel.user.Developer>;
}

export interface VerifyAccount {
  ( userId: string, code: string, forceThrow?: boolean ): Promise<void>;
}

/******************************************************************************/