/******************************************************************************/

import * as http from "http";
import * as Promise from "bluebird";

import * as src from "../../../src";
import * as mailAgent from "./mail-agent";
import * as webSocket from "./web-socket";

/******************************************************************************/

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

export interface WebSocket {
  readonly pushToOtherUsers: webSocket.PushToOtherUsers;
  readonly pushToCurrentUser: webSocket.PushToCurrentUser;
  readonly pushToChannels: webSocket.PushToChannels;
  readonly joinChannels: webSocket.JoinChannels;
  readonly leaveChannels: webSocket.LeaveChannels;
}

/******************************************************************************/
