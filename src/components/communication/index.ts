/******************************************************************************/

import * as src from "../../src";
import commSettings from "./comm-settings";
import basicCommunicationFactory from "./basic";

/******************************************************************************/

export default ( config: src.Config ): src.components.Communication => {
  return basicCommunicationFactory( config, commSettings );
}

/******************************************************************************/
