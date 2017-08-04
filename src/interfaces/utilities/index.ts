/******************************************************************************/

import * as express from "express";
import * as sharedLogic from "./shared-logic";
import * as sessionManager from "./session-manager";
import * as storageManager from "./storage-manager";
import * as authenticationManager from "./authentication-manager";
import * as communicationManager from "./communication-manager";
import * as responseManager from "./response-manager";

/******************************************************************************/

export { sharedLogic, sessionManager, storageManager, authenticationManager, communicationManager, responseManager };

/******************************************************************************/

export interface MiddlewareBorn {
  middleware: express.RequestHandler[];
}

/******************************************************************************/

export interface SharedLogic {
  readonly dataStructures: sharedLogic.DataStructures;
  readonly moders: sharedLogic.Moders;
  readonly numbers: sharedLogic.Numbers;
  readonly middleware: sharedLogic.Middleware;
}

export interface SessionManager extends MiddlewareBorn {
  readonly setCurrentUser: sessionManager.SetCurrentUser;
  readonly getCurrentUser: sessionManager.GetCurrentUser;
  readonly signOut: sessionManager.SignOut;
}

export interface StorageManager extends MiddlewareBorn {
  readonly user: storageManager.User;
  readonly event: storageManager.Event;
  readonly progression: storageManager.Progression;
  readonly notification: storageManager.Notification;
  readonly subscription: storageManager.Subscription;

  readonly amendmentRequest: storageManager.AmendmentRequest;
  readonly customerGroup: storageManager.CustomerGroup;
  readonly productType: storageManager.ProductType;
  readonly product: storageManager.Product;
  readonly order: storageManager.Order;
}

export interface AuthenticationManager extends MiddlewareBorn {
  readonly signIn: authenticationManager.SignIn;
  readonly signOut: authenticationManager.SignOut;
  readonly getCurrentUser: authenticationManager.GetCurrentUser;
  readonly authPassword: authenticationManager.AuthPassword;
  readonly createHashedPassword: authenticationManager.CreateHashedPassword;
}

export interface CommunicationManager extends MiddlewareBorn {
  readonly webSocket: communicationManager.WebSocket;
  readonly mailAgent: communicationManager.MailAgent;
  readonly commSettings: communicationManager.CommSettings;
}

export interface ResponseManager extends MiddlewareBorn {
  readonly send: responseManager.Send;
}

/******************************************************************************/
