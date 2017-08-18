/******************************************************************************/

import * as src from "../../src";
import basicSessionFactory from "./basic";

/******************************************************************************/

export default ( params: {
  emitEvent: src.setupConfig.eventManager.Emit;
  production: boolean;
  checkThrow: src.components.sharedLogic.moders.CheckThrow;
} ): src.components.Session => {
  return basicSessionFactory( {
    emitEvent: params.emitEvent,
    production: params.production,
    checkThrow: params.checkThrow
  } );
}

/******************************************************************************/
