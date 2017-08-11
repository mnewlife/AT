/******************************************************************************/

import * as express from "express";

import * as interfaces from "../../interfaces";

import developerFactory from "./developer";
import adminFactory from "./admin";
import consumerFactory from "./consumer";

/******************************************************************************/

class Powertel implements interfaces.tasks.Powertel {

  readonly middleware: express.RequestHandler[] = [];

  constructor(
    readonly developer: interfaces.tasks.powertel.Developer,
    readonly admin: interfaces.tasks.powertel.Admin,
    readonly consumer: interfaces.tasks.powertel.Consumer ) { }

}

/******************************************************************************/

export default ( config: interfaces.Config ): interfaces.tasks.Powertel => {
  return new Powertel(
    developerFactory( config ),
    adminFactory( config ),
    consumerFactory( config )
  );
};

/******************************************************************************/
