/******************************************************************************/

import * as Promise from "bluebird";
import * as express from "express";

import * as interfaces from "../../../../../interfaces/index";
import * as events from "../../../../../interfaces/events/utilities/shared-logic/middleware/index";
import * as sharedLogicInterfaces from "../../../../../interfaces/utilities/shared-logic/index";
import * as eventManagerInterfaces from "../../../../../interfaces/setup-config/event-manager/index";

/******************************************************************************/

class MiddlewareEmitter implements sharedLogicInterfaces.middleware.Emitter {

  /*****************************************************************/

  readonly retrieveMwareListsFailed = ( data : events.RetrieveMwareListsFailedData ) => {

    let event : events.RetrieveMwareListsFailed = {
      context : "Middleware" ,
      tags : [] ,
      identifier : "RetrieveMwareListsFailed" ,
      data : {
        mware : data.mware ,
        subject : data.subject ,
        subjectModule : data.subjectModule,
        reason : data.reason
      }
    };

    this.emitEvent( event );

    return event;

  }

  /*****************************************************************/

  constructor ( readonly emitEvent : eventManagerInterfaces.Emit ) {}

  /*****************************************************************/

}

/******************************************************************************/

export default ( emitEvent : eventManagerInterfaces.Emit ) : sharedLogicInterfaces.middleware.Emitter => {
  return new MiddlewareEmitter( emitEvent );
}

/******************************************************************************/
