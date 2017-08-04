/******************************************************************************/

import * as express from "express";

import * as interfaces from "../../../../../interfaces/index";
import * as dataImplementations from "../../../../../interfaces/data-model/implementations/index";

/******************************************************************************/

export interface Emitter {

}

export interface Params {
  emitter: Emitter;
}

export interface AddAdmin {
  ( emailAddress: string, req: express.Request, forceThrow?: boolean ): Promise<dataImplementations.UserModel>;
}

export interface VerifyAccount {
  ( userId: string, code: string, forceThrow?: boolean ): Promise<void>;
}

/******************************************************************************/
