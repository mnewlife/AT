/******************************************************************************/

import * as express from "express";

import * as src from "../../src";

import developerFactory from "./developer";
import adminFactory from "./admin";
import consumerFactory from "./consumer";

/******************************************************************************/

class Routers implements src.procedures.Routers {

  readonly middleware: express.RequestHandler[] = [];

  constructor(
    readonly developer: src.procedures.routers.Developer,
    readonly admin: src.procedures.routers.Admin,
    readonly consumer: src.procedures.routers.Consumer ) { }
    
}

/******************************************************************************/

export default ( config: src.Config ): src.procedures.Routers => {
  return new Routers(
    developerFactory( config ),
    adminFactory( config ),
    consumerFactory( config )
  );
};

/******************************************************************************/
