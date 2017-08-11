/******************************************************************************/

import * as http from "http";

import * as setupConfig from "./setup-config";
import * as utilities from "./utilities";
import * as components from "./components";
import * as dataModel from "./data-model";

/******************************************************************************/

export { setupConfig, utilities, components, dataModel };

/******************************************************************************/

export type AppName = "Core" | "GrocRound" | "Call263" | "Routers" | "Powertel";

/******************************************************************************/

export interface Config {
  utilities: Utilities;
  components: Components;
  server: http.Server;

  eventManager: setupConfig.EventManager;
  environment: setupConfig.Environment;
}

/******************************************************************************/

export interface Utilities {
  sharedLogic: utilities.SharedLogic;
  sessionManager: utilities.SessionManager;
  storageManager: utilities.StorageManager;
  authenticationManager: utilities.AuthenticationManager;
  communicationManager: utilities.CommunicationManager;
  responseManager: utilities.ResponseManager;
  [ index: string ]: Utilities[ keyof Utilities ];
};

/******************************************************************************/

export interface Components {
  core: components.Core;
  grocRound: components.GrocRound;
  call263: components.Call263;
  routers: components.Routers;
  powertel: components.Powertel;
  [ index: string ]: Components[ keyof Components ];
};

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