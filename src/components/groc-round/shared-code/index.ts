/******************************************************************************/

import * as Promise from "bluebird";

import * as interfaces from "../../../interfaces/index";
import * as eventManagerInterfaces from "../../../interfaces/setup-config/event-manager/index";
import * as grocRoundInterfaces from "../../../interfaces/components/groc-round/index";

/******************************************************************************/

class SharedCode implements grocRoundInterfaces.SharedCode {

  constructor( params: grocRoundInterfaces.sharedCode.Params ) {
    //params.sharedCode;
  }

}

/******************************************************************************/

export default ( config: interfaces.Config, sharedCode: grocRoundInterfaces.SharedCode ): grocRoundInterfaces.SharedCode => {
  return new SharedCode( {
    config: config,
    sharedCode: sharedCode
  } )
}

/******************************************************************************/

