/******************************************************************************/

import * as interfaces from "../interfaces/index";

import coreFactory from "./core/index";
import call263Factory from "./call-263/index";
import grocRoundFactory from "./groc-round/index";

import sharedCodeFactory from "./shared-code/index";

/******************************************************************************/

class Components implements interfaces.Components {

  readonly core: interfaces.components.Core;
  readonly call263: interfaces.components.Call263;
  readonly grocRound: interfaces.components.GrocRound;

  constructor( core: interfaces.components.Core, call263: interfaces.components.Call263, grocRound: interfaces.components.GrocRound ) {
    this.core = core;
    this.call263 = call263;
    this.grocRound = grocRound;
  }

}

/******************************************************************************/

export default ( config: interfaces.Config ): interfaces.Components => {
  let localSharedCode = sharedCodeFactory( config );
  return new Components(
    coreFactory( config, localSharedCode ),
    call263Factory( config, localSharedCode ),
    grocRoundFactory( config, localSharedCode )
  );
}

/******************************************************************************/
