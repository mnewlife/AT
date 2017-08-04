/******************************************************************************/

import * as Promise from "bluebird";
import * as express from "express";

import * as interfaces from "../../../../../interfaces";

import * as events from "../../../../../interfaces/events/components/core/admin/auth";
import * as authInterfaces from "../../../../../interfaces/components/core/admin/auth";
import * as eventManagerInterfaces from "../../../../../interfaces/setup-config/event-manager";

/******************************************************************************/

class AuthEmitter implements authInterfaces.Emitter {

  /*****************************************************************/

  readonly example = ( data: storageManagerEvents.ExampleData ) => {

    let event: storageManagerEvents.Example = {
      context: "Core|Admin|Auth",
      tags: [],
      identifier: "Example",
      data: {
        user: data.user
      }
    };

    this.emitEvent( event );

    return event;

  }

  /*****************************************************************/

  constructor( readonly emitEvent: eventManagerInterfaces.Emit ) {}

  /*****************************************************************/

}

/******************************************************************************/

export default ( emitEvent: eventManagerInterfaces.Emit ): authInterfaces.Emitter => {
  return new AuthEmitter( emitEvent );
}

/******************************************************************************/
