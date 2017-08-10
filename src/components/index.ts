/******************************************************************************/

import * as interfaces from "../interfaces";

import call263Factory from "./call-263";
import coreFactory from "./core";
import grocRoundFactory from "./groc-round";
import powertelFactory from "./powertel";
import routersFactory from "./routers";

/******************************************************************************/

class Components implements interfaces.Components {
  constructor(
    readonly call263: interfaces.components.Call263,
    readonly core: interfaces.components.Core,
    readonly grocRound: interfaces.components.GrocRound,
    readonly powertel: interfaces.components.Powertel,
    readonly routers: interfaces.components.Routers ) { }
}

/******************************************************************************/

export default ( config: interfaces.Config ): interfaces.Components => {
  return new Components(
    call263Factory( config ),
    coreFactory( config ),
    grocRoundFactory( config ),
    powertelFactory( config ),
    routersFactory( config ),
  );
}

/******************************************************************************/

