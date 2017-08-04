/******************************************************************************/

import * as Promise from "bluebird";
import * as express from "express";
import * as nodemailer from "nodemailer";

import * as interfaces from "../../../../interfaces/index";
import * as communicationManagerInterfaces from "../../../../interfaces/utilities/communication-manager/index";
import * as modersInterfaces from "../../../../interfaces/utilities/shared-logic/moders/index";
import * as eventManagerInterfaces from "../../../../interfaces/setup-config/event-manager/index";

import emitterFactory from "./event-emitter/index";

/******************************************************************************/

class BasicMailAgent implements communicationManagerInterfaces.MailAgent {

  private readonly emitter: communicationManagerInterfaces.mailAgent.Emitter;
  private readonly checkThrow: modersInterfaces.CheckThrow;
  private transporter: nodemailer.Transporter;

  /*****************************************************************/

  constructor( params: communicationManagerInterfaces.mailAgent.Params ) {

    this.emitter = params.emitter;
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

          let mailOptions: communicationManagerInterfaces.mailAgent.MailOptions = {
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
                this.emitter.emailSent( {
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
          this.emitter.sendEmailFailed( {
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

export default ( emitEvent: eventManagerInterfaces.Emit, checkThrow: modersInterfaces.CheckThrow, commSettings: communicationManagerInterfaces.CommSettings ): communicationManagerInterfaces.MailAgent => {
  return new BasicMailAgent( {
    emitter: emitterFactory( emitEvent ),
    checkThrow: checkThrow,
    commSettings: commSettings
  } );
};

/******************************************************************************/
