/******************************************************************************/

import * as http from "http";
import * as express from "express";
import * as Promise from "bluebird";

import * as interfaces from "../../../interfaces/index";
import * as mailAgent from "./mail-agent/index";
import * as webSocket from "./web-socket/index";

export { mailAgent, webSocket };

/******************************************************************************/

export interface Params {
  mailAgent: MailAgent;
  webSocket: WebSocket;
}

export interface CommSettings {
  readonly mailSendingAddress: string;
  readonly mailSendingAddressPassword: string;
}

export interface MailAgent {
  readonly sendEmail: mailAgent.SendEmail;
}

export interface WebSocketFactoryParams {
  commSettings : CommSettings;
  checkThrow : interfaces.utilities.sharedLogic.moders.CheckThrow;
  httpServer : http.Server;
  production : boolean;
  storageGetUserSubscriptions : interfaces.utilities.storageManager.subscription.Get
}

export interface WebSocket {
  readonly pushToOtherUsers: webSocket.PushToOtherUsers;
  readonly pushToCurrentUser: webSocket.PushToCurrentUser;
  readonly pushToChannels: webSocket.PushToChannels;
  readonly joinChannels: webSocket.JoinChannels;
  readonly leaveChannels: webSocket.LeaveChannels;
}

/******************************************************************************/
