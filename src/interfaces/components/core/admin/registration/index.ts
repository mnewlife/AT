/******************************************************************************/

import * as express from "express";

import * as interfaces from "../../../../../interfaces/index";
import * as coreInterfaces from "../../../../../interfaces/components/core/index";
import * as events from "../../../../../interfaces/events/components/core/admin/registration/index";
import * as authenticationManagerInterfaces from "../../../../../interfaces/utilities/authentication-manager/index";
import * as sharedLogicInterfaces from "../../../../../interfaces/utilities/shared-logic/index";
import * as storageManagerInterfaces from "../../../../../interfaces/utilities/storage-manager/index";
import * as sessionManagerInterfaces from "../../../../../interfaces/utilities/session-manager/index";
import * as dataImplementations from "../../../../../interfaces/data-model/implementations/index";

/******************************************************************************/

export interface Emitter {
  addedAdmin: ( params: events.AddedAdminData ) => events.AddedAdmin;
  addAdminFailed: ( params: events.AddAdminFailedData ) => events.AddAdminFailed;
}

export interface Params {
  emitter: Emitter;  
  storeNewUser: storageManagerInterfaces.user.Add;
  generateVerificationCode: coreInterfaces.sharedCode.verification.GenerateCode;
  verifyAccountLogic: coreInterfaces.sharedCode.verification.VerifyAccount;
  getCurrentUserFromSession: sessionManagerInterfaces.GetCurrentUser;
  checkThrow: sharedLogicInterfaces.moders.CheckThrow;
}

export interface AddAdmin {
  ( emailAddress: string, req: express.Request, forceThrow?: boolean ): Promise<dataImplementations.UserModel>;
}

export interface VerifyAccount {
  ( userId: string, code: string, forceThrow?: boolean ): Promise<void>;
}

/******************************************************************************/