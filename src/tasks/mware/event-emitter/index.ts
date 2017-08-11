/******************************************************************************/

import * as events from "../../../../../interfaces/components/shared-logic/middleware/events";
import * as sharedLogicInterfaces from "../../../../../interfaces/components/shared-logic";
import * as eventManagerInterfaces from "../../../../../interfaces/setup-config/event-manager";

/******************************************************************************/

class MiddlewareEmitter implements sharedLogicInterfaces.middleware.Emitter {

  /*****************************************************************/

  readonly retrieveMwareListsFailed = ( data: events.RetrieveMwareListsFailedData ) => {
    let event: events.RetrieveMwareListsFailed = {
      context: "Middleware",
      tags: [],
      identifier: "RetrieveMwareListsFailed",
      data: {
        mware: data.mware,
        subject: data.subject,
        subjectModule: data.subjectModule,
        reason: data.reason
      }
    };
    this.emitEvent( event );
    return event;
  }

  /*****************************************************************/

  constructor( readonly emitEvent: eventManagerInterfaces.Emit ) { }

  /*****************************************************************/

}

/******************************************************************************/

export default ( emitEvent: eventManagerInterfaces.Emit ): sharedLogicInterfaces.middleware.Emitter => {
  return new MiddlewareEmitter( emitEvent );
}

/******************************************************************************/
