/******************************************************************************/

import * as express from "express";

import * as src from "../../../src";
import * as responseInterfaces from "../../../src/components/response";
import * as modersInterfaces from "../../../src/components/shared-logic/moders";
import * as eventManagerInterfaces from "../../../src/setup-config/event-manager";

import eventsFactory from "./events";

/******************************************************************************/

class BasicResponse implements src.components.Response {

  private readonly events: src.components.response.Events;

  middleware: express.RequestHandler[] = [];

  /*****************************************************************/

  constructor( params: { events: src.components.response.Events } ) {
    this.events = params.events;
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
          this.events.stringifyHtmlPacketFailed( {
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
        this.events.unacceptableResponseType( {
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

export default ( emitEvent: eventManagerInterfaces.Emit ): src.components.Response => {
  return new BasicResponse( {
    events: eventsFactory( emitEvent )
  } );
}

/******************************************************************************/
