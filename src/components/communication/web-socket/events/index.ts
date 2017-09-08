/******************************************************************************/

import * as eventListener from "../../../../event-listener/interfaces";
import * as components from "../../../../components/interfaces";

import * as interfaces from "./interfaces";

/******************************************************************************/

export default class Events implements interfaces.Instance {

  /*****************************************************************/

  constructor( private readonly emitEvent: eventListener.Emit ) { }

  /*****************************************************************/

  readonly getUserSocketFailed = ( params: interfaces.GetUserSocketFailedData ) => {
    let event: interfaces.GetUserSocketFailed = {
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

  readonly joinChannelsFailed = ( params: interfaces.JoinChannelsFailedData ) => {
    let event: interfaces.JoinChannelsFailed = {
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

  readonly joinedChannel = ( params: interfaces.JoinedChannelData ) => {
    let event: interfaces.JoinedChannel = {
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

  readonly getUserSubscriptionsFailed = ( params: interfaces.GetUserSubscriptionsFailedData ) => {
    let event: interfaces.GetUserSubscriptionsFailed = {
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

  readonly pushToOtherUsersFailed = ( params: interfaces.PushToOtherUsersFailedData ) => {
    let event: interfaces.PushToOtherUsersFailed = {
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

  readonly pushedToOtherUsers = ( params: interfaces.PushedToOtherUsersData ) => {
    let event: interfaces.PushedToOtherUsers = {
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

  readonly pushToCurrentUserFailed = ( params: interfaces.PushToCurrentUserFailedData ) => {
    let event: interfaces.PushToCurrentUserFailed = {
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

  readonly pushedToCurrentUser = ( params: interfaces.PushedToCurrentUserData ) => {
    let event: interfaces.PushedToCurrentUser = {
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

  readonly pushToChannelsFailed = ( params: interfaces.PushToChannelsFailedData ) => {
    let event: interfaces.PushToChannelsFailed = {
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

  readonly pushedToChannel = ( params: interfaces.PushedToChannelData ) => {
    let event: interfaces.PushedToChannel = {
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

  readonly leftChannel = ( params: interfaces.LeftChannelData ) => {
    let event: interfaces.LeftChannel = {
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

  readonly leaveChannelsFailed = ( params: interfaces.LeaveChannelsFailedData ) => {
    let event: interfaces.LeaveChannelsFailed = {
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

}

/******************************************************************************/