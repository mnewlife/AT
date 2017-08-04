/******************************************************************************/

import * as express from "express";

import * as interfaces from "../../../../../interfaces/index";
import * as authenticationManagerInterfaces from "../../../../../interfaces/utilities/authentication-manager/index";
import * as sharedLogicInterfaces from "../../../../../interfaces/utilities/shared-logic/index";
import * as dataImplementations from "../../../../../interfaces/data-model/implementations/index";

/******************************************************************************/

export interface Emitter {

}

export interface Params {
  emitter: Emitter;
  authSignIn: authenticationManagerInterfaces.SignIn;
  authSignOut: authenticationManagerInterfaces.SignOut;
  checkThrow: sharedLogicInterfaces.moders.CheckThrow;
}

export interface SignIn {
  ( emailAddress: string, password: string, req: express.Request, forceThrow?: boolean ): Promise<dataImplementations.UserModel>;
}

export interface SignOut {
  ( req: express.Request, forceThrow?: boolean ): Promise<void>;
}

/******************************************************************************/
