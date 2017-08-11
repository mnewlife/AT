/******************************************************************************/

import * as interfaces from "../../interfaces";
import basicResponseFactory from "./basic";

/******************************************************************************/

export default ( emit: interfaces.setupConfig.eventManager.Emit ): interfaces.components.Response => {
  return basicResponseFactory( emit );
}

/******************************************************************************/
