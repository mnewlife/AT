/******************************************************************************/

import * as interfaces from "../../interfaces/index";

import basicResponseManagerFactory from "./basic/index";

/******************************************************************************/

export default ( config: interfaces.Config ): interfaces.utilities.ResponseManager => {

  return basicResponseManagerFactory( config );

}

/******************************************************************************/
