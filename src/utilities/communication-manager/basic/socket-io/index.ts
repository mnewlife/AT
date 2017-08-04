/******************************************************************************/

import * as Promise from "bluebird";
import * as express from "express";
import * as mongoose from "mongoose";
import * as IO from "socket.io";

import * as interfaces from "../../../../interfaces/index";
import * as communicationManagerInterfaces from "../../../../interfaces/utilities/communication-manager/index";
import * as modersInterfaces from "../../../../interfaces/utilities/shared-logic/moders/index";
import * as eventManagerInterfaces from "../../../../interfaces/setup-config/event-manager/index";

import { SubscriptionModel, SubscriptionMongooseModel } from "../../../../utilities/storage-manager/mongodb/subscription/model/index";

/******************************************************************************/

class BasicWebSocket implements interfaces.utilities.communicationManager.WebSocket {

  private readonly emitter: interfaces.utilities.communicationManager.webSocket.Emitter;
  private readonly checkThrow: interfaces.utilities.sharedLogic.moders.CheckThrow;
  private io: SocketIO.Server;
  private readonly storageGetUserSubscriptions: interfaces.utilities.storageManager.subscription.Get;

  /*****************************************************************/

  constructor( params: any ) {
    if ( params.production ) {
      this.io = IO.listen( params.httpServer );
    } else {
      this.io = IO( params.httpServer );
    }
    this.emitter = params.emitter;
    this.checkThrow = params.checkThrow;
    this.storageGetUserSubscriptions = params.storageGetUserSubscriptions;
  }

  /*****************************************************************/

  private readonly getUserSocket = ( userId: string ): Promise<any> => {

    return new Promise<void>(( resolve, reject ) => {

      let ns: SocketIO.Namespace = this.io.of( "/" );

      for ( let id in ns.connected ) {
        let ref: any = ns.connected[ id ];
        if ( ref.userId && String( ref.userId ) === String( userId ) ) {
          return resolve( ref );
        }
      }

      return reject( {
        identifier: "SocketNotFound",
        data: {
          userId: userId
        }
      } );

    } )
      .catch(( reason: any ) => {

        new Promise<void>(( resolve, reject ) => {
          this.emitter.getUserSocketFailed( {
            userId: userId,
            reason: reason
          } );
          resolve();
        } );

        if ( reason && reason.identifier === "SocketNotFound" ) {
          return Promise.reject( {
            identifier: "SocketNotFound",
            data: {
              reason: reason
            }
          } );
        }

        return Promise.reject( {
          identifier: "GetUserSocketFailed",
          data: {
            reason: reason
          }
        } );

      } );

  }

  /*****************************************************************/

  readonly pushToOtherUsers = ( userId: string, identifier: string, payload: any, forceThrow = false ): Promise<void> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {
        return this.getUserSocket( userId );
      } )
      .then(( socket: SocketIO.Socket ) => {
        socket.broadcast.emit( identifier, payload );
        return Promise.resolve();
      } )
      .then(( response: any ) => {

        new Promise<void>(( resolve, reject ) => {
          this.emitter.pushedToOtherUsers( {
            userId: userId,
            identifier: identifier,
            payload: payload
          } );
          resolve();
        } );

        return Promise.resolve();

      } )
      .catch(( reason: any ) => {

        new Promise<void>(( resolve, reject ) => {
          this.emitter.pushToOtherUsersFailed( {
            userId: userId,
            identifier: identifier,
            payload: payload,
            reason: reason
          } );
          resolve();
        } );

        return Promise.reject( {
          identifier: "PushToOtherUsersFailed",
          data: {
            reason: reason
          }
        } );

      } );

  }

  /*****************************************************************/

  readonly pushToCurrentUser = ( userId: string, identifier: string, payload: any, forceThrow = false ): Promise<void> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {
        return this.getUserSocket( userId );
      } )
      .then(( socket: SocketIO.Socket ) => {
        socket.emit( identifier, payload );
        return Promise.resolve();
      } )
      .then(( response: any ) => {
        new Promise<void>(( resolve, reject ) => {
          this.emitter.pushedToCurrentUser( {
            userId: userId,
            identifier: identifier,
            payload: payload
          } );
          resolve();
        } );
        return Promise.resolve();
      } )
      .catch(( reason: any ) => {

        new Promise<void>(( resolve, reject ) => {
          this.emitter.pushToCurrentUserFailed( {
            userId: userId,
            identifier: identifier,
            payload: payload,
            reason: reason
          } );
          resolve();
        } );

        return Promise.reject( {
          identifier: "PushToCurrentUserFailed",
          data: {
            reason: reason
          }
        } );

      } );

  }

  /*****************************************************************/

  readonly pushToChannels = ( channels: string[], payload: any, forceThrow = false ): Promise<void> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return new Promise<void>(( resolve, reject ) => {

          channels.forEach(( channel: string ) => {
            this.io.sockets.in( channel ).emit( channel, payload );
            new Promise<void>(( resolve, reject ) => {
              this.emitter.pushedToChannel( {
                channel: channel,
                payload: payload
              } );
              resolve();
            } );
          } );

          resolve();

        } );

      } )
      .catch(( reason: any ) => {

        new Promise<void>(( resolve, reject ) => {
          this.emitter.pushToChannelsFailed( {
            channels: channels,
            payload: payload,
            reason: reason
          } );
          resolve()
        } );

        return Promise.reject( {
          identifier: "PushToChannelsFailed",
          data: {
            reason: reason
          }
        } );

      } );

  }

  /*****************************************************************/

  readonly joinChannels = ( userId: string, channels: string[], forceThrow = false ): Promise<void> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {
        return this.getUserSocket( userId );
      } )
      .then(( socket: SocketIO.Socket ) => {

        channels.forEach(( channel: string ) => {
          socket.join( channel );
          new Promise<void>(( resolve, reject ) => {
            this.emitter.joinedChannel( {
              channel: channel,
              userId: userId
            } );
            resolve();
          } );
        } );

        return Promise.resolve();

      } )
      .catch(( reason: any ) => {

        new Promise<void>(( resolve, reject ) => {
          this.emitter.joinChannelsFailed( {
            channels: channels,
            userId: userId,
            reason: reason
          } );
          resolve();
        } );

        return Promise.reject( {
          identifier: "JoinChannelsFailed",
          data: {
            reason: reason
          }
        } );

      } );

  }

  /*****************************************************************/

  readonly leaveChannels = ( userId: string, channels: string[], forceThrow = false ): Promise<void> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {
        return this.getUserSocket( userId );
      } )
      .then(( socket: SocketIO.Socket ) => {

        channels.forEach(( channel: string ) => {
          socket.leave( channel );
          new Promise<void>(( resolve, reject ) => {
            this.emitter.leftChannel( {
              channel: channel,
              userId: userId
            } );
            resolve();
          } );
        } );

        return Promise.resolve();

      } )
      .catch(( reason: any ) => {

        new Promise<void>(( resolve, reject ) => {
          this.emitter.leaveChannelsFailed( {
            channels: channels,
            userId: userId,
            reason: reason
          } );
          resolve();
        } );

        return Promise.reject( {
          identifier: "LeaveChannelsFailed",
          data: {
            reason: reason
          }
        } );

      } );

  }

  /*****************************************************************/

  private readonly setMware = (): void => {

    this.io.use(( socket: any, next ) => {

      if ( !socket || !socket.handshake || !socket.handshake.query ) {
        return;
      }

      if ( socket.handshake.query.userData ) {

        let user = socket.handshake.query.userData;
        if ( !user._id ) {
          return;
        }

        socket.userId = user._id;

        this.storageGetUserSubscriptions( {
          userId: mongoose.Types.ObjectId( user._id )
        }, null, null )
          .then(( subscriptions: SubscriptionModel[] ) => {
            return new Promise<string[]>(( resolve, reject ) => {
              let channels: string[] = subscriptions.map(( subscription: SubscriptionModel ) => {
                return subscription.subscription;
              } );
              resolve( channels );
            } );
          } )
          .then(( channels: string[] ) => {

            channels.forEach(( channel: string ) => {
              socket.join( channel );
              new Promise<void>(( resolve, reject ) => {
                this.emitter.joinedChannel( {
                  channel: channel,
                  userId: user._id
                } );
              } );
            } );

          } )
          .catch(( reason: any ) => {

            new Promise<void>(( resolve, reject ) => {
              this.emitter.getUserSubscriptionsFailed( {
                userId: user._id,
                reason: reason
              } );
            } );

          } );

      }

      return next();

    } );

  }

  /*****************************************************************/

}

/******************************************************************************/

export default ( params: communicationManagerInterfaces.WebSocketFactoryParams ): communicationManagerInterfaces.WebSocket => {

  return new BasicWebSocket( {
    commSettings: params.commSettings,
    checkThrow: params.checkThrow,
    httpServer: params.httpServer,
    production: params.production,
    storageGetUserSubscriptions: params.storageGetUserSubscriptions
  } );

}

/******************************************************************************/
