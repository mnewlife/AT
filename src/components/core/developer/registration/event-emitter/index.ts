/******************************************************************************/

import * as Promise from "bluebird";
import * as express from "express";

import * as interfaces from "../../../../../interfaces";

import * as events from "../../../../../interfaces/events/components/core/admin/registration";
import * as registrationInterfaces from "../../../../../interfaces/components/core/admin/registration";
import * as eventManagerInterfaces from "../../../../../interfaces/setup-config/event-manager";

/******************************************************************************/

class RegistrationEmitter implements registrationInterfaces.Emitter {

  /*****************************************************************/

  readonly addedAdmin = ( data: storageManagerEvents.AddedAdminData ) => {

    let event: storageManagerEvents.AddedAdmin = {
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

  readonly addAdminFailed = ( data: storageManagerEvents.AddAdminFailedData ) => {

    let event: storageManagerEvents.AddAdminFailed = {
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
