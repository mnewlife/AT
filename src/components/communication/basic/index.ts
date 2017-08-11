/******************************************************************************/

import * as express from "express";

import * as interfaces from "../../../interfaces";
import * as communicationInterfaces from "../../../interfaces/components/communication";
import socketIoFactory from "./socket-io";
import nodeMailerFactory from "./node-mailer";

/******************************************************************************/

class BasicCommunication implements interfaces.components.Communication {

  public readonly webSocket: communicationInterfaces.WebSocket;
  public readonly mailAgent: communicationInterfaces.MailAgent;
  readonly commSettings: communicationInterfaces.CommSettings;

  middleware: express.RequestHandler[] = [];

  /*****************************************************************/

  constructor( private readonly params: communicationInterfaces.Params ) {
    this.webSocket = params.webSocket;
    this.mailAgent = params.mailAgent;
  }

  /*****************************************************************/

}

/******************************************************************************/

export default ( config: interfaces.Config, commSettings: communicationInterfaces.CommSettings ): interfaces.components.Communication => {
  return new BasicCommunication( {
    webSocket: socketIoFactory( {
      emitEvent: config.eventManager.emit,
      commSettings: commSettings,
      checkThrow: config.components.sharedLogic.moders.checkThrow,
      httpServer: config.server,
      production: config.environment.production,
      getSubscriptionByIdFromStorage: config.components.storage.subscription.getById
    } ),
    mailAgent: nodeMailerFactory( {
      emitEvent: config.eventManager.emit,
      checkThrow: config.components.sharedLogic.moders.checkThrow,
      commSettings: commSettings
    } )
  } );
}

/******************************************************************************/
