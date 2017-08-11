/******************************************************************************/

import * as express from "express";
import * as session from "./session";
import * as storage from "./storage";
import * as authentication from "./authentication";
import * as communication from "./communication";
import * as response from "./response";

/******************************************************************************/

export { session, storage, authentication, communication, response };

/******************************************************************************/

export interface MiddlewareBorn {
  middleware: express.RequestHandler[];
}

/******************************************************************************/

export interface Session extends MiddlewareBorn {
  readonly setCurrentUser: session.SetCurrentUser;
  readonly getCurrentUser: session.GetCurrentUser;
  readonly signOut: session.SignOut;
}

export interface Storage extends MiddlewareBorn {
  readonly call263: storage.Call263;
  readonly core: storage.Core;
  readonly grocRound: storage.GrocRound;
  readonly powertel: storage.Powertel;
  readonly routers: storage.Routers;
}

export interface Authentication extends MiddlewareBorn {
  readonly signIn: authentication.SignIn;
  readonly signOut: authentication.SignOut;
  readonly getCurrentUser: authentication.GetCurrentUser;
  readonly authPassword: authentication.AuthPassword;
  readonly createHashedPassword: authentication.CreateHashedPassword;
}

export interface Communication extends MiddlewareBorn {
  readonly webSocket: communication.WebSocket;
  readonly mailAgent: communication.MailAgent;
  readonly commSettings: communication.CommSettings;
}

export interface Response extends MiddlewareBorn {
  readonly send: response.Send;
}

/******************************************************************************/
