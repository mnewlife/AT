/******************************************************************************/

import * as express from "express";

import * as src from "../../src";

import developer from "./developer";
import admin from "./admin";
import consumer from "./consumer";

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
