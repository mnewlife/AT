/******************************************************************************/

import * as http from "http";

import * as interfaces from "../interfaces/index";

import eventManagerFactory from "./event-manager/index";
import environment from "./environment/index";

/******************************************************************************/

class Config implements interfaces.Config {

  /*****************************************************************/

  utilities: interfaces.Utilities;
  components: interfaces.Components;
  server: http.Server;

  eventManager: interfaces.setupConfig.EventManager;

  /*****************************************************************/

  constructor( public readonly environment: interfaces.setupConfig.Environment ) {

    this.eventManager = eventManagerFactory();

  }

  /*****************************************************************/

  readonly registerReferences = ( utilities: interfaces.Utilities, components: interfaces.Components, server: http.Server ): void => {

    this.utilities = utilities;
    this.components = components;
    this.server = server;

    this.eventManager.updateReferences( utilities, components );

  }

  /*****************************************************************/

}

/******************************************************************************/

export default new Config( environment );

/******************************************************************************/
