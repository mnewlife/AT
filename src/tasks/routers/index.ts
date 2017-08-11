/******************************************************************************/

import * as express from "express";

import * as interfaces from "../../interfaces";

import developerFactory from "./developer";
import adminFactory from "./admin";
import consumerFactory from "./consumer";

/******************************************************************************/

class Routers implements interfaces.tasks.Routers {

  readonly middleware: express.RequestHandler[] = [];

  constructor(
    readonly developer: interfaces.tasks.routers.Developer,
    readonly admin: interfaces.tasks.routers.Admin,
    readonly consumer: interfaces.tasks.routers.Consumer ) { }
    
}

/******************************************************************************/

export default ( config: interfaces.Config ): interfaces.tasks.Routers => {
  return new Routers(
    developerFactory( config ),
    adminFactory( config ),
    consumerFactory( config )
  );
};

/******************************************************************************/
