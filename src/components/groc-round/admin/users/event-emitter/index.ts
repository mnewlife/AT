/******************************************************************************/

import * as Promise from "bluebird";
import * as express from "express";

import * as interfaces from "../../../../../interfaces/index";

import * as events from "../../../../../interfaces/events/components/groc-round/admin/users/index";
import * as usersInterfaces from "../../../../../interfaces/components/groc-round/admin/users/index";
import * as eventManagerInterfaces from "../../../../../interfaces/setup-config/event-manager/index";

/******************************************************************************/

class UsersEmitter implements usersInterfaces.Emitter {

  /*****************************************************************/

  readonly example = ( data: events.ExampleData ) => {

    let event: events.Example = {
      context: "GrocRound|Admin|Users",
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

export default ( emitEvent: eventManagerInterfaces.Emit ): usersInterfaces.Emitter => {
  return new UsersEmitter( emitEvent );
}

/******************************************************************************/
