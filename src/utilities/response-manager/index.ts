/******************************************************************************/

import * as interfaces from "../../interfaces";
import basicResponseManagerFactory from "./basic";

/******************************************************************************/

export default ( emit: interfaces.setupConfig.eventManager.Emit ): interfaces.utilities.ResponseManager => {
  return basicResponseManagerFactory( emit );
}

/******************************************************************************/
