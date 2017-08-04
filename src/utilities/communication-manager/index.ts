/******************************************************************************/

import * as interfaces from "../../interfaces/index";

import commSettings from "./comm-settings/index";
import basicCommunicationManagerFactory from "./basic/index";

/******************************************************************************/

export default ( config: interfaces.Config ): interfaces.utilities.CommunicationManager => {

  return basicCommunicationManagerFactory( config, commSettings );

}

/******************************************************************************/
