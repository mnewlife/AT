/******************************************************************************/

import * as dataModel from "../../../../data-model";
import * as eventListener from "../../../../event-listener/interfaces";

/******************************************************************************/

export interface Constructor {
  new( emitEvent: eventListener.Emit ): ClassInstance;
}

export interface ClassInstance {
  readonly getUserSocketFailed: ( data: GetUserSocketFailedData ) => GetUserSocketFailed;

  readonly joinChannelsFailed: ( data: JoinChannelsFailedData ) => JoinChannelsFailed;
  readonly joinedChannel: ( data: JoinedChannelData ) => JoinedChannel;

  readonly getUserSubscriptionsFailed: ( data: GetUserSubscriptionsFailedData ) => GetUserSubscriptionsFailed;
  
  readonly pushToOtherUsersFailed: ( data: PushToOtherUsersFailedData ) => PushToOtherUsersFailed;
  readonly pushedToOtherUsers: ( data: PushedToOtherUsersData ) => PushedToOtherUsers;
  
  readonly pushToCurrentUserFailed: ( data: PushToCurrentUserFailedData ) => PushToCurrentUserFailed;
  readonly pushedToCurrentUser: ( data: PushedToCurrentUserData ) => PushedToCurrentUser;
  
  readonly pushToChannelsFailed: ( data: PushToChannelsFailedData ) => PushToChannelsFailed;
  readonly pushedToChannel: ( data: PushedToChannelData ) => PushedToChannel;
  
  readonly leftChannel: ( data: LeftChannelData ) => LeftChannel;
  readonly leaveChannelsFailed: ( data: LeaveChannelsFailedData ) => LeaveChannelsFailed;
}

/******************************************************************************/

interface BaseEvent extends dataModel.Happening {
  context: "WebSocket";
}

/******************************************************************************/

export interface GetUserSocketFailed extends BaseEvent {
  identifier: "GetUserSocketFailed";
  data: GetUserSocketFailedData;
}
export interface GetUserSocketFailedData {
  userId: string;
  reason: any;
};

/******************************************************************************/

export interface JoinChannelsFailed extends BaseEvent {
  identifier: "JoinChannelsFailed";
  data: JoinChannelsFailedData;
}
export interface JoinChannelsFailedData {
  channels: string[];
  userId: string;
  reason: any;
};

/******************************************************************************/

export interface JoinedChannel extends BaseEvent {
  identifier: "JoinedChannel";
  data: JoinedChannelData;
}
export interface JoinedChannelData {
  channel: string;
  userId: string;
};

/******************************************************************************/

export interface GetUserSubscriptionsFailed extends BaseEvent {
  identifier: "GetUserSubscriptionsFailed";
  data: GetUserSubscriptionsFailedData;
}
export interface GetUserSubscriptionsFailedData {
  userId: string;
  reason: any;
};

/******************************************************************************/

export interface PushToOtherUsersFailed extends BaseEvent {
  identifier: "PushToOtherUsersFailed";
  data: PushToOtherUsersFailedData;
}
export interface PushToOtherUsersFailedData {
  userId: string;
  identifier: string;
  payload: any;
  reason: any;
};

/******************************************************************************/

export interface PushedToOtherUsers extends BaseEvent {
  identifier: "PushedToOtherUsers";
  data: PushedToOtherUsersData;
}
export interface PushedToOtherUsersData {
  userId: string;
  identifier: string;
  payload: any;
};

/******************************************************************************/

export interface PushToCurrentUserFailed extends BaseEvent {
  identifier: "PushToCurrentUserFailed";
  data: PushToCurrentUserFailedData;
}
export interface PushToCurrentUserFailedData {
  userId: string;
  identifier: string;
  payload: any;
  reason: any;
};

/******************************************************************************/

export interface PushedToCurrentUser extends BaseEvent {
  identifier: "PushedToCurrentUser";
  data: PushedToCurrentUserData;
}
export interface PushedToCurrentUserData {
  userId: string;
  identifier: string;
  payload: any;
};

/******************************************************************************/

export interface PushToChannelsFailed extends BaseEvent {
  identifier: "PushToChannelsFailed";
  data: PushToChannelsFailedData;
}
export interface PushToChannelsFailedData {
  channels: string[];
  payload: any;
  reason: any;
};

/******************************************************************************/

export interface PushedToChannel extends BaseEvent {
  identifier: "PushedToChannel";
  data: PushedToChannelData;
}
export interface PushedToChannelData {
  channel: string;
  payload: any;
};

/******************************************************************************/

export interface LeftChannel extends BaseEvent {
  identifier: "LeftChannel";
  data: LeftChannelData;
}
export interface LeftChannelData {
  channel: string;
  userId: string;
};

/******************************************************************************/

export interface LeaveChannelsFailed extends BaseEvent {
  identifier: "LeaveChannelsFailed";
  data: LeaveChannelsFailedData;
}
export interface LeaveChannelsFailedData {
  channels: string[];
  userId: string;
  reason: string;
};

/******************************************************************************/