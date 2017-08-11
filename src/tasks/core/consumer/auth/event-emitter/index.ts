/******************************************************************************/

import * as Promise from "bluebird";
import * as express from "express";

import * as interfaces from "../../../../../interfaces";

import * as events from "../../../../../interfaces/tasks/call-263/admin/channels/events";
import * as channelsInterfaces from "../../../../../interfaces/tasks/call-263/admin/channels";
import * as eventManagerInterfaces from "../../../../../interfaces/setup-config/event-manager";

/******************************************************************************/

class ChannelsEmitter implements channelsInterfaces.Emitter {

  /*****************************************************************/

  readonly example = ( data: events.ExampleData ) => {
    let event: events.Example = {
      context: "Core|Admin|Admins",
      tags: [],
      identifier: "Example",
      data: {}
    };
    this.emitEvent( event );
    return event;
  }

  /*****************************************************************/

  constructor( readonly emitEvent: eventManagerInterfaces.Emit ) { }

  /*****************************************************************/

}

/******************************************************************************/

export default ( emitEvent: eventManagerInterfaces.Emit ): channelsInterfaces.Emitter => {
  return new ChannelsEmitter( emitEvent );
}

/******************************************************************************/
