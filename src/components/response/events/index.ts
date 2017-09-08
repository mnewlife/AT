/******************************************************************************/

import * as dataModel from "../../../data-model";
import * as EventListener from "../../../event-listener/interfaces";
import * as Session from "../../session/interfaces";

import * as interfaces from "./interfaces";

/******************************************************************************/

export default class Events implements interfaces.Instance {

  /*****************************************************************/

  constructor( private readonly emitEvent: EventListener.Emit ) { }

  /*****************************************************************/

  readonly stringifyHtmlPacketFailed = ( params: interfaces.StringifyHtmlPacketFailedData ) => {
    let event: interfaces.StringifyHtmlPacketFailed = {
      context: "Response",
      tags: [],
      identifier: "StringifyHtmlPacketFailed",
      data: {
        packet: params.packet,
        reason: params.reason
      }
    };
    this.emitEvent( event );
    return event;
  }

  /*****************************************************************/

  readonly unacceptableResponseType = ( params: any ) => {
    let event: interfaces.UnacceptableResponseType = {
      context: "Response",
      tags: [],
      identifier: "UnacceptableResponseType",
      data: {
        res: params.res,
        packet: params.packet
      }
    };
    this.emitEvent( event );
    return event;
  }

  /*****************************************************************/

  readonly sendResponseFailed = ( params: any ) => {
    let event: interfaces.SendResponseFailed = {
      context: "Response",
      tags: [],
      identifier: "SendResponseFailed",
      data: {
        res: params.res,
        view: params.view,
        success: params.success,
        message: params.message,
        payload: ( params.payload ) ? params.payload : "",
        reason: params.reason
      }
    };
    this.emitEvent( event );
    return event;
  }

  /*****************************************************************/

}

/******************************************************************************/