/******************************************************************************/

import * as express from "express";
import * as Promise from "bluebird";

import * as dataModel from "../../data-model";
import * as interfaces from "../../interfaces";

/******************************************************************************/

export interface Instance {
  readonly setViewContexts: SetViewContexts;
}

/******************************************************************************/

export interface ContextsOutput {
  view: string;
  payload: any;
}

export interface SetViewContexts {
  ( req: express.Request, user?: dataModel.core.user.Super, appContext?: interfaces.AppName, innerContext?: string ): Promise<ContextsOutput>;
}

/******************************************************************************/
