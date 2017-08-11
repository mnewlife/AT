/******************************************************************************/

import * as interfaces from "../../interfaces";
import commSettings from "./comm-settings";
import basicCommunicationFactory from "./basic";

/******************************************************************************/

export default ( config: interfaces.Config ): interfaces.components.Communication => {
  return basicCommunicationFactory( config, commSettings );
}

/******************************************************************************/
