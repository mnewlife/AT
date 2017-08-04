/******************************************************************************/

import * as interfaces from "../../interfaces/index";

import basicLogicFactory from "./basic/index";

/******************************************************************************/

export default ( config: interfaces.Config ): interfaces.utilities.SharedLogic => {

  return basicLogicFactory( config );

}

/******************************************************************************/
