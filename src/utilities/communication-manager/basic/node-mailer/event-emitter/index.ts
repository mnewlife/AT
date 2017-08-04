/******************************************************************************/

import * as communicationManagerInterfaces from "../../../../../interfaces/utilities/communication-manager";
import * as eventManagerInterfaces from "../../../../../interfaces/setup-config/event-manager";
import * as events from "../../../../../interfaces/utilities/communication-manager/mail-agent/events";

/******************************************************************************/

class MailAgentEmitter implements communicationManagerInterfaces.mailAgent.Emitter {

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

export default ( emitEvent: eventManagerInterfaces.Emit ): communicationManagerInterfaces.mailAgent.Emitter => {
  return new MailAgentEmitter( emitEvent );
}

/******************************************************************************/
