/******************************************************************************/

import * as interfaces from "../../interfaces/index";

import developerFactory from "./developer/index";
import adminFactory from "./admin/index";
import consumerFactory from "./consumer/index";
import sharedCodeFactory from "./shared-code/index";

/******************************************************************************/

class GrocRound implements interfaces.components.GrocRound {

  readonly developer: interfaces.components.grocRound.Developer;
  readonly admin: interfaces.components.grocRound.Admin;
  readonly consumer: interfaces.components.grocRound.Consumer;

  constructor( params: interfaces.components.grocRound.Params ) {
    this.developer = params.developer;
    this.admin = params.admin;
    this.consumer = params.consumer;
  }

}

/******************************************************************************/

export default ( config: interfaces.Config, sharedCode: interfaces.components.SharedCode ): interfaces.components.GrocRound => {
  let localSharedCode = sharedCodeFactory( config, sharedCode );
  return new GrocRound( {
    developer: developerFactory( config, localSharedCode ),
    admin: adminFactory( config, localSharedCode ),
    consumer: consumerFactory( config, localSharedCode )
  } );
};

/******************************************************************************/
