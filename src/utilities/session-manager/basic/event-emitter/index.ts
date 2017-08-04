/******************************************************************************/

import * as Promise from "bluebird";
import * as express from "express";

import * as interfaces from "../../../../interfaces";
import * as events from "../../../../interfaces/utilities/session-manager/events";
import * as sessionManagerInterfaces from "../../../../interfaces/utilities/session-manager";
import * as eventManagerInterfaces from "../../../../interfaces/setup-config/event-manager";

/******************************************************************************/

class SessionManagerEmitter implements sessionManagerInterfaces.Emitter {

  /*****************************************************************/

  readonly setCurrentUser = ( params: events.SetCurrentUserData ) => {

    let event: events.SetCurrentUser = {
      context: "SessionManager",
      tags: [],
      identifier: "SetCurrentUser",
      data: {
        user: params.user,
        req: params.req
      }
    };

    this.emitEvent( event );

    return event;

  }

  /*****************************************************************/

  readonly setCurrentUserFailed = ( params: events.SetCurrentUserFailedData ) => {

    let event: events.SetCurrentUserFailed = {
      context: "SessionManager",
      tags: [],
      identifier: "SetCurrentUserFailed",
      data: {
        user: params.user,
        req: params.req,
        reason: params.reason
      }
    };

    this.emitEvent( event );

    return event;

  }

  /*****************************************************************/

  readonly noCurrentUser = ( params: events.NoCurrentUserData ) => {

    let event: events.NoCurrentUser = {
      context: "SessionManager",
      tags: [],
      identifier: "NoCurrentUser",
      data: {
        req: params.req
      }
    };

    this.emitEvent( event );

    return event;

  }

  /*****************************************************************/

  readonly getCurrentUserFailed = ( params: events.GetCurrentUserFailedData ) => {

    let event: events.GetCurrentUserFailed = {
      context: "SessionManager",
      tags: [],
      identifier: "GetCurrentUserFailed",
      data: {
        req: params.req,
        reason: params.reason
      }
    };

    this.emitEvent( event );

    return event;

  }

  /*****************************************************************/

  readonly signOutFailed = ( params: events.SignOutFailedData ) => {

    let event: events.SignOutFailed = {
      context: "SessionManager",
      tags: [],
      identifier: "SignOutFailed",
      data: {
        req: params.req,
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

export default ( emitEvent: eventManagerInterfaces.Emit ): sessionManagerInterfaces.Emitter => {

  return new SessionManagerEmitter( emitEvent );

}

/******************************************************************************/
