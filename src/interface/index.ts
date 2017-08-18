/******************************************************************************/

import * as http from "http";
import * as express from "express";

import * as setupConfig from "./setup-config";
import * as components from "./components";
import * as procedures from "./procedures";
import * as dataModel from "./data-model";

/******************************************************************************/

export { setupConfig, components, procedures, dataModel };

/******************************************************************************/

export type AppName = "Core" | "GrocRound" | "Call263" | "Routers" | "Powertel";

/******************************************************************************/

export interface Config {
  components: Components;
  procedures: Procedures;
  server: http.Server;

  eventManager: setupConfig.EventManager;
  environment: setupConfig.Environment;
}

/******************************************************************************/

export interface Components {
  session: components.Session;
  storage: components.Storage;
  authentication: components.Authentication;
  communication: components.Communication;
  response: components.Response;
  [ index: string ]: Components[ keyof Components ];
};

/******************************************************************************/

export interface Procedures {
  core: procedures.Core;
  grocRound: procedures.GrocRound;
  call263: procedures.Call263;
  routers: procedures.Routers;
  powertel: procedures.Powertel;
  [ index: string ]: Procedures[ keyof Procedures ];
};

/******************************************************************************/

export interface AppMiddleware {
  [ index: string ]: express.RequestHandler[];
}

/******************************************************************************/

type PartialDeep<T> = {
  [ P in keyof T ]?: PartialDeep<T[ P ]>;
}
type PartialRestoreArrays<K> = {
  [ P in keyof K ]?: K[ P ];
}
export type DeepPartial<T, K> = PartialDeep<T> & PartialRestoreArrays<K>;

export type Any<T> = {
  [ P in keyof T ]: any;
}

export type Nullable<T> = {
  [ P in keyof T ]: T[ P ] | null;
}

/******************************************************************************/