/******************************************************************************/

import * as interfaces from "../../interfaces";
import basicLogicFactory from "./basic";

/******************************************************************************/

export default ( emit: interfaces.setupConfig.eventManager.Emit ): interfaces.utilities.SharedLogic => {
  return basicLogicFactory( emit );
}

/******************************************************************************/
