/******************************************************************************/

import * as src from "../src";

import call263Factory from "./call-263";
import coreFactory from "./core";
import grocRoundFactory from "./groc-round";
import powertelFactory from "./powertel";
import routersFactory from "./routers";

/******************************************************************************/

class procedures implements src.procedures {
  constructor(
    readonly call263: src.procedures.Call263,
    readonly core: src.procedures.Core,
    readonly grocRound: src.procedures.GrocRound,
    readonly powertel: src.procedures.Powertel,
    readonly routers: src.procedures.Routers ) { }
}

/******************************************************************************/

export default ( config: src.Config ): src.procedures => {
  return new procedures(
    call263Factory( config ),
    coreFactory( config ),
    grocRoundFactory( config ),
    powertelFactory( config ),
    routersFactory( config ),
  );
}

/******************************************************************************/