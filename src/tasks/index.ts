/******************************************************************************/

import * as interfaces from "../interfaces";

import call263Factory from "./call-263";
import coreFactory from "./core";
import grocRoundFactory from "./groc-round";
import powertelFactory from "./powertel";
import routersFactory from "./routers";

/******************************************************************************/

class tasks implements interfaces.tasks {
  constructor(
    readonly call263: interfaces.tasks.Call263,
    readonly core: interfaces.tasks.Core,
    readonly grocRound: interfaces.tasks.GrocRound,
    readonly powertel: interfaces.tasks.Powertel,
    readonly routers: interfaces.tasks.Routers ) { }
}

/******************************************************************************/

export default ( config: interfaces.Config ): interfaces.tasks => {
  return new tasks(
    call263Factory( config ),
    coreFactory( config ),
    grocRoundFactory( config ),
    powertelFactory( config ),
    routersFactory( config ),
  );
}

/******************************************************************************/