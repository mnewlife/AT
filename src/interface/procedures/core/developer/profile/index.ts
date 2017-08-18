/******************************************************************************/

import * as express from "express";

import * as src from "../../../../../src";
import * as storageInterfaces from "../../../../../src/components/storage";

/******************************************************************************/

export interface Events {

}

export interface GetDetails {
  ( userId: string, forceThrow?: boolean ): Promise<dataModel.core.user.Super>;
}

export interface UpdateDetails {
  ( userId: string, details: storageInterfaces.core.user.UpdateDetails, forceThrow?: boolean ): Promise<dataModel.core.user.Super>;
}

export interface ChangeEmailAddress {
  ( userId: string, password: string, newEmailAddress: string, req: express.Request, forceThrow?: boolean ): Promise<dataModel.core.user.Super>;
}

export interface ChangePassword {
  ( userId: string, oldPassword: string, newPassword: string, forceThrow?: boolean ): Promise<void>;
}

export interface RequestPasswordResetCode {
  ( userId: string, forceThrow?: boolean ): Promise<void>;
}

export interface ResetPassword {
  ( userId: string, resetCode: string, newPassword?: string, forceThrow?: boolean ): Promise<boolean>;
}

export interface DeleteAccount {
  ( userId: string, password: string, forceThrow?: boolean ): Promise<void>;
}

/******************************************************************************/
