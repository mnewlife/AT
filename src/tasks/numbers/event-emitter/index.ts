/******************************************************************************/

import * as interfaces from "../../../../../interfaces";
import * as events from "../../../../../interfaces/components/shared-logic/numbers/events";
import * as sharedLogicInterfaces from "../../../../../interfaces/components/shared-logic";
import * as eventManagerInterfaces from "../../../../../interfaces/setup-config/event-manager";

/******************************************************************************/

class NumbersEmitter implements sharedLogicInterfaces.numbers.Emitter {

  /*****************************************************************/

  readonly generateRandomNumberFailed = ( params: events.GenerateRandomNumberFailedData ) => {
    let event: events.GenerateRandomNumberFailed = {
      context: "Numbers",
      tags: [],
      identifier: "GenerateRandomNumberFailed",
      data: {
        min: params.min,
        max: params.max,
        reason: params.reason
      }
    };
    this.emitEvent( event );
    return event;
  }

  /*****************************************************************/

  constructor( readonly emitEvent: interfaces.setupConfig.eventManager.Emit ) { }

  /*****************************************************************/

}

/******************************************************************************/

export default ( emitEvent: eventManagerInterfaces.Emit ): sharedLogicInterfaces.numbers.Emitter => {
  return new NumbersEmitter( emitEvent );
}

/******************************************************************************/
