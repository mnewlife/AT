/******************************************************************************/

import * as express from "express";

import * as src from "../../../src";
import * as communicationInterfaces from "../../../src/components/communication";
import socketIoFactory from "./socket-io";
import nodeMailerFactory from "./node-mailer";

/******************************************************************************/

class BasicCommunication implements src.components.Communication {

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

export default ( config: src.Config, commSettings: communicationInterfaces.CommSettings ): src.components.Communication => {
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
