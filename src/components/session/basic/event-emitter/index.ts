/******************************************************************************/

import * as Promise from "bluebird";
import * as express from "express";

import * as interfaces from "../../../../interfaces";
import * as events from "../../../../interfaces/components/session/events";
import * as sessionInterfaces from "../../../../interfaces/components/session";
import * as eventManagerInterfaces from "../../../../interfaces/setup-config/event-manager";

/******************************************************************************/

class SessionEmitter implements sessionInterfaces.Emitter {

  /*****************************************************************/

  readonly setCurrentUser = ( params: events.SetCurrentUserData ) => {

    let event: events.SetCurrentUser = {
      context: "Session",
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
      context: "Session",
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
      context: "Session",
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
      context: "Session",
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
      context: "Session",
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

export default ( emitEvent: eventManagerInterfaces.Emit ): sessionInterfaces.Emitter => {

  return new SessionEmitter( emitEvent );

}

/******************************************************************************/
