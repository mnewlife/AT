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
  readonly verifyAccount: VerifyAccount;
}

/******************************************************************************/

export interface Constructor {
  new(
    events: events.Instance,
    checkThrow: moders.CheckThrow,
    getUserById: storageUser.Instance[ "getById" ],
    updateUserById: storageUser.Instance[ "updateById" ]
  ): Instance;
}

/******************************************************************************/

export interface VerifyAccount {
  ( userId: string, code: string, forceThrow?: boolean ): Promise<void>;
}

/******************************************************************************/