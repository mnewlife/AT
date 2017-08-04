/******************************************************************************/

import * as Promise from "bluebird";

import * as interfaces from "../../interfaces/index";
import * as eventManagerInterfaces from "../../interfaces/setup-config/event-manager/index";

/******************************************************************************/

class SharedCode implements interfaces.components.SharedCode {

  constructor( params: interfaces.components.sharedCode.Params ) {
    //params.sharedCode;
  }

  

}

/******************************************************************************/

export default ( config: interfaces.Config ): interfaces.components.SharedCode => {
  return new SharedCode( {
    config: config
  } );
}

/******************************************************************************/

