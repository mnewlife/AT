/******************************************************************************/

import * as express from "express";

import * as src from "../../src";

import developerFactory from "./developer";
import adminFactory from "./admin";
import consumerFactory from "./consumer";

/******************************************************************************/

class Powertel implements src.procedures.Powertel {

  readonly middleware: express.RequestHandler[] = [];

  constructor(
    readonly developer: src.procedures.powertel.Developer,
    readonly admin: src.procedures.powertel.Admin,
    readonly consumer: src.procedures.powertel.Consumer ) { }

}

/******************************************************************************/

export default ( config: src.Config ): src.procedures.Powertel => {
  return new Powertel(
    developerFactory( config ),
    adminFactory( config ),
    consumerFactory( config )
  );
};

/******************************************************************************/
