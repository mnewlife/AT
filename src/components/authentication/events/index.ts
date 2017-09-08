/******************************************************************************/

import * as eventListener from "../../../event-listener/interfaces";

import * as interfaces from "./interfaces";

/******************************************************************************/

export default class Events implements interfaces.Instance {

  /*****************************************************************/

  constructor( readonly emitEvent: eventListener.Emit ) { }

  /*****************************************************************/

  readonly signedIn = ( data: interfaces.SignedInData ) => {
    let event: interfaces.SignedIn = {
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

  readonly signInFailed = ( data: interfaces.SignInFailedData ) => {
    let event: interfaces.SignInFailed = {
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

  readonly invalidPassword = ( data: interfaces.InvalidPasswordData ) => {
    let event: interfaces.InvalidPassword = {
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

  readonly signedOut = ( data: interfaces.SignedOutData ) => {
    let event: interfaces.SignedOut = {
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

  readonly signOutFailed = ( data: interfaces.SignOutFailedData ) => {
    let event: interfaces.SignOutFailed = {
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

  readonly getCurrentUserFailed = ( data: interfaces.GetCurrentUserFailedData ) => {
    let event: interfaces.GetCurrentUserFailed = {
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

  readonly createHashedPasswordFailed = ( data: interfaces.CreateHashedPasswordFailedData ) => {
    let event: interfaces.CreateHashedPasswordFailed = {
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

  readonly authPasswordFailed = ( data: interfaces.AuthPasswordFailedData ) => {
    let event: interfaces.AuthPasswordFailed = {
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

}

/******************************************************************************/
