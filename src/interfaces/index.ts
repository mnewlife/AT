/******************************************************************************/

import * as http from "http";
import * as express from "express";

import * as setupConfig from "./setup-config/index";
import * as utilities from "./utilities/index";
import * as components from "./components/index";
import * as events from "./events/index";
import * as dataModel from "./data-model/index";

/******************************************************************************/

export { setupConfig, utilities, components, events, dataModel };

/******************************************************************************/

export type AppName = "Core" | "Call263" | "Grocound";

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

  [ index: string ]: any;
};

/******************************************************************************/

export interface Components {
  core: components.Core;
  call263: components.Call263;
  grocRound: components.GrocRound;

  [ index: string ]: any;
};

/******************************************************************************/
