/******************************************************************************/

import * as express from "express";

import * as src from "../../src";

import developerFactory from "./developer";
import adminFactory from "./admin";
import consumerFactory from "./consumer";

/******************************************************************************/

class Core implements src.procedures.Core {
  
  readonly middleware: express.RequestHandler[] = [];

  constructor(
    readonly developer: src.procedures.core.Developer,
    readonly admin: src.procedures.core.Admin,
    readonly consumer: src.procedures.core.Consumer
  ) { }

}

/******************************************************************************/

export default ( config: src.Config ): src.procedures.Core => {
  return new Core(
    developerFactory( config ),
    adminFactory( config ),
    consumerFactory( config )
  );
};

/******************************************************************************/
