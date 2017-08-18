/******************************************************************************/

import * as express from "express";

import * as src from "../../../../../src";

/******************************************************************************/

export interface Events {

}

export interface SignIn {
  ( emailAddress: string, password: string, req: express.Request, forceThrow?: boolean ): Promise<dataModel.core.user.SalesRep>;
}

export interface SignOut {
  ( req: express.Request, forceThrow?: boolean ): Promise<void>;
}

/******************************************************************************/
