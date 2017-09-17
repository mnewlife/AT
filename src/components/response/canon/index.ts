/******************************************************************************/

import * as Promise from "bluebird";
import * as express from "express";
import * as expressSession from "express-session";

import * as dataModel from "../../../data-model";
import * as EventListener from "../../../event-listener";
import * as Storage from "../../storage/interfaces";
import * as Moders from "../../helpers/moders/interfaces";

import * as interfaces from "../interfaces";
import * as Events from "../events/interfaces";

/******************************************************************************/

export default class Canon implements interfaces.Instance {

  middleware: express.RequestHandler[] = [];

  /*****************************************************************/

  constructor( private readonly events: Events.Instance ) { }

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
          str = JSON.stringify(( payload ) ? payload : "" );
        } catch ( exception ) {
          this.events.stringifyHtmlPacketFailed( {
            payload: ( payload ) ? payload : "",
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
