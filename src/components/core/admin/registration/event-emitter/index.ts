/******************************************************************************/

import * as Promise from "bluebird";
import * as express from "express";

import * as interfaces from "../../../../../interfaces/index";

import * as events from "../../../../../interfaces/events/components/core/admin/registration/index";
import * as registrationInterfaces from "../../../../../interfaces/components/core/admin/registration/index";
import * as eventManagerInterfaces from "../../../../../interfaces/setup-config/event-manager/index";

/******************************************************************************/

class RegistrationEmitter implements registrationInterfaces.Emitter {

  /*****************************************************************/

  readonly addedAdmin = ( data: events.AddedAdminData ) => {

    let event: events.AddedAdmin = {
      context: "Core|Admin|Registration",
      tags: [],
      identifier: "AddedAdmin",
      data: {
        user: data.user
      }
    };

    this.emitEvent( event );

    return event;

  }

  /*****************************************************************/

  readonly addAdminFailed = ( data: events.AddAdminFailedData ) => {

    let event: events.AddAdminFailed = {
      context: "Core|Admin|Registration",
      tags: [],
      identifier: "AddAdminFailed",
      data: {
        emailAddress: data.emailAddress,
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

export default ( emitEvent: eventManagerInterfaces.Emit ): registrationInterfaces.Emitter => {
  return new RegistrationEmitter( emitEvent );
}

/******************************************************************************/
