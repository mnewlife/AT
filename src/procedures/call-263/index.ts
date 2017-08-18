/******************************************************************************/

import * as express from "express";

import * as src from "../../src";

import developerFactory from "./developer";
import adminFactory from "./admin";
import consumerFactory from "./consumer";

/******************************************************************************/

class Call263 implements src.procedures.Call263 {

  readonly middleware: express.RequestHandler[] = [];

  constructor(
    readonly developer: src.procedures.call263.Developer,
    readonly admin: src.procedures.call263.Admin,
    readonly consumer: src.procedures.call263.Consumer ) { }

}

/******************************************************************************/

export default ( config: src.Config ): src.procedures.Call263 => {
  return new Call263(
    developerFactory( config ),
    adminFactory( config ),
    consumerFactory( config )
  );
};

/******************************************************************************/
