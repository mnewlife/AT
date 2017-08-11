/******************************************************************************/

import * as events from "../../../../../interfaces/components/communication/web-socket/events";
import * as eventManagerInterfaces from "../../../../../interfaces/setup-config/event-manager";
import * as communicationInterfaces from "../../../../../interfaces/components/communication";

/******************************************************************************/

class WebSocketEmitter implements communicationInterfaces.webSocket.Emitter {

  /*****************************************************************/

  readonly getUserSocketFailed = ( params: events.GetUserSocketFailedData ) => {
    let event: events.GetUserSocketFailed = {
      context: "WebSocket",
      tags: [],
      identifier: "GetUserSocketFailed",
      data: {
        userId: params.userId,
        reason: params.reason
      }
    };
    this.emitEvent( event );
    return event;
  }

  /*****************************************************************/

  readonly joinChannelsFailed = ( params: events.JoinChannelsFailedData ) => {
    let event: events.JoinChannelsFailed = {
      context: "WebSocket",
      tags: [],
      identifier: "JoinChannelsFailed",
      data: {
        channels: params.channels,
        userId: params.userId,
        reason: params.reason
      }
    };
    this.emitEvent( event );
    return event;
  }

  /*****************************************************************/

  readonly joinedChannel = ( params: events.JoinedChannelData ) => {
    let event: events.JoinedChannel = {
      context: "WebSocket",
      tags: [],
      identifier: "JoinedChannel",
      data: {
        channel: params.channel,
        userId: params.userId
      }
    };
    this.emitEvent( event );
    return event;
  }

  /*****************************************************************/

  readonly getUserSubscriptionsFailed = ( params: events.GetUserSubscriptionsFailedData ) => {
    let event: events.GetUserSubscriptionsFailed = {
      context: "WebSocket",
      tags: [],
      identifier: "GetUserSubscriptionsFailed",
      data: {
        userId: params.userId,
        reason: params.reason
      }
    };
    this.emitEvent( event );
    return event;
  }

  /*****************************************************************/

  readonly pushToOtherUsersFailed = ( params: events.PushToOtherUsersFailedData ) => {
    let event: events.PushToOtherUsersFailed = {
      context: "WebSocket",
      tags: [],
      identifier: "PushToOtherUsersFailed",
      data: {
        userId: params.userId,
        identifier: params.identifier,
        payload: params.payload,
        reason: params.reason
      }
    };
    this.emitEvent( event );
    return event;
  }

  /*****************************************************************/

  readonly pushedToOtherUsers = ( params: events.PushedToOtherUsersData ) => {
    let event: events.PushedToOtherUsers = {
      context: "WebSocket",
      tags: [],
      identifier: "PushedToOtherUsers",
      data: {
        userId: params.userId,
        identifier: params.identifier,
        payload: params.payload
      }
    };
    this.emitEvent( event );
    return event;
  }

  /*****************************************************************/

  readonly pushToCurrentUserFailed = ( params: events.PushToCurrentUserFailedData ) => {
    let event: events.PushToCurrentUserFailed = {
      context: "WebSocket",
      tags: [],
      identifier: "PushToCurrentUserFailed",
      data: {
        userId: params.userId,
        identifier: params.identifier,
        payload: params.payload,
        reason: params.reason
      }
    };
    this.emitEvent( event );
    return event;
  }

  /*****************************************************************/

  readonly pushedToCurrentUser = ( params: events.PushedToCurrentUserData ) => {
    let event: events.PushedToCurrentUser = {
      context: "WebSocket",
      tags: [],
      identifier: "PushedToCurrentUser",
      data: {
        userId: params.userId,
        identifier: params.identifier,
        payload: params.payload
      }
    };
    this.emitEvent( event );
    return event;
  }

  /*****************************************************************/

  readonly pushToChannelsFailed = ( params: events.PushToChannelsFailedData ) => {
    let event: events.PushToChannelsFailed = {
      context: "WebSocket",
      tags: [],
      identifier: "PushToChannelsFailed",
      data: {
        channels: params.channels,
        payload: params.payload,
        reason: params.reason
      }
    };
    this.emitEvent( event );
    return event;
  }

  /*****************************************************************/

  readonly pushedToChannel = ( params: events.PushedToChannelData ) => {
    let event: events.PushedToChannel = {
      context: "WebSocket",
      tags: [],
      identifier: "PushedToChannel",
      data: {
        channel: params.channel,
        payload: params.payload
      }
    };
    this.emitEvent( event );
    return event;
  }

  /*****************************************************************/

  readonly leftChannel = ( params: events.LeftChannelData ) => {
    let event: events.LeftChannel = {
      context: "WebSocket",
      tags: [],
      identifier: "LeftChannel",
      data: {
        channel: params.channel,
        userId: params.userId
      }
    };
    this.emitEvent( event );
    return event;
  }

  /*****************************************************************/

  readonly leaveChannelsFailed = ( params: events.LeaveChannelsFailedData ) => {
    let event: events.LeaveChannelsFailed = {
      context: "WebSocket",
      tags: [],
      identifier: "LeaveChannelsFailed",
      data: {
        channels: params.channels,
        userId: params.userId,
        reason: params.reason
      }
    };
    this.emitEvent( event );
    return event;
  }

  /*****************************************************************/

  constructor( readonly emitEvent: eventManagerInterfaces.Emit ) { }

  /*****************************************************************/

}

/******************************************************************************/

export default ( emitEvent: eventManagerInterfaces.Emit ): communicationInterfaces.webSocket.Emitter => {
  return new WebSocketEmitter( emitEvent );
}

/******************************************************************************/
