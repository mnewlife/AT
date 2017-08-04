/******************************************************************************/

import * as interfaces from "../../../../../interfaces/index";
import * as dataImplementations from "../../../../../interfaces/data-model/implementations/index";

/******************************************************************************/

export interface Emitter {

}

export interface Params {
  emitter : Emitter;
}

export interface UpdateFields {

  firstName?: string;
  lastName?: string;
  dateOfBirth?: Date;
  gender?: "Male" | "Female";

  phoneNumbers?: string[];

  country?: string;
  province?: string;
  address?: string;
}

export interface GetDetails {
  ( userId: string, forceThrow?: boolean ): Promise<dataImplementations.UserModel>;
}

export interface UpdateDetails {
  ( userId: string, details: UpdateFields, forceThrow?: boolean ): Promise<dataImplementations.UserModel>;
}

export interface ChangeEmailAddress { }

export interface ChangePassword {
  ( userId: string, oldPassword: string, newPassword: string, forceThrow?: boolean ): Promise<void>;
}

export interface RequestPasswordResetCode { }

export interface ResetPassword { }

export interface DeleteAccount { }

/******************************************************************************/
