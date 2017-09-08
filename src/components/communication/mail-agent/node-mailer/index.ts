/******************************************************************************/

import * as Promise from "bluebird";
import * as express from "express";
import * as nodemailer from "nodemailer";

import * as eventListener from "../../../../event-listener/interfaces";
import * as moders from "../../../helpers/moders/interfaces";

import * as interfaces from "../interfaces";
import * as Events from "../events/interfaces";

/******************************************************************************/

export default class NodeMailer implements interfaces.Instance {

  /*****************************************************************/

  private transporter: nodemailer.Transporter;

  /*****************************************************************/

  constructor(
    private readonly events: Events.Instance,
    private readonly checkThrow: moders.CheckThrow,
    private readonly sendingAddress: string,
    private readonly password: string
  ) {

    this.transporter = nodemailer.createTransport( {
      service: "gmail",
      auth: {
        user: this.sendingAddress,
        pass: this.password
      }
    } );

  }

  /*****************************************************************/

  readonly sendEmail = ( from: string, to: string[], subject: string, html: string, forceThrow = false ): Promise<void> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return new Promise<void>(( resolve, reject ) => {

          let mailOptions: any = {
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