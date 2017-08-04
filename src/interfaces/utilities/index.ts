/******************************************************************************/

import * as express from "express";

import * as interfaces from "../../interfaces/index";

import * as sharedLogic from "./shared-logic/index";
import * as sessionManager from "./session-manager/index";
import * as storageManager from "./storage-manager/index";
import * as authenticationManager from "./authentication-manager/index";
import * as communicationManager from "./communication-manager/index";
import * as responseManager from "./response-manager/index";

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
  readonly user: storageManager.StorageUser;
  readonly event: storageManager.StorageEvent;
  readonly progression: storageManager.StorageProgression;
  readonly notification: storageManager.StorageNotification;
  readonly invitation: storageManager.StorageInvitation;
  readonly subscription: storageManager.StorageSubscription;

  readonly channel: storageManager.StorageChannel;
  readonly payment: storageManager.StoragePayment;
  readonly airtimeTransfer: storageManager.StorageAirtimeTransfer;
  readonly call: storageManager.StorageCall;

  readonly shop: storageManager.StorageShop;
  readonly product: storageManager.StorageProduct;
  readonly price: storageManager.StoragePrice;
  readonly round: storageManager.StorageRound;
  readonly roundContributor: storageManager.StorageRoundContributor;
  readonly track: storageManager.StorageTrack;
  readonly trackProduct: storageManager.StorageTrackProduct;
  readonly contribution: storageManager.StorageContribution;
  readonly deliveryFee: storageManager.StorageDeliveryFee;
  readonly cart: storageManager.StorageCart;
  readonly cartProduct: storageManager.StorageCartProduct;
  readonly disbursement: storageManager.StorageDisbursement;
  readonly article: storageManager.StorageArticle;
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
