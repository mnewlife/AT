/******************************************************************************/

import * as Promise from "bluebird";

import * as interfaces from "../../../../interfaces/index";
import * as eventManagerInterfaces from "../../../../interfaces/setup-config/event-manager/index";
import * as grocRoundInterfaces from "../../../../interfaces/components/groc-round/index";

/******************************************************************************/

class SharedCode implements grocRoundInterfaces.consumer.SharedCode {

  constructor( params: grocRoundInterfaces.consumer.sharedCode.Params ) {
    //params.sharedCode;
  }

}

/******************************************************************************/

export default ( config: interfaces.Config, sharedCode: grocRoundInterfaces.SharedCode ): grocRoundInterfaces.consumer.SharedCode => {
  return new SharedCode( {
    config : config ,
    sharedCode: sharedCode
  } )
}

/******************************************************************************/

