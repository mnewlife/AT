/******************************************************************************/

import * as interfaces from "../../interfaces";
import basicSessionFactory from "./basic";

/******************************************************************************/

export default ( params: {
  emitEvent: interfaces.setupConfig.eventManager.Emit;
  production: boolean;
  checkThrow: interfaces.components.sharedLogic.moders.CheckThrow;
} ): interfaces.components.Session => {
  return basicSessionFactory( {
    emitEvent: params.emitEvent,
    production: params.production,
    checkThrow: params.checkThrow
  } );
}

/******************************************************************************/
