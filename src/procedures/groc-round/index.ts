/******************************************************************************/

import * as express from "express";

import * as src from "../../src";

import developerFactory from "./developer";
import adminFactory from "./admin";
import consumerFactory from "./consumer";

/******************************************************************************/

class GrocRound implements src.procedures.GrocRound {

  readonly middleware: express.RequestHandler[] = [];

  constructor(
    readonly developer: src.procedures.grocRound.Developer,
    readonly admin: src.procedures.grocRound.Admin,
    readonly consumer: src.procedures.grocRound.Consumer ) { }

}

/******************************************************************************/

export default ( config: src.Config ): src.procedures.GrocRound => {
  return new GrocRound(
    developerFactory( config ),
    adminFactory( config ),
    consumerFactory( config )
  );
};

/******************************************************************************/
