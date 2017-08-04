/******************************************************************************/

import * as interfaces from "../../interfaces";
import commSettings from "./comm-settings";
import basicCommunicationManagerFactory from "./basic";

/******************************************************************************/

export default ( config: interfaces.Config ): interfaces.utilities.CommunicationManager => {
  return basicCommunicationManagerFactory( config, commSettings );
}

/******************************************************************************/
