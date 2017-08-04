/******************************************************************************/

import * as Promise from "bluebird";

import * as interfaces from "../../../../interfaces/index";
import * as eventManagerInterfaces from "../../../../interfaces/setup-config/event-manager/index";
import * as coreInterfaces from "../../../../interfaces/components/core/index";

/******************************************************************************/

class SharedCode implements coreInterfaces.developer.SharedCode {

  constructor( params: coreInterfaces.developer.sharedCode.Params ) {
    //params.sharedCode;
  }

}

/******************************************************************************/

export default ( config: interfaces.Config, sharedCode: coreInterfaces.SharedCode ): coreInterfaces.developer.SharedCode => {
  return new SharedCode( {
    config : config ,
    sharedCode: sharedCode
  } )
}

/******************************************************************************/

