/******************************************************************************/

import * as express from "express";

import * as interfaces from "../../../interfaces";
import * as communicationManagerInterfaces from "../../../interfaces/utilities/communication-manager";
import socketIoFactory from "./socket-io";
import nodeMailerFactory from "./node-mailer";

/******************************************************************************/

class BasicCommunicationManager implements interfaces.utilities.CommunicationManager {

  public readonly webSocket: communicationManagerInterfaces.WebSocket;
  public readonly mailAgent: communicationManagerInterfaces.MailAgent;
  readonly commSettings: communicationManagerInterfaces.CommSettings;

  middleware: express.RequestHandler[] = [];

  /*****************************************************************/

  constructor( private readonly params: communicationManagerInterfaces.Params ) {
    this.webSocket = params.webSocket;
    this.mailAgent = params.mailAgent;
  }

  /*****************************************************************/

}

/******************************************************************************/

export default ( config: interfaces.Config, commSettings: communicationManagerInterfaces.CommSettings ): interfaces.utilities.CommunicationManager => {
  return new BasicCommunicationManager( {
    webSocket: socketIoFactory( {
      emitEvent: config.eventManager.emit,
      commSettings: commSettings,
      checkThrow: config.utilities.sharedLogic.moders.checkThrow,
      httpServer: config.server,
      production: config.environment.production,
      getSubscriptionByIdFromStorage: config.utilities.storageManager.subscription.getById
    } ),
    mailAgent: nodeMailerFactory( {
      emitEvent: config.eventManager.emit,
      checkThrow: config.utilities.sharedLogic.moders.checkThrow,
      commSettings: commSettings
    } )
  } );
}

/******************************************************************************/
