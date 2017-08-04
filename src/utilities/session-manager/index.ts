/******************************************************************************/

import * as interfaces from "../../interfaces";
import basicSessionManagerFactory from "./basic";

/******************************************************************************/

export default ( params: {
  emitEvent: interfaces.setupConfig.eventManager.Emit;
  production: boolean;
  checkThrow: interfaces.utilities.sharedLogic.moders.CheckThrow;
} ): interfaces.utilities.SessionManager => {
  return basicSessionManagerFactory( {
    emitEvent: params.emitEvent,
    production: params.production,
    checkThrow: params.checkThrow
  } );
}

/******************************************************************************/
