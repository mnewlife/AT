/******************************************************************************/

import * as events from "../../../../src/components/authentication/events";
import * as authentication from "../../../../src/components/authentication";
import * as eventManager from "../../../../src/setup-config/event-manager";

/******************************************************************************/

class AuthenticationEvents implements authentication.Events {

  /*****************************************************************/

  readonly signedIn = ( data: events.SignedInData ) => {
    let event: events.SignedIn = {
      context: "Authentication",
      tags: [],
      identifier: "SignedIn",
      data: {
        user: data.user
      }
    };
    this.emitEvent( event );
    return event;
  }

  /*****************************************************************/

  readonly signInFailed = ( data: events.SignInFailedData ) => {
    let event: events.SignInFailed = {
      context: "Authentication",
      tags: [],
      identifier: "SignInFailed",
      data: {
        emailAddress: data.emailAddress,
        reason: data.reason
      }
    };
    this.emitEvent( event );
    return event;
  }

  /*****************************************************************/

  readonly invalidPassword = ( data: events.InvalidPasswordData ) => {
    let event: events.InvalidPassword = {
      context: "Authentication",
      tags: [],
      identifier: "InvalidPassword",
      data: {
        emailAddress: ( data.emailAddress ) ? data.emailAddress : "",
        userId: ( data.userId ) ? data.userId : "",
        password: data.password
      }
    };
    this.emitEvent( event );
    return event;
  }

  /*****************************************************************/

  readonly signedOut = ( data: events.SignedOutData ) => {
    let event: events.SignedOut = {
      context: "Authentication",
      tags: [],
      identifier: "SignedOut",
      data: {
        userId: data.userId
      }
    };
    this.emitEvent( event );
    return event;
  }

  /*****************************************************************/

  readonly signOutFailed = ( data: events.SignOutFailedData ) => {
    let event: events.SignOutFailed = {
      context: "Authentication",
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

  readonly getCurrentUserFailed = ( data: events.GetCurrentUserFailedData ) => {
    let event: events.GetCurrentUserFailed = {
      context: "Authentication",
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

  readonly createHashedPasswordFailed = ( data: events.CreateHashedPasswordFailedData ) => {
    let event: events.CreateHashedPasswordFailed = {
      context: "Authentication",
      tags: [],
      identifier: "CreateHashedPasswordFailed",
      data: {
        password: data.password,
        reason: data.password
      }
    };
    this.emitEvent( event );
    return event;
  }

  /*****************************************************************/

  readonly authPasswordFailed = ( data: events.AuthPasswordFailedData ) => {
    let event: events.AuthPasswordFailed = {
      context: "Authentication",
      tags: [],
      identifier: "AuthPasswordFailed",
      data: {
        userId: data.userId,
        password: data.password,
        reason: data.reason
      }
    };
    this.emitEvent( event );
    return event;
  }

  /*****************************************************************/

  constructor( readonly emitEvent: eventManager.Emit ) { }

  /*****************************************************************/

}

/******************************************************************************/

export default ( emitEvent: eventManager.Emit ): authentication.Events => {
  return new AuthenticationEvents( emitEvent );
}

/******************************************************************************/
