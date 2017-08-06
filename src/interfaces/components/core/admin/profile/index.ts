/******************************************************************************/

import * as express from "express";

import * as interfaces from "../../../../../interfaces";
import * as storageManagerInterfaces from "../../../../../interfaces/utilities/storage-manager";

/******************************************************************************/

export interface Emitter {

}

export interface GetDetails {
  ( userId: string, forceThrow?: boolean ): Promise<interfaces.dataModel.core.user.Admin>;
}

export interface UpdateDetails {
  ( userId: string, details: storageManagerInterfaces.core.user.UpdateDetails, forceThrow?: boolean ): Promise<interfaces.dataModel.core.user.Admin>;
}

export interface ChangeEmailAddress {
  ( userId: string, password: string, newEmailAddress: string, req: express.Request, forceThrow?: boolean ): Promise<void>;
}

export interface ChangePassword {
  ( userId: string, oldPassword: string, newPassword: string, forceThrow?: boolean ): Promise<void>;
}

export interface RequestPasswordResetCode {
  ( userId: string, forceThrow?: boolean ): Promise<void>;
}

export interface ResetPassword {
  ( userId: string, resetCode: string, forceThrow?: boolean ): Promise<void>;
}

export interface DeleteAccount {
  ( userId: string, password: string, forceThrow?: boolean ): Promise<void>;
}

/******************************************************************************/
