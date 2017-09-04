/******************************************************************************/

import * as dataModel from "../../../data-model";
import * as EventListener from "../../../event-listener/interfaces";
import * as Session from "../../session/interfaces";

import * as interfaces from "./interfaces";

/******************************************************************************/

export default class Events implements interfaces.ClassInstance {

  /*****************************************************************/

  constructor( private readonly emitEvent: EventListener.Emit ) { }

  /*****************************************************************/

  readonly setCurrentUser = ( data: interfaces.SetCurrentUserData ) => {
    let event: interfaces.SetCurrentUser = {
      context: "Session",
      tags: [],
      identifier: "SetCurrentUser",
      data: {
        userId: data.userId,
        req: data.req
      }
    };
    this.emitEvent( event );
    return event;
  }

  /*****************************************************************/

  readonly setCurrentUserFailed = ( data: interfaces.SetCurrentUserFailedData ) => {
    let event: interfaces.SetCurrentUserFailed = {
      context: "Session",
      tags: [],
      identifier: "SetCurrentUserFailed",
      data: {
        userId: data.userId,
        req: data.req,
        reason: data.reason
      }
    };
    this.emitEvent( event );
    return event;
  }

  /*****************************************************************/
  
  readonly noCurrentUser = ( data: interfaces.NoCurrentUserData ) => {
    let event: interfaces.NoCurrentUser = {
      context: "Session",
      tags: [],
      identifier: "NoCurrentUser",
      data: {
        req: data.req
      }
    };
    this.emitEvent( event );
    return event;
  }

  /*****************************************************************/

  readonly getCurrentUserFailed = ( data: interfaces.GetCurrentUserFailedData ) => {
    let event: interfaces.GetCurrentUserFailed = {
      context: "Session",
      tags: [],
      identifier: "GetCurrentUserFailed",
      data: {
        req: data.req,
        reason: data.reason
      }
    };
    this.emitEvent( event );
    return event;
  }

  /*****************************************************************/

  readonly signOutFailed = ( data: interfaces.SignOutFailedData ) => {
    let event: interfaces.SignOutFailed = {
      context: "Session",
      tags: [],
      identifier: "SignOutFailed",
      data: {
        req: data.req,
        reason: data.reason
      }
    };
    this.emitEvent( event );
    return event;
  }

  /*****************************************************************/

}

/******************************************************************************/