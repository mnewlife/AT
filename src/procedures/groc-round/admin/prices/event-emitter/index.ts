/******************************************************************************/

import * as Promise from "bluebird";
import * as express from "express";

import * as src from "../../../../../src";

import * as events from "../../../../../src/procedures/call-263/admin/channels/events";
import * as channelsInterfaces from "../../../../../src/procedures/call-263/admin/channels";
import * as eventManagerInterfaces from "../../../../../src/setup-config/event-manager";

/******************************************************************************/

class ChannelsEvents implements channelsInterfaces.Events {

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

export default ( emitEvent: eventManagerInterfaces.Emit ): channelsInterfaces.Events => {
  return new ChannelsEvents( emitEvent );
}

/******************************************************************************/
