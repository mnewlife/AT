/******************************************************************************/

import * as express from "express";

import * as interfaces from "../../../interfaces";
import * as responseInterfaces from "../../../interfaces/components/response";
import * as modersInterfaces from "../../../interfaces/components/shared-logic/moders";
import * as eventManagerInterfaces from "../../../interfaces/setup-config/event-manager";

import emitterFactory from "./event-emitter";

/******************************************************************************/

class BasicResponse implements interfaces.components.Response {

  private readonly emitter: interfaces.components.response.Emitter;

  middleware: express.RequestHandler[] = [];

  /*****************************************************************/

  constructor( params: { emitter: interfaces.components.response.Emitter } ) {
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

export default ( emitEvent: eventManagerInterfaces.Emit ): interfaces.components.Response => {
  return new BasicResponse( {
    emitter: emitterFactory( emitEvent )
  } );
}

/******************************************************************************/
