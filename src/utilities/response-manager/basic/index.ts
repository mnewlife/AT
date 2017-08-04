/******************************************************************************/

import * as Promise from "bluebird";
import * as express from "express";

import * as interfaces from "../../../interfaces/index";
import * as responseManagerInterfaces from "../../../interfaces/utilities/response-manager/index";
import * as modersInterfaces from "../../../interfaces/utilities/shared-logic/moders/index";
import * as eventManagerInterfaces from "../../../interfaces/setup-config/event-manager/index";

import emitterFactory from "./event-emitter";

/******************************************************************************/

class BasicResponseManager implements interfaces.utilities.ResponseManager {

  private readonly emitter: interfaces.utilities.responseManager.Emitter;

  middleware: express.RequestHandler[] = [];

  /*****************************************************************/

  constructor( params: any ) {
    this.emitter = params.emitter;
  }

  /*****************************************************************/

  readonly send = ( res: express.Response, view: string, success: boolean, message: string, payload: any ): void => {

    const classContext = this;

    res.format( {

      json: () => {

        let packet = {
          success: ( success ) ? ( success ) : false,
          message: ( message ) ? ( message ) : "",
          payload: ( payload ) ? payload : ""
        };

        return res.status( 200 ).json( packet );

      },

      html: () => {

        let packet = {
          success: ( success ) ? success : false,
          message: ( message ) ? message : "",
          payload: ( payload ) ? payload : ""
        };

        let str;

        try {

          str = JSON.stringify( packet );

        } catch ( exception ) {

          classContext.emitter.stringifyHtmlPacketFailed( {
            packet: packet,
            reason: exception
          } );

          str = "";

        }

        return res.render( view, {
          jsonString: str
        } );

      },

      "default": () => {

        classContext.emitter.unacceptableResponseType( {
          res: res,
          packet: {
            view: view,
            success: success,
            message: message,
            payload: payload
          }
        } );

        return res.status( 406 ).send( "Not Acceptable" );

      }

    } );

  }

  /*****************************************************************/

}

/******************************************************************************/

export default ( emitEvent: eventManagerInterfaces.Emit ): interfaces.utilities.ResponseManager => {

  return new BasicResponseManager( {
    emitter: emitterFactory( emitEvent )
  } );

}

/******************************************************************************/
