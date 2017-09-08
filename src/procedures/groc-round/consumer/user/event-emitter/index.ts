/******************************************************************************/

import * as Promise from "bluebird";
import * as express from "express";

import * as src from "../../../../../src";

import * as events from "../../../../../src/procedures/call-263/admin/channels/events";
import * as channels from "../../../../../src/procedures/call-263/admin/channels";
import * as eventListener from "../../../../../src/event-listener";

/******************************************************************************/

class ChannelsEvents implements channels.Events {

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

  constructor( readonly emitEvent: eventListener.Emit ) { }

  /*****************************************************************/

}

/******************************************************************************/

export default ( emitEvent: eventListener.Emit ): channels.Events => {
  return new ChannelsEvents( emitEvent );
}

/******************************************************************************/
