/******************************************************************************/

import * as src from "../../src";
import basicResponseFactory from "./basic";

/******************************************************************************/

export default ( emit: src.setupConfig.eventManager.Emit ): src.components.Response => {
  return basicResponseFactory( emit );
}

/******************************************************************************/
