/******************************************************************************/

import * as interfaces from "../../interfaces";

import developerFactory from "./developer";
import adminFactory from "./admin";
import consumerFactory from "./consumer";

/******************************************************************************/

class Powertel implements interfaces.components.Powertel {
  constructor(
    readonly developer: interfaces.components.powertel.Developer,
    readonly admin: interfaces.components.powertel.Admin,
    readonly consumer: interfaces.components.powertel.Consumer ) { }
}

/******************************************************************************/

export default ( config: interfaces.Config ): interfaces.components.Powertel => {
  return new Powertel(
    developerFactory( config ),
    adminFactory( config ),
    consumerFactory( config )
  );
};

/******************************************************************************/
