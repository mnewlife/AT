/******************************************************************************/

import * as express from "express";

import * as interfaces from "../../interfaces";

import developerFactory from "./developer";
import adminFactory from "./admin";
import consumerFactory from "./consumer";

/******************************************************************************/

class Call263 implements interfaces.tasks.Call263 {

  readonly middleware: express.RequestHandler[] = [];

  constructor(
    readonly developer: interfaces.tasks.call263.Developer,
    readonly admin: interfaces.tasks.call263.Admin,
    readonly consumer: interfaces.tasks.call263.Consumer ) { }

}

/******************************************************************************/

export default ( config: interfaces.Config ): interfaces.tasks.Call263 => {
  return new Call263(
    developerFactory( config ),
    adminFactory( config ),
    consumerFactory( config )
  );
};

/******************************************************************************/
