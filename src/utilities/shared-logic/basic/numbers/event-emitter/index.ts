/******************************************************************************/

import * as Promise from "bluebird";
import * as express from "express";

import * as interfaces from "../../../../../interfaces/index";
import * as events from "../../../../../interfaces/events/utilities/shared-logic/numbers/index";
import * as sharedLogicInterfaces from "../../../../../interfaces/utilities/shared-logic/index";
import * as eventManagerInterfaces from "../../../../../interfaces/setup-config/event-manager/index";

/******************************************************************************/

class NumbersEmitter implements sharedLogicInterfaces.numbers.Emitter {

  /*****************************************************************/

  readonly generateRandomNumberFailed = ( params : events.GenerateRandomNumberFailedData ) => {

    let event : events.GenerateRandomNumberFailed = {
      context : "Numbers" ,
      tags : [] ,
      identifier : "GenerateRandomNumberFailed" ,
      data : {
        min : params.min ,
        max : params.max ,
        reason : params.reason
      }
    };

    this.emitEvent( event );

    return event;

  }

  /*****************************************************************/

  constructor ( readonly emitEvent : interfaces.setupConfig.eventManager.Emit ) {}

  /*****************************************************************/

}

/******************************************************************************/

export default ( emitEvent : eventManagerInterfaces.Emit ) : sharedLogicInterfaces.numbers.Emitter => {
  return new NumbersEmitter( emitEvent );
}

/******************************************************************************/
