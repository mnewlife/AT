/******************************************************************************/

import * as interfaces from "../../interfaces";

import developerFactory from "./developer";
import adminFactory from "./admin";
import consumerFactory from "./consumer";

/******************************************************************************/

class Core implements interfaces.components.Core {

  constructor(
    readonly developer: interfaces.components.core.Developer,
    readonly admin: interfaces.components.core.Admin,
    readonly consumer: interfaces.components.core.Consumer
  ) { }

}

/******************************************************************************/

export default ( config: interfaces.Config ): interfaces.components.Core => {
  return new Core(
    developerFactory( config ),
    adminFactory( config ),
    consumerFactory( config )
  );
};

/******************************************************************************/
