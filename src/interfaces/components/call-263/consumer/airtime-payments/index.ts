/******************************************************************************/

import * as interfaces from "../../../../../interfaces";
import * as storageManagerInterfaces from "../../../../../interfaces/utilities/storage-manager";

/******************************************************************************/

export interface Emitter {

}

export interface GetDetails {
  ( userId: string, forceThrow?: boolean ): Promise<interfaces.dataModel.user.SalesRep>;
}

export interface UpdateDetails {
  ( userId: string, details: storageManagerInterfaces.user.UpdateDetails, forceThrow?: boolean ): Promise<interfaces.dataModel.user.SalesRep>;
}

export interface ChangeEmailAddress {
  ( userId: string, password: string, newEmailAddress: string, forceThrow?: boolean ): Promise<interfaces.dataModel.user.SalesRep>;
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
