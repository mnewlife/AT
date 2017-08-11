/******************************************************************************/

import * as express from "express";

import * as interfaces from "../../interfaces";

import developerFactory from "./developer";
import adminFactory from "./admin";
import consumerFactory from "./consumer";

/******************************************************************************/

class Core implements interfaces.tasks.Core {
  
  readonly middleware: express.RequestHandler[] = [];

  constructor(
    readonly developer: interfaces.tasks.core.Developer,
    readonly admin: interfaces.tasks.core.Admin,
    readonly consumer: interfaces.tasks.core.Consumer
  ) { }

}

/******************************************************************************/

export default ( config: interfaces.Config ): interfaces.tasks.Core => {
  return new Core(
    developerFactory( config ),
    adminFactory( config ),
    consumerFactory( config )
  );
};

/******************************************************************************/
