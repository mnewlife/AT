/******************************************************************************/

import * as Promise from "bluebird";
import * as http from "http";
import * as IO from "socket.io";

import * as dataModel from "../../../../data-model";
import * as eventListener from "../../../../event-listener/interfaces";
import * as moders from "../../../helpers/moders/interfaces";
import * as storage from "../../../storage/interfaces";

import * as interfaces from "../interfaces";
import * as Events from "../events/interfaces";

/******************************************************************************/

export default class SocketIO implements interfaces.Instance {

  /*****************************************************************/

  private io: SocketIO.Server;

  /*****************************************************************/

  constructor(
    private readonly events: Events.Instance,
    private readonly checkThrow: moders.CheckThrow,
    private readonly getSubs: storage.core.subscription.Instance[ "get" ],
    private readonly production: boolean,
    httpServer: http.Server
  ) {

    this.io = ( this.production ) ? IO.listen( httpServer ) : IO( httpServer );

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
          this.events.getUserSocketFailed( {
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
          this.events.pushedToOtherUsers( {
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
          this.events.pushToOtherUsersFailed( {
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
          this.events.pushedToCurrentUser( {
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
          this.events.pushToCurrentUserFailed( {
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
              this.events.pushedToChannel( {
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
          this.events.pushToChannelsFailed( {
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
            this.events.joinedChannel( {
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
          this.events.joinChannelsFailed( {
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
            this.events.leftChannel( {
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
          this.events.leaveChannelsFailed( {
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

        socket.userId = user.id;

        this.getSubs( { userId: user.id }, null, null )
          .then(( subscriptions: dataModel.core.subscription.Super[] ) => {
            
            return new Promise<string[]>(( resolve, reject ) => {

              let channels: string[] = subscriptions.map(( subscription: dataModel.core.subscription.Super ) => {
                return subscription.subscription;
              } );

              resolve( channels );

            } );

          } )
          .then(( channels: string[] ) => {

            channels.forEach(( channel: string ) => {

              socket.join( channel );
              
              new Promise<void>(( resolve, reject ) => {
                this.events.joinedChannel( {
                  channel: channel,
                  userId: user._id
                } );
              } );

            } );

          } )
          .catch(( reason: any ) => {

            new Promise<void>(( resolve, reject ) => {
              this.events.getUserSubscriptionsFailed( {
                userId: user._id,
                reason: reason
              } );
              resolve();
            } );

          } );

      }

      return next();

    } );

  }

  /*****************************************************************/

}

/******************************************************************************/