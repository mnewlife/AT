/******************************************************************************/

import * as src from "../../../../../src";

/******************************************************************************/

export interface BaseEvent extends dataModel.Happening {
  context: "WebSocket";
}

/******************************************************************************/

export interface GetUserSocketFailedData {
  userId: string;
  reason: any;
};
export interface GetUserSocketFailed extends BaseEvent {
  identifier: "GetUserSocketFailed";
  data: GetUserSocketFailedData;
}

/******************************************************************************/

export interface JoinedChannelData {
  channel: string;
  userId: string;
};
export interface JoinedChannel extends BaseEvent {
  identifier: "JoinedChannel";
  data: JoinedChannelData;
}

/******************************************************************************/

export interface JoinChannelsFailedData {
  channels: string[];
  userId: string;
  reason: any;
};
export interface JoinChannelsFailed extends BaseEvent {
  identifier: "JoinChannelsFailed";
  data: JoinChannelsFailedData;
}

/******************************************************************************/

export interface GetUserSubscriptionsFailedData {
  userId: string;
  reason: any;
};
export interface GetUserSubscriptionsFailed extends BaseEvent {
  identifier: "GetUserSubscriptionsFailed";
  data: GetUserSubscriptionsFailedData;
}

/******************************************************************************/

export interface PushedToOtherUsersData {
  userId: string;
  identifier: string;
  payload: any;
};
export interface PushedToOtherUsers extends BaseEvent {
  identifier: "PushedToOtherUsers";
  data: PushedToOtherUsersData;
}

/******************************************************************************/

export interface PushToOtherUsersFailedData {
  userId: string;
  identifier: string;
  payload: any;
  reason: any;
};
export interface PushToOtherUsersFailed extends BaseEvent {
  identifier: "PushToOtherUsersFailed";
  data: PushToOtherUsersFailedData;
}

/******************************************************************************/

export interface PushedToCurrentUserData {
  userId: string;
  identifier: string;
  payload: any;
};
export interface PushedToCurrentUser extends BaseEvent {
  identifier: "PushedToCurrentUser";
  data: PushedToCurrentUserData;
}

/******************************************************************************/

export interface PushToCurrentUserFailedData {
  userId: string;
  identifier: string;
  payload: any;
  reason: any;
};
export interface PushToCurrentUserFailed extends BaseEvent {
  identifier: "PushToCurrentUserFailed";
  data: PushToCurrentUserFailedData;
}

/******************************************************************************/

export interface PushedToChannelData {
  channel: string;
  payload: any;
};
export interface PushedToChannel extends BaseEvent {
  identifier: "PushedToChannel";
  data: PushedToChannelData;
}

/******************************************************************************/

export interface PushToChannelsFailedData {
  channels: string[];
  payload: any;
  reason: any;
};
export interface PushToChannelsFailed extends BaseEvent {
  identifier: "PushToChannelsFailed";
  data: PushToChannelsFailedData;
}

/******************************************************************************/

export interface LeftChannelData {
  channel: string;
  userId: string;
};
export interface LeftChannel extends BaseEvent {
  identifier: "LeftChannel";
  data: LeftChannelData;
}

/******************************************************************************/

export interface LeaveChannelsFailedData {
  channels: string[];
  userId: string;
  reason: any;
};
export interface LeaveChannelsFailed extends BaseEvent {
  identifier: "LeaveChannelsFailed";
  data: LeaveChannelsFailedData;
}

/******************************************************************************/
