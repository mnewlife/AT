/******************************************************************************/

import * as http from "http";

import * as interfaces from "../interfaces";

import eventManagerFactory from "./event-manager";
import environment from "./environment";

/******************************************************************************/

class Config implements interfaces.Config {

  /*****************************************************************/

  components: interfaces.components;
  tasks: interfaces.tasks;
  server: http.Server;

  eventManager: interfaces.setupConfig.EventManager;

  /*****************************************************************/

  constructor( public readonly environment: interfaces.setupConfig.Environment ) {

    this.eventManager = eventManagerFactory();

  }

  /*****************************************************************/

  readonly registerReferences = ( components: interfaces.components, tasks: interfaces.tasks, server: http.Server ): void => {

    this.components = components;
    this.tasks = tasks;
    this.server = server;

    this.eventManager.updateReferences( components, tasks );

  }

  /*****************************************************************/

}

/******************************************************************************/

export default new Config( environment );

/******************************************************************************/
