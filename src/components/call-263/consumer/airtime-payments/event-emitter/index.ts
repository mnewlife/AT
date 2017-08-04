/******************************************************************************/

import * as Promise from "bluebird";
import * as express from "express";

import * as interfaces from "../../../../../interfaces";

import * as events from "../../../../../interfaces/events/components/core/consumer/profile";
import * as profileInterfaces from "../../../../../interfaces/components/core/consumer/profile";
import * as eventManagerInterfaces from "../../../../../interfaces/setup-config/event-manager";

/******************************************************************************/

class ProfileEmitter implements profileInterfaces.Emitter {

  /*****************************************************************/

  readonly example = ( data: storageManagerEvents.ExampleData ) => {

    let event: storageManagerEvents.Example = {
      context: "Core|Consumer|Profile",
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

export default ( emitEvent: eventManagerInterfaces.Emit ): profileInterfaces.Emitter => {
  return new ProfileEmitter( emitEvent );
}

/******************************************************************************/
