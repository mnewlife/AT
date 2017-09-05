/******************************************************************************/

import * as dataModel from "../../../../../data-model";
import * as eventListener from "../../../../../event-listener/interfaces";

import * as interfaces from "./interfaces";

/******************************************************************************/

export default class Events implements interfaces.ClassInstance {

  /*****************************************************************/

  constructor( private readonly emitevent: eventListener.Emit ) { }

  /*****************************************************************/

  readonly signedIn = ( data: interfaces.SignedInData ) => {
    let event: interfaces.SignedIn = {
      context: "Procedures|Core|Common|Auth",
      tags: [],
      identifier: "SignedIn",
      data: {
        emailAddress: data.emailAddress,
        req: data.req
      }
    };
    this.emitevent( event );
    return event;
  }

  /*****************************************************************/

  readonly signInFailed = ( data: interfaces.SignInFailedData ) => {
    let event: interfaces.SignInFailed = {
      context: "Procedures|Core|Common|Auth",
      tags: [],
      identifier: "SignInFailed",
      data: {
        emailAddress: data.emailAddress,
        req: data.req,
        reason: data.reason
      }
    };
    this.emitevent( event );
    return event;
  }

  /*****************************************************************/

}

/******************************************************************************/