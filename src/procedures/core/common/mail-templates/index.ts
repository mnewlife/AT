/******************************************************************************/

import * as express from "express";
import * as Promise from "bluebird";

import * as dataModel from "../../../../data-model";
import * as eventListener from "../../../../event-listener";
import * as environment from "../../../../environment";
import * as authentication from "../../../../components/authentication/interfaces";
import * as moders from "../../../../components/helpers/moders/interfaces";

import * as interfaces from "./interfaces";

/******************************************************************************/

export default class MailTemplates implements interfaces.Instance {

  /****************************************************************/

  constructor( private readonly checkThrow: moders.CheckThrow ) { }

  /****************************************************************/

  newEmailAddress = ( newEmailAddress: string, userId: string, verificationCode: string, supportPhoneNumber: string, supportEmailAddress: string, forceThrow?: boolean ): Promise<string> => {

    return this.checkThrow( forceThrow )
      .then( ( response: any ) => {

        return new Promise<string>( ( resolve, reject ) => {

          let html = [
            "<h4>Hey, " + newEmailAddress + "</h4>",
            "<span>",
            "Thank you for joining the platform. Click the link below to verify your email address.",
            "</span>",
            "<br>",
            "<a href='" + String( environment.default.host ) + "/core/registration/verifyAccount/" + userId + "/" + String( verificationCode ) + "'>",
            "Click here to activate your account",
            "</a>",
            "<br>",
            "<br>",
            "<span>",
            "Have questions? Get in touch with us on <b>" + supportPhoneNumber + "</b> or email our support team at <b>" + supportEmailAddress + "</b>",
            "</span>",
            "<br><br>",
            "Regards,<br>",
            environment.default.applicationName
          ].join( "" );

          resolve( html );

        } );

      } );

  }

  /****************************************************************/

  passwordReset = ( emailAddress: string, userId: string, resetCode: string, supportPhoneNumber: string, supportEmailAddress: string, forceThrow?: boolean ): Promise<string> => {

    return this.checkThrow( forceThrow )
      .then( ( response: any ) => {

        return new Promise<string>( ( resolve, reject ) => {

          let html = [
            "<h4>Hey, " + emailAddress + "</h4>",
            "<br>",
            "<span>",
            "Thank you for joining the platform. Click the link below to verify your email address.",
            "</span>",
            "<br>",
            "<a href='" + environment.default.host + "/core/profile/resetPassword/" + userId + "/" + resetCode + "'>",
            "Click here to activate your account",
            "</a>",
            "<br>",
            "<br>",
            "<span>",
            "Have questions? Get in touch with us on " + supportPhoneNumber + " or email our support team at " + supportEmailAddress,
            "</span>",
            "<br>",
            "Cheers,",
            environment.default.applicationName
          ].join( "" );

          resolve( html );

        } );

      } );

  }

  /****************************************************************/

}

/******************************************************************************/