/******************************************************************************/

import * as http from "http";
import * as express from "express";

import * as setupConfig from "./setup-config";
import * as utilities from "./utilities";
import * as components from "./components";
import * as events from "./events";
import * as dataModel from "./data-model";

/******************************************************************************/

export { setupConfig, utilities, components, events, dataModel };

/******************************************************************************/

export type AppName = "Core" | "Orders";

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
};

/******************************************************************************/

export interface Components {
  core: components.Core;
  orders: components.Orders;
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