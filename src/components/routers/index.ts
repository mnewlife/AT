/******************************************************************************/

import * as interfaces from "../../interfaces";

import developerFactory from "./developer";
import adminFactory from "./admin";
import consumerFactory from "./consumer";

/******************************************************************************/

class Routers implements interfaces.components.Routers {
  constructor(
    readonly developer: interfaces.components.routers.Developer,
    readonly admin: interfaces.components.routers.Admin,
    readonly consumer: interfaces.components.routers.Consumer ) { }
}

/******************************************************************************/

export default ( config: interfaces.Config ): interfaces.components.Routers => {
  return new Routers(
    developerFactory( config ),
    adminFactory( config ),
    consumerFactory( config )
  );
};

/******************************************************************************/
