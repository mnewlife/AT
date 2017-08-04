/******************************************************************************/

import * as Promise from "bluebird";

import * as interfaces from "../../../interfaces/index";
import * as eventManagerInterfaces from "../../../interfaces/setup-config/event-manager/index";
import * as componentsInterfaces from "../../../interfaces/components/index";

/******************************************************************************/

class SharedCode implements componentsInterfaces.call263.SharedCode {

  constructor( params: componentsInterfaces.call263.sharedCode.Params ) {
    //params.sharedCode;
  }

}

/******************************************************************************/

export default ( config: interfaces.Config, sharedCode: componentsInterfaces.call263.SharedCode ): componentsInterfaces.call263.SharedCode => {
  return new SharedCode( {
    config: config,
    sharedCode: sharedCode
  } )
}

/******************************************************************************/

