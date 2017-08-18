/******************************************************************************/

import * as Promise from "bluebird";
import * as http from "http";

import * as src from "../../../../src";
import * as events from "./events";

/******************************************************************************/

export interface Events {
  getUserSocketFailed: ( params: events.GetUserSocketFailedData ) => events.GetUserSocketFailed;
  joinChannelsFailed: ( params: events.JoinChannelsFailedData ) => events.JoinChannelsFailed;
  joinedChannel: ( params: events.JoinedChannelData ) => events.JoinedChannel;
  getUserSubscriptionsFailed: ( params: events.GetUserSubscriptionsFailedData ) => events.GetUserSubscriptionsFailed;
  pushToOtherUsersFailed: ( params: events.PushToOtherUsersFailedData ) => events.PushToOtherUsersFailed;
  pushedToOtherUsers: ( params: events.PushedToOtherUsersData ) => events.PushedToOtherUsers;
  pushedToCurrentUser: ( params: events.PushedToCurrentUserData ) => events.PushedToCurrentUser;
  pushToCurrentUserFailed: ( params: events.PushToCurrentUserFailedData ) => events.PushToCurrentUserFailed;
  pushToChannelsFailed: ( params: events.PushToChannelsFailedData ) => events.PushToChannelsFailed;
  pushedToChannel: ( params: events.PushedToChannelData ) => events.PushedToChannel;
  leftChannel: ( params: events.LeftChannelData ) => events.LeftChannel;
  leaveChannelsFailed: ( params: events.LeaveChannelsFailedData ) => events.LeaveChannelsFailed;
}

export interface Params {
  events: Events;
  commSettings: src.components.communication.CommSettings;
  httpServer: http.Server;
  production: boolean;
  getSubscriptionByIdFromStorage: src.components.storage.subscription.GetById;
  checkThrow: src.components.sharedLogic.moders.CheckThrow;
}

/******************************************************************************/

export interface PushToOtherUsers {
  ( userId: string, identifier: string, payload: any, forceThrow?: boolean ): Promise<any>;
}

export interface PushToCurrentUser {
  ( userId: string, identifier: string, payload: any, forceThrow?: boolean ): Promise<any>;
}

export interface PushToChannels {
  ( channels: string[], payload: any, forceThrow?: boolean ): Promise<any>;
}

export interface JoinChannels {
  ( userId: string, channels: string[], forceThrow?: boolean ): Promise<any>;
}

export interface LeaveChannels {
  ( userId: string, channels: string[], forceThrow?: boolean ): Promise<any>;
}

/******************************************************************************/
