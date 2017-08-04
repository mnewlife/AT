/******************************************************************************/

import * as express from "express";

import * as interfaces from "../../../../../interfaces/index";

/******************************************************************************/

type Happening = interfaces.dataModel.Happening;
type context = "WebSocket";

/******************************************************************************/

export interface GetUserSocketFailedData {
  userId: string;
  reason: any;
};
export interface GetUserSocketFailed extends Happening {
  context: context;
  identifier: "GetUserSocketFailed";
  data: GetUserSocketFailedData;
}

/******************************************************************************/

export interface JoinedChannelData {
  channel: string;
  userId: string;
};
export interface JoinedChannel extends Happening {
  context: context;
  identifier: "JoinedChannel";
  data: JoinedChannelData;
}

export interface JoinChannelsFailedData {
  channels: string[];
  userId: string;
  reason: any;
};
export interface JoinChannelsFailed extends Happening {
  context: context;
  identifier: "JoinChannelsFailed";
  data: JoinChannelsFailedData;
}

/******************************************************************************/

export interface GetUserSubscriptionsFailedData {
  userId: string;
  reason: any;
};
export interface GetUserSubscriptionsFailed extends Happening {
  context: context;
  identifier: "GetUserSubscriptionsFailed";
  data: GetUserSubscriptionsFailed;
}

/******************************************************************************/

export interface PushedToOtherUsersData {
  userId: string;
  identifier: string;
  payload: any;
};
export interface PushedToOtherUsers extends Happening {
  context: context;
  identifier: "PushedToOtherUsers";
  data: PushedToOtherUsersData;
}

export interface PushToOtherUsersFailedData {
  userId: string;
  identifier: string;
  payload: any;
  reason: any;
};
export interface PushToOtherUsersFailed extends Happening {
  context: context;
  identifier: "PushToOtherUsersFailed";
  data: PushToOtherUsersFailedData;
}

/******************************************************************************/

export interface PushedToCurrentUserData {
  userId: string;
  identifier: string;
  payload: any;
};
export interface PushedToCurrentUser extends Happening {
  context: context;
  identifier: "PushedToCurrentUser";
  data: PushedToCurrentUserData;
}

export interface PushToCurrentUserFailedData {
  userId: string;
  identifier: string;
  payload: any;
  reason: any;
};
export interface PushToCurrentUserFailed extends Happening {
  context: context;
  identifier: "PushToCurrentUserFailed";
  data: PushToCurrentUserFailedData;
}

/******************************************************************************/

export interface PushedToChannelData {
  channel: string;
  payload: any;
};
export interface PushedToChannel extends Happening {
  context: context;
  identifier: "PushedToChannel";
  data: PushedToChannelData;
}

export interface PushToChannelsFailedData {
  channels: string[];
  payload: any;
  reason: any;
};
export interface PushToChannelsFailed extends Happening {
  context: context;
  identifier: "PushToChannelsFailed";
  data: PushToChannelsFailedData;
}

/******************************************************************************/

export interface LeftChannelData {
  channel: string;
  userId: string;
};
export interface LeftChannel extends Happening {
  context: context;
  identifier: "LeftChannel";
  data: LeftChannelData;
}

export interface LeaveChannelsFailedData {
  channels: string[];
  userId: string;
  reason: any;
};
export interface LeaveChannelsFailed extends Happening {
  context: context;
  identifier: "LeaveChannelsFailed";
  data: LeaveChannelsFailedData;
}

/******************************************************************************/
