/******************************************************************************/

import * as express from "express";
import * as Promise from "bluebird";

import * as dataModel from "../../../../data-model";
import * as moders from "../../../../components/helpers/moders/interfaces";

import * as interfaces from "./interfaces";

/******************************************************************************/

export interface Instance {
  readonly newEmailAddress: NewEmailAddress;
  readonly passwordReset: PasswordReset;
}

/******************************************************************************/

export interface Constructor {
  new( checkThrow: moders.CheckThrow, host: string, appName: string ): Instance;
}

/******************************************************************************/

export interface NewEmailAddress {
  ( newEmailAddress: string, verificationCode: string, supportPhoneNumber: string, supportEmailAddress: string, forceThrow?: boolean ): Promise<string>;
}

export interface PasswordReset {
  ( emailAddress: string, resetCode: string, supportPhoneNumber: string, supportEmailAddress: string, forceThrow?: boolean ): Promise<string>;
}

/******************************************************************************/