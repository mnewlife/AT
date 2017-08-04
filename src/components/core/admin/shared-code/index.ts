/******************************************************************************/

import * as Promise from "bluebird";

import * as interfaces from "../../../../interfaces/index";
import * as eventManagerInterfaces from "../../../../interfaces/setup-config/event-manager/index";
import * as coreInterfaces from "../../../../interfaces/components/core/index";

/******************************************************************************/

class SharedCode implements coreInterfaces.admin.SharedCode {

  readonly verification: coreInterfaces.admin.sharedCode.Verification;

  constructor( params: coreInterfaces.admin.sharedCode.Params ) {
    this.verification = params.verification;
  }

}

/******************************************************************************/

export default ( config: interfaces.Config, sharedCode: coreInterfaces.SharedCode ): coreInterfaces.admin.SharedCode => {
  return new SharedCode( {
    verification: sharedCode.verification
  } )
}

/******************************************************************************/

