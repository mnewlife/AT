/******************************************************************************/

import * as express from "express";
import * as Promise from "bluebird";

import * as interfaces from "../../../../interfaces/index";
import * as events from "../../../../interfaces/events/utilities/communication-manager/web-socket/index";

/******************************************************************************/

export interface Emitter {
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
  emitEvent : interfaces.setupConfig.eventManager.Emit;
  checkThrow : interfaces.utilities.sharedLogic.moders.CheckThrow;
  commSettings : interfaces.utilities.communicationManager.CommSettings;
}

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
