/******************************************************************************/

import * as express from "express";

import * as interfaces from "../../../interfaces";
import * as responseManagerInterfaces from "../../../interfaces/utilities/response-manager";
import * as modersInterfaces from "../../../interfaces/utilities/shared-logic/moders";
import * as eventManagerInterfaces from "../../../interfaces/setup-config/event-manager";

import emitterFactory from "./event-emitter";

/******************************************************************************/

class BasicResponseManager implements interfaces.utilities.ResponseManager {

  private readonly emitter: interfaces.utilities.responseManager.Emitter;

  middleware: express.RequestHandler[] = [];

  /*****************************************************************/

  constructor( params: { emitter: interfaces.utilities.responseManager.Emitter } ) {
    this.emitter = params.emitter;
  }

  /*****************************************************************/

  readonly send = ( res: express.Response, view: string, success: boolean, message: string, payload: any ): void => {

    res.format( {

      json: () => {
        return res.status( 200 ).json( {
          success: ( success ) ? ( success ) : false,
          message: ( message ) ? ( message ) : "",
          payload: ( payload ) ? payload : ""
        } );
      },

      html: () => {
        let str;
        try {
          str = JSON.stringify( {
            success: ( success ) ? success : false,
            message: ( message ) ? message : "",
            payload: ( payload ) ? payload : ""
          } );
        } catch ( exception ) {
          this.emitter.stringifyHtmlPacketFailed( {
            packet: {
              success: ( success ) ? success : false,
              message: ( message ) ? message : "",
              payload: ( payload ) ? payload : ""
            },
            reason: exception
          } );
          str = "";
        }
        return res.render( view, {
          jsonString: str
        } );
      },

      "default": () => {
        this.emitter.unacceptableResponseType( {
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
