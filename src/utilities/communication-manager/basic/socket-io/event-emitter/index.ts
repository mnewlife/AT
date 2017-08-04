/******************************************************************************/

import * as Promise from "bluebird";
import * as express from "express";

import * as interfaces from "../../../../../interfaces/index";

/******************************************************************************/

class WebSocketEmitter implements interfaces.utilities.communicationManager.webSocket.Emitter {

  /*****************************************************************/

  readonly getUserSocketFailed = ( params : any ) => {

    let event : interfaces.events.utilities.communicationManager.webSocket.GetUserSocketFailed = {
      context : "WebSocket" ,
      tags : [] ,
      identifier : "GetUserSocketFailed" ,
      data : {
        userId : params.userId ,
        reason : params.reason
      }
    };

    this.emitEvent( event );

    return event;

  }

  readonly joinChannelsFailed = ( params : any ) => {

    let event : interfaces.events.utilities.communicationManager.webSocket.JoinChannelsFailed = {
      context : "WebSocket" ,
      tags : [] ,
      identifier : "JoinChannelsFailed" ,
      data : {
        channels : params.channels ,
        userId : params.userId ,
        reason : params.reason
      }
    };

    this.emitEvent( event );

    return event;

  }

  readonly joinedChannel = ( params : any ) => {

    let event : interfaces.events.utilities.communicationManager.webSocket.JoinedChannel = {
      context : "WebSocket" ,
      tags : [] ,
      identifier : "JoinedChannel" ,
      data : {
        channel : params.channel ,
        userId : params.userId
      }
    };

    this.emitEvent( event );

    return event;

  }

  readonly getUserSubscriptionsFailed = ( params : any ) => {

    let event : interfaces.events.utilities.communicationManager.webSocket.GetUserSubscriptionsFailed = {
      context : "WebSocket" ,
      tags : [] ,
      identifier : "GetUserSubscriptionsFailed" ,
      data : {
        userId : params.userId ,
        reason : params.reason
      }
    };

    this.emitEvent( event );

    return event;

  }

  readonly pushToOtherUsersFailed = ( params : any ) => {

    let event : interfaces.events.utilities.communicationManager.webSocket.PushToOtherUsersFailed = {
      context : "WebSocket" ,
      tags : [] ,
      identifier : "PushToOtherUsersFailed" ,
      data : {
        userId : params.userId ,
        identifier : params.identifier ,
        payload : params.payload ,
        reason : params.reason
      }
    };

    this.emitEvent( event );

    return event;

  }

  readonly pushedToOtherUsers = ( params : any ) => {

    let event : interfaces.events.utilities.communicationManager.webSocket.PushedToOtherUsers = {
      context : "WebSocket" ,
      tags : [] ,
      identifier : "PushedToOtherUsers" ,
      data : {
        userId : params.userId ,
        identifier : params.identifier ,
        payload : params.payload
      }
    };

    this.emitEvent( event );

    return event;

  }

  readonly pushToCurrentUserFailed = ( params : any ) => {

    let event : interfaces.events.utilities.communicationManager.webSocket.PushToCurrentUserFailed = {
      context : "WebSocket" ,
      tags : [] ,
      identifier : "PushToCurrentUserFailed" ,
      data : {
        userId : params.userId ,
        identifier : params.identifier ,
        payload : params.payload ,
        reason : params.reason
      }
    };

    this.emitEvent( event );

    return event;

  }

  readonly pushedToCurrentUser = ( params : any ) => {

    let event : interfaces.events.utilities.communicationManager.webSocket.PushedToCurrentUser = {
      context : "WebSocket" ,
      tags : [] ,
      identifier : "PushedToCurrentUser" ,
      data : {
        userId : params.userId ,
        identifier : params.identifier ,
        payload : params.payload
      }
    };

    this.emitEvent( event );

    return event;

  }

  readonly pushToChannelsFailed = ( params : any ) => {

    let event : interfaces.events.utilities.communicationManager.webSocket.PushToChannelsFailed = {
      context : "WebSocket" ,
      tags : [] ,
      identifier : "PushToChannelsFailed" ,
      data : {
        channels : params.channels ,
        payload : params.payload ,
        reason : params.reason
      }
    };

    this.emitEvent( event );

    return event;

  }

  readonly pushedToChannel = ( params : any ) => {

    let event : interfaces.events.utilities.communicationManager.webSocket.PushedToChannel = {
      context : "WebSocket" ,
      tags : [] ,
      identifier : "PushedToChannel" ,
      data : {
        channel : params.channel ,
        payload : params.payload
      }
    };

    this.emitEvent( event );

    return event;

  }

  readonly leftChannel = ( params : any ) => {

    let event : interfaces.events.utilities.communicationManager.webSocket.LeftChannel = {
      context : "WebSocket" ,
      tags : [] ,
      identifier : "LeftChannel" ,
      data : {
        channel : params.channel ,
        userId : params.userId
      }
    };

    this.emitEvent( event );

    return event;

  }

  readonly leaveChannelsFailed = ( params : any ) => {

    let event : interfaces.events.utilities.communicationManager.webSocket.LeaveChannelsFailed = {
      context : "WebSocket" ,
      tags : [] ,
      identifier : "LeaveChannelsFailed" ,
      data : {
        channels : params.channels ,
        userId : params.userId ,
        reason : params.reason
      }
    };

    this.emitEvent( event );

    return event;

  }

  /*****************************************************************/

  constructor ( readonly emitEvent : interfaces.setupConfig.eventManager.Emit , params : any ) {}

  /*****************************************************************/

}

/******************************************************************************/

export default ( config : interfaces.Config ) : interfaces.utilities.communicationManager.webSocket.Emitter => {

  return new WebSocketEmitter( config.eventManager.emit , {} );

}

/******************************************************************************/
