/******************************************************************************/

import * as express from "express";

import * as interfaces from "../../interfaces";

import developerFactory from "./developer";
import adminFactory from "./admin";
import consumerFactory from "./consumer";

/******************************************************************************/

class GrocRound implements interfaces.tasks.GrocRound {

  readonly middleware: express.RequestHandler[] = [];

  constructor(
    readonly developer: interfaces.tasks.grocRound.Developer,
    readonly admin: interfaces.tasks.grocRound.Admin,
    readonly consumer: interfaces.tasks.grocRound.Consumer ) { }

}

/******************************************************************************/

export default ( config: interfaces.Config ): interfaces.tasks.GrocRound => {
  return new GrocRound(
    developerFactory( config ),
    adminFactory( config ),
    consumerFactory( config )
  );
};

/******************************************************************************/
