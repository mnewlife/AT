/******************************************************************************/

import * as interfaces from "../../interfaces/index";
import * as eventManagerInterfaces from "../../interfaces/setup-config/event-manager/index";
import * as componentsInterfaces from "../../interfaces/components/index";

import developerFactory from "./developer/index";
import adminFactory from "./admin/index";
import consumerFactory from "./consumer/index";

import sharedCodeFactory from "./shared-code/index";

/******************************************************************************/

class Call263 implements componentsInterfaces.Call263 {

  readonly developer: componentsInterfaces.call263.Developer;
  readonly admin: componentsInterfaces.call263.Admin;
  readonly consumer: componentsInterfaces.call263.Consumer;

  constructor( params: componentsInterfaces.call263.Params ) {
    this.developer = params.developer;
    this.admin = params.admin;
    this.consumer = params.consumer;
  }

}

/******************************************************************************/

export default ( config: interfaces.Config, sharedCode: componentsInterfaces.SharedCode ): componentsInterfaces.Call263 => {
  return new Call263( {
    developer: developerFactory( config, sharedCodeFactory( config, sharedCode ) ),
    admin: adminFactory( config, sharedCodeFactory( config, sharedCode ) ),
    consumer: consumerFactory( config, sharedCodeFactory( config, sharedCode ) )
  } );
}

/******************************************************************************/

