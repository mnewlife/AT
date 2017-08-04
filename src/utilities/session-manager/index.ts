/******************************************************************************/

import * as interfaces from "../../interfaces/index";

import basicSessionManagerFactory from "./basic/index";

/******************************************************************************/

export default ( config: interfaces.Config ): interfaces.utilities.SessionManager => {

  return basicSessionManagerFactory( config );

}

/******************************************************************************/
