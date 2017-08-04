/******************************************************************************/

import * as Promise from "bluebird";
import * as express from "express";

import * as interfaces from "../../../../interfaces/index";

import * as events from "../../../../interfaces/events/utilities/authentication-manager/index";
import * as authenticationManagerInterfaces from "../../../../interfaces/utilities/authentication-manager/index";
import * as eventManagerInterfaces from "../../../../interfaces/setup-config/event-manager/index";

/******************************************************************************/

class AuthenticationManagerEmitter implements authenticationManagerInterfaces.Emitter {

  /*****************************************************************/

  readonly signedIn = ( data: events.SignedInData ) => {

    let event: events.SignedIn = {
      context: "AuthenticationManager",
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
      context: "AuthenticationManager",
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
      context: "AuthenticationManager",
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
      context: "AuthenticationManager",
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
      context: "AuthenticationManager",
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
      context: "AuthenticationManager",
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
      context: "AuthenticationManager",
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
      context: "AuthenticationManager",
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

  constructor( readonly emitEvent: eventManagerInterfaces.Emit ) {}

  /*****************************************************************/

}

/******************************************************************************/

export default ( emitEvent: eventManagerInterfaces.Emit ): authenticationManagerInterfaces.Emitter => {

  return new AuthenticationManagerEmitter( emitEvent );

}

/******************************************************************************/
