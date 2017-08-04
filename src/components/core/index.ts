/******************************************************************************/

import * as interfaces from "../../interfaces/index";

import developerFactory from "./developer/index";
import adminFactory from "./admin/index";
import consumerFactory from "./consumer/index";
import sharedCodeFactory from "./shared-code/index";

/******************************************************************************/

class Core implements interfaces.components.Core {

  readonly developer: interfaces.components.core.Developer;
  readonly admin: interfaces.components.core.Admin;
  readonly consumer: interfaces.components.core.Consumer;

  constructor( params: interfaces.components.core.Params ) {
    this.developer = params.developer;
    this.admin = params.admin;
    this.consumer = params.consumer;
  }

}

/******************************************************************************/

export default ( config: interfaces.Config, sharedCode: interfaces.components.SharedCode ): interfaces.components.Core => {
  let localSharedCode = sharedCodeFactory( config, sharedCode );
  return new Core( {
    developer: developerFactory( config, localSharedCode ),
    admin: adminFactory( config, localSharedCode ),
    consumer: consumerFactory( config, localSharedCode )
  } );
};

/******************************************************************************/
