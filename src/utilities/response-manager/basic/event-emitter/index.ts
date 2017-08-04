/******************************************************************************/

import * as Promise from "bluebird";
import * as express from "express";

import * as interfaces from "../../../../interfaces/index";
import * as events from "../../../../interfaces/events/utilities/response-manager/index";
import * as responseManagerInterfaces from "../../../../interfaces/utilities/response-manager/index";
import * as eventManagerInterfaces from "../../../../interfaces/setup-config/event-manager/index";

/******************************************************************************/

class ResponseManagerEmitter implements interfaces.utilities.responseManager.Emitter {

  /*****************************************************************/

  readonly stringifyHtmlPacketFailed = ( params: any ) => {

    let event: events.StringifyHtmlPacketFailed = {
      context: "ResponseManager",
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

    let event: events.UnacceptableResponseType = {
      context: "ResponseManager",
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

    let event: events.SendResponseFailed = {
      context: "ResponseManager",
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

  constructor( readonly emitEvent: interfaces.setupConfig.eventManager.Emit, params: any ) { }

  /*****************************************************************/

}

/******************************************************************************/

export default ( emitEvent : eventManagerInterfaces.Emit ): interfaces.utilities.responseManager.Emitter => {

  return new ResponseManagerEmitter( config.eventManager.emit, {} );

}

/******************************************************************************/
