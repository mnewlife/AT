/******************************************************************************/

import * as interfaces from "../../interfaces";

import developerFactory from "./developer";
import adminFactory from "./admin";
import consumerFactory from "./consumer";

/******************************************************************************/

class GrocRound implements interfaces.components.GrocRound {
  constructor(
    readonly developer: interfaces.components.grocRound.Developer,
    readonly admin: interfaces.components.grocRound.Admin,
    readonly consumer: interfaces.components.grocRound.Consumer ) { }
}

/******************************************************************************/

export default ( config: interfaces.Config ): interfaces.components.GrocRound => {
  return new GrocRound(
    developerFactory( config ),
    adminFactory( config ),
    consumerFactory( config )
  );
};

/******************************************************************************/
