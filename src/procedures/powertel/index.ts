/******************************************************************************/

import * as express from "express";

import * as src from "../../src";

import developer from "./developer";
import admin from "./admin";
import consumer from "./consumer";

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
