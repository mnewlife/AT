/******************************************************************************/

import * as interfaces from "../../interfaces";

import developerFactory from "./developer";
import adminFactory from "./admin";
import consumerFactory from "./consumer";

/******************************************************************************/

class Call263 implements interfaces.components.Call263 {
  constructor(
    readonly developer: interfaces.components.call263.Developer,
    readonly admin: interfaces.components.call263.Admin,
    readonly consumer: interfaces.components.call263.Consumer ) { }
}

/******************************************************************************/

export default ( config: interfaces.Config ): interfaces.components.Call263 => {
  return new Call263(
    developerFactory( config ),
    adminFactory( config ),
    consumerFactory( config )
  );
};

/******************************************************************************/
