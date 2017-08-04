/******************************************************************************/

import * as Promise from "bluebird";
import * as express from "express";

import * as interfaces from "../../../../../interfaces/index";
import * as communicationManagerInterfaces from "../../../../../interfaces/utilities/communication-manager/index";
import * as eventManagerInterfaces from "../../../../../interfaces/setup-config/event-manager/index";
import * as events from "../../../../../interfaces/events/utilities/communication-manager/mail-agent/index";

/******************************************************************************/

class MailAgentEmitter implements communicationManagerInterfaces.mailAgent.Emitter {

  /*****************************************************************/

  readonly emailSent = ( data : events.EmailSentData ) => {

    let event : events.EmailSent = {
      context : "MailAgent" ,
      tags : [] ,
      identifier : "EmailSent" ,
      data : {
        from : data.from ,
        to : data.to ,
        subject : data.subject ,
        html : data.html
      }
    };

    this.emitEvent( event );

    return event;

  }

  readonly sendEmailFailed = ( data : events.SendEmailFailedData ) => {

    let event : events.SendEmailFailed = {
      context : "MailAgent" ,
      tags : [] ,
      identifier : "SendEmailFailed" ,
      data : {
        from : data.from ,
        to : data.to ,
        subject : data.subject ,
        html : data.html ,
        reason : data.reason
      }
    };

    this.emitEvent( event );

    return event;

  }

  /*****************************************************************/

  constructor ( readonly emitEvent : interfaces.setupConfig.eventManager.Emit ) {}

  /*****************************************************************/

}

/******************************************************************************/

export default ( emitEvent : eventManagerInterfaces.Emit ) : communicationManagerInterfaces.mailAgent.Emitter => {
  return new MailAgentEmitter( emitEvent );
}

/******************************************************************************/
