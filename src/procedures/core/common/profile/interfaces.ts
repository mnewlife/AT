/******************************************************************************/

import * as express from "express";
import * as Promise from "bluebird";

import * as dataModel from "../../../../data-model";
import * as eventListener from "../../../../event-listener";
import * as environment from "../../../../environment";
import * as supportDetails from "../../../../environment/support-details";

import * as authentication from "../../../../components/authentication/interfaces";
import * as storageUser from "../../../../components/storage/interfaces/core/user";
import * as session from "../../../../components/session/interfaces";
import * as mailAgent from "../../../../components/communication/mail-agent/interfaces";
import * as mailTemplates from "../mail-templates/interfaces";
import * as moders from "../../../../components/helpers/moders/interfaces";
import * as numbers from "../../../../components/helpers/numbers/interfaces";

import * as helpers from "../helpers/interfaces";
import * as events from "./events/interfaces";

/******************************************************************************/

export interface Instance {
  readonly getUserDetails: GetUserDetails;
  readonly updateUserDetails: UpdateUserDetails;
  readonly changeEmailAddress: ChangeEmailAddress;
  readonly changePassword: ChangePassword;
  readonly requestPasswordResetCode: RequestPasswordResetCode;
  readonly resetPassword: ResetPassword;
  readonly deleteAccount: DeleteAccount;
}

/******************************************************************************/

export interface Constructor {
  new(
    events: events.Instance,
    checkThrow: moders.CheckThrow,
    cleanUsers: helpers.CleanUsers,
    newEmailAddressTemplate: mailTemplates.NewEmailAddress,
    passwordResetTemplate: mailTemplates.PasswordReset,
    sendEmail: mailAgent.SendEmail,
    authPassword: authentication.AuthPassword,
    createHash: authentication.CreateHashedPassword,
    signedIn: session.SignedIn,
    signOutSession: session.SignOut,
    generateRandomNumber: numbers.GenerateRandomNumber,
    getUserById: storageUser.Instance[ "getById" ],
    updateUserById: storageUser.Instance[ "updateById" ],
    removeUserById: storageUser.Instance[ "removeById" ],
  ): Instance;
}

/******************************************************************************/

export interface GetUserDetails {
  ( userId: string, forceThrow?: boolean ): Promise<dataModel.core.user.Super>;
}

export interface UpdateUserDetails {
  ( userId: string, details: storageUser.UpdateDetails, forceThrow?: boolean ): Promise<dataModel.core.user.Super>
}

export interface ChangeEmailAddress {
  ( userId: string, password: string, newEmailAddress: string, req: express.Request, forceThrow?: boolean ): Promise<void>
}

export interface ChangePassword {
  ( userId: string, oldPassword: string, newPassword: string, forceThrow?: boolean ): Promise<void>
}

export interface RequestPasswordResetCode {
  ( userId: string, forceThrow?: boolean ): Promise<void>
}

export interface ResetPassword {
  ( userId: string, resetCode: string, newPassword: string, forceThrow?: boolean ): Promise<void>
}

export interface DeleteAccount {
  ( userId: string, password: string, forceThrow?: boolean ): Promise<void>
}

/******************************************************************************/