/******************************************************************************/

import * as Promise from "bluebird";
import * as express from "express";

import * as interfaces from "../../../../../interfaces/index";

import * as events from "../../../../../interfaces/events/components/groc-round/developer/carts/index";
import * as cartsInterfaces from "../../../../../interfaces/components/groc-round/developer/carts/index";
import * as eventManagerInterfaces from "../../../../../interfaces/setup-config/event-manager/index";

/******************************************************************************/

class CartsEmitter implements cartsInterfaces.Emitter {

  /*****************************************************************/

  readonly example = ( data: events.ExampleData ) => {

    let event: events.Example = {
      context: "GrocRound|Developer|Carts",
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

export default ( emitEvent: eventManagerInterfaces.Emit ): cartsInterfaces.Emitter => {
  return new CartsEmitter( emitEvent );
}

/******************************************************************************/
