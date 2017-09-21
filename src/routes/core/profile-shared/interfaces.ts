/******************************************************************************/

import * as express from "express";
import * as Promise from "bluebird";

import * as dataModel from "../../../data-model";
import * as root from "../../../interfaces";
import * as storageUser from "../../../components/storage/interfaces/core/user";

/******************************************************************************/

export interface Instance {
  readonly getDetails: GetDetails;
  readonly updateDetails: UpdateDetails;
  readonly changeEmailAddress: ChangeEmailAddress;
  readonly changePassword: ChangePassword;
  readonly requestPasswordResetCode: RequestPasswordResetCode;
  readonly resetPassword: ResetPassword;
  readonly deleteAccount: DeleteAccount;
}

/******************************************************************************/

export interface GetDetails {
  ( appContext: root.CoreView ): express.RequestHandler;
}

export interface UpdateDetails {
  ( appContext: root.CoreView ): express.RequestHandler;
}

export interface ChangeEmailAddress {
  ( appContext: root.CoreView ): express.RequestHandler
}

export interface ChangePassword {
  ( appContext: root.CoreView ): express.RequestHandler
}

export interface RequestPasswordResetCode {
  (): express.RequestHandler
}

export interface ResetPassword {
  (): express.RequestHandler
}

export interface DeleteAccount {
  ( appContext: root.CoreView ): express.RequestHandler
}

/******************************************************************************/
