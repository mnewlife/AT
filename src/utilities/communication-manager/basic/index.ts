/******************************************************************************/

import * as Promise from "bluebird";
import * as express from "express";

import * as interfaces from "../../../interfaces/index";
import * as communicationManagerInterfaces from "../../../interfaces/utilities/communication-manager/index";

import socketIoFactory from "./socket-io/index";
import nodeMailerFactory from "./node-mailer/index";

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
      commSettings : commSettings ,
      checkThrow : config.utilities.sharedLogic.moders.checkThrow ,
      httpServer : config.server ,
      production : config.environment.production ,
      storageGetUserSubscriptions : config.utilities.storageManager.subscription.get
    } ),
    mailAgent: nodeMailerFactory( config.eventManager.emit, config.utilities.sharedLogic.moders.checkThrow , commSettings )
  } );

}

/******************************************************************************/
