/******************************************************************************/

import * as Promise from "bluebird";
import * as http from "http";

import * as storageUser from "../../storage/interfaces/core/user";
import * as moders from "../../helpers/moders/interfaces";
import * as events from "./events/interfaces";

/******************************************************************************/

export interface Constructor {
  new(
    events: events.Instance,
    checkThrow: moders.CheckThrow,
    getUserById: storageUser.Instance[ "getById" ],
    production: boolean,
    httpServer: http.Server
  ): Instance;
}

export interface Instance {
  readonly pushToOtherUsers: PushToOtherUsers;
  readonly pushToCurrentUser: PushToCurrentUser;
  readonly pushToChannels: PushToChannels;
  readonly joinChannels: JoinChannels;
  readonly leaveChannels: LeaveChannels;
}

export interface PushToOtherUsers {
  ( userId: string, identifier: string, payload: any, forceThrow?: boolean ): Promise<void>;
}

export interface PushToCurrentUser {
  ( userId: string, identifier: string, payload: any, forceThrow?: boolean ): Promise<void>;
}

export interface PushToChannels {
  ( channels: string[], payload: any, forceThrow?: boolean ): Promise<void>;
}

export interface JoinChannels {
  ( userId: string, channels: string[], forceThrow?: boolean ): Promise<void>;
}

export interface LeaveChannels {
  ( userId: string, channels: string[], forceThrow?: boolean ): Promise<void>;
}

/******************************************************************************/