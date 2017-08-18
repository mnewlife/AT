/******************************************************************************/

import * as Promise from "bluebird";
import * as express from "express";
import * as nodemailer from "nodemailer";

import * as src from "../../../../src";
import * as communicationInterfaces from "../../../../src/components/communication";
import * as modersInterfaces from "../../../../src/components/shared-logic/moders";
import * as eventManagerInterfaces from "../../../../src/setup-config/event-manager";

import eventsFactory from "./events";

/******************************************************************************/

class BasicMailAgent implements communicationInterfaces.MailAgent {

  private readonly events: communicationInterfaces.mailAgent.Events;
  private readonly checkThrow: modersInterfaces.CheckThrow;
  private transporter: nodemailer.Transporter;

  /*****************************************************************/

  constructor( params: communicationInterfaces.mailAgent.Params ) {

    this.events = params.events;
    this.checkThrow = params.checkThrow;

    this.transporter = nodemailer.createTransport( {
      service: "gmail",
      auth: {
        user: params.commSettings.mailSendingAddress,
        pass: params.commSettings.mailSendingAddressPassword
      }
    } );

  }

  /*****************************************************************/

  readonly sendEmail = ( from: string, to: string[], subject: string, html: string, forceThrow = false ): Promise<void> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return new Promise<void>(( resolve, reject ) => {

          let mailOptions: communicationInterfaces.mailAgent.MailOptions = {
            from: from,
            to: to,
            subject: subject,
            html: html
          };

          this.transporter.sendMail( mailOptions, ( err: any, info: any ) => {
            if ( err ) {
              reject( err );
            } else {
              new Promise<void>(( resolve, reject ) => {
                this.events.emailSent( {
                  from: from,
                  to: to,
                  subject: subject,
                  html: html
                } );
                resolve();
              } );
              resolve();
            }

          } );

        } )

      } )
      .catch(( reason: any ) => {

        new Promise<void>(( resolve, reject ) => {
          this.events.sendEmailFailed( {
            from: from,
            to: to,
            subject: subject,
            html: html,
            reason: reason
          } );
          resolve();
        } );

        return Promise.reject( {
          identifier: "SendEmailFailed",
          data: {
            reason: reason
          }
        } );

      } );

  }

  /*****************************************************************/

}

/******************************************************************************/

export default ( params: {
  emitEvent: eventManagerInterfaces.Emit,
  checkThrow: modersInterfaces.CheckThrow,
  commSettings: communicationInterfaces.CommSettings
} ): communicationInterfaces.MailAgent => {
  return new BasicMailAgent( {
    events: eventsFactory( params.emitEvent ),
    checkThrow: params.checkThrow,
    commSettings: params.commSettings
  } );
};

/******************************************************************************/
