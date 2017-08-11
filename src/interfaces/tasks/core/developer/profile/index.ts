/******************************************************************************/

import * as express from "express";

import * as interfaces from "../../../../../interfaces";
import * as storageInterfaces from "../../../../../interfaces/components/storage";

/******************************************************************************/

export interface Emitter {

}

export interface GetDetails {
  ( userId: string, forceThrow?: boolean ): Promise<interfaces.dataModel.core.user.Super>;
}

export interface UpdateDetails {
  ( userId: string, details: storageInterfaces.core.user.UpdateDetails, forceThrow?: boolean ): Promise<interfaces.dataModel.core.user.Super>;
}

export interface ChangeEmailAddress {
  ( userId: string, password: string, newEmailAddress: string, req: express.Request, forceThrow?: boolean ): Promise<interfaces.dataModel.core.user.Super>;
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