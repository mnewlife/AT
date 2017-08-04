/******************************************************************************/

import * as express from "express";

import * as interfaces from "../../../../../interfaces";

/******************************************************************************/

export interface Emitter {

}

export interface SignIn {
  ( emailAddress: string, password: string, req: express.Request, forceThrow?: boolean ): Promise<interfaces.dataModel.user.SalesRep>;
}

export interface SignOut {
  ( req: express.Request, forceThrow?: boolean ): Promise<void>;
}

/******************************************************************************/
