/******************************************************************************/

import * as express from "express";
import * as Promise from "bluebird";

import * as dataModel from "../../../../data-model";
import * as moders from "../../../../components/helpers/moders/interfaces";

import * as interfaces from "./interfaces";

/******************************************************************************/

export interface Instance {
  readonly cleanUsers: CleanUsers;
}

/******************************************************************************/

export interface Constructor {
  new( checkThrow: moders.CheckThrow ): Instance;
}

/******************************************************************************/

export interface CleanUsers {
  ( users: dataModel.core.user.Super[], forceThrow?: boolean ): Promise<dataModel.core.user.Super[]>;
}

/******************************************************************************/