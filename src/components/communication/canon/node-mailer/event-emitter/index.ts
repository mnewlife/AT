/******************************************************************************/

import * as communicationInterfaces from "../../../../../src/components/communication";
import * as eventManagerInterfaces from "../../../../../src/setup-config/event-manager";
import * as events from "../../../../../src/components/communication/mail-agent/events";

/******************************************************************************/

class MailAgentEvents implements communicationInterfaces.mailAgent.Events {

  /*****************************************************************/

  readonly emailSent = ( data: events.EmailSentData ) => {
    let event: events.EmailSent = {
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

  readonly sendEmailFailed = ( data: events.SendEmailFailedData ) => {
    let event: events.SendEmailFailed = {
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

  constructor( readonly emitEvent: eventManagerInterfaces.Emit ) { }

  /*****************************************************************/

}

/******************************************************************************/

export default ( emitEvent: eventManagerInterfaces.Emit ): communicationInterfaces.mailAgent.Events => {
  return new MailAgentEvents( emitEvent );
}

/******************************************************************************/
