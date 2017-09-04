/******************************************************************************/

import * as eventListener from "../../../../event-listener/interfaces";
import * as components from "../../../../components/interfaces";

import * as interfaces from "./interfaces";

/******************************************************************************/

export default class Events implements interfaces.ClassInstance {

  /*****************************************************************/

  constructor( private readonly emitEvent: eventListener.Emit ) { }

  /*****************************************************************/

  readonly emailSent = ( data: interfaces.EmailSentData ) => {
    let event: interfaces.EmailSent = {
      context: "MailAgent",
      tags: [],
      identifier: "EmailSent",
      data: {
        from: data.from,
        to: data.to,
        subject: data.subject,
        html: data.html
      }
    };
    this.emitEvent( event );
    return event;
  }

  readonly sendEmailFailed = ( data: interfaces.SendEmailFailedData ) => {
    let event: interfaces.SendEmailFailed = {
      context: "MailAgent",
      tags: [],
      identifier: "SendEmailFailed",
      data: {
        from: data.from,
        to: data.to,
        subject: data.subject,
        html: data.html,
        reason: data.reason
      }
    };
    this.emitEvent( event );
    return event;
  }

  /*****************************************************************/

}

/******************************************************************************/