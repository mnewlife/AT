/******************************************************************************/

import * as Promise from "bluebird";
import * as mongoose from "mongoose";
import MongoController from "../../mongo-controller";
import { Model, Model_Partial, ChannelMongooseModel } from "./model";

import * as interfaces from "../../../../../interfaces";
import * as storageInterfaces from "../../../../../interfaces/components/storage";
import * as sharedLogicInterfaces from "../../../../../interfaces/components/shared-logic";

import emitterFactory from "./event-emitter";

/******************************************************************************/

class MongoChannel extends MongoController implements storageInterfaces.call263.Channel {

  /*****************************************************************/

  protected readonly emitter: storageInterfaces.call263.channel.Emitter;
  protected readonly Model: mongoose.Model<mongoose.Document>;
  protected readonly mapDetails: sharedLogicInterfaces.dataStructures.MapDetails;

  /*****************************************************************/

  constructor( params: {
    emitter: storageInterfaces.call263.channel.Emitter;
    Model: mongoose.Model<mongoose.Document>;
    mapDetails: sharedLogicInterfaces.dataStructures.MapDetails;
    checkThrow: sharedLogicInterfaces.moders.CheckThrow;
  } ) {
    super( {
      emitter: params.emitter,
      Model: params.Model,
      mapDetails: params.mapDetails,
      checkThrow: params.checkThrow
    } );
    this.emitter = params.emitter;
  }

  /*****************************************************************/

  readonly get = ( filtrationCriteria: storageInterfaces.call263.channel.FiltrationCriteria, sortCriteria: storageInterfaces.call263.channel.SortCriteria, limit: number, forceThrow = false ): Promise<interfaces.dataModel.call263.channel.Super[]> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.makeConditions( filtrationCriteria );

      } )
      .then(( conditions: QueryConditions ) => {

        return this.makeSortCriteria( sortCriteria )
          .then(( sortString: string ) => {
            return Promise.resolve( {
              conditions: conditions,
              sortString: sortString
            } );
          } );

      } )
      .then(( holder: { conditions: QueryConditions, sortString: string } ) => {

        return this.find( holder.conditions, holder.sortString, limit );

      } )
      .then(( foundChannels: Model[] ) => {

        return this.convertToAbstract( foundChannels );

      } )
      .then(( convertedChannels: interfaces.dataModel.call263.channel.Super[] ) => {

        new Promise<interfaces.dataModel.call263.channel.Super[]>(( resolve, reject ) => {
          this.emitter.got( {
            filtrationCriteria: filtrationCriteria,
            sortCriteria: sortCriteria,
            limit: limit,
            ids: convertedChannels.map(( channel ) => {
              return channel.id;
            } )
          } );
          resolve();
        } );

        return Promise.resolve( convertedChannels );

      } )
      .catch(( reason: any ) => {

        new Promise<void>(( resolve, reject ) => {
          this.emitter.getFailed( {
            filtrationCriteria: filtrationCriteria,
            sortCriteria: sortCriteria,
            limit: limit,
            reason: reason
          } );
          resolve();
        } );

        return Promise.reject( {
          identifier: "GetFailed",
          data: {
            reason: reason
          }
        } );

      } );

  }

  /*****************************************************************/

  readonly getById = ( channelId: string, forceThrow = false ): Promise<interfaces.dataModel.call263.channel.Super> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.findById( mongoose.Types.ObjectId( channelId ) );

      } )
      .then(( foundChannel: Model ) => {

        return this.convertToAbstract( [ foundChannel ] );

      } )
      .then(( convertedChannels: interfaces.dataModel.call263.channel.Super[] ) => {

        new Promise<void>(( resolve, reject ) => {
          this.emitter.gotById( {
            id: channelId
          } );
        } );

        return Promise.resolve( convertedChannels[ 0 ] );

      } )
      .catch(( reason: any ) => {

        new Promise<void>(( resolve, reject ) => {
          this.emitter.getByIdFailed( {
            id: channelId,
            reason: reason
          } );
          resolve();
        } );

        if ( reason.identifier && reason.identifier === "DocumentNotFound" ) {
          return Promise.reject( {
            identifier: "DocumentNotFound",
            data: {
              reason: reason
            }
          } );
        } else {
          return Promise.reject( {
            identifier: "GetByIdFailed",
            data: {
              reason: reason
            }
          } );
        }

      } );

  }

  /*****************************************************************/

  readonly addBatch = ( channels: storageInterfaces.call263.channel.AddDetails[], forceThrow = false ): Promise<interfaces.dataModel.call263.channel.Super[]> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.saveMultipleDocuments( channels.map(( channel ) => {
          let channelDetails: Model_Partial = {
            allocated: channel.allocated,
            allocatedTo: mongoose.Types.ObjectId( channel.allocatedTo ),
            code: channel.code,
            phoneNumber: channel.phoneNumber,
            password: channel.password
          };
          return channelDetails;
        } ) );

      } )
      .then(( addedChannels: Model[] ) => {

        return this.convertToAbstract( addedChannels );

      } )
      .then(( convertedChannels: interfaces.dataModel.call263.channel.Super[] ) => {

        new Promise<void>(( resolve, reject ) => {
          this.emitter.added( {
            documents: convertedChannels
          } );
          resolve();
        } );

        return Promise.resolve( convertedChannels );

      } )
      .catch(( reason: any ) => {

        new Promise<any>(( resolve, reject ) => {
          this.emitter.addFailed( {
            details: channels,
            reason: reason
          } );
          resolve();
        } );

        return Promise.reject( {
          identifier: "AddBatchFailed",
          data: {
            reason: reason
          }
        } );

      } );

  }

  /*****************************************************************/

  readonly add = ( details: storageInterfaces.call263.channel.AddDetails, forceThrow = false ): Promise<interfaces.dataModel.call263.channel.Super> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        let channelDetails: Model_Partial = {
          allocated: details.allocated,
          allocatedTo: mongoose.Types.ObjectId( details.allocatedTo ),
          code: details.code,
          phoneNumber: details.phoneNumber,
          password: details.password
        };

        return this.saveDocument( channelDetails );

      } )
      .then(( addedChannel: Model ) => {

        return this.convertToAbstract( [ addedChannel ] );

      } )
      .then(( convertedChannels: interfaces.dataModel.call263.channel.Super[] ) => {

        new Promise<void>(( resolve, reject ) => {
          this.emitter.added( {
            documents: convertedChannels
          } );
          resolve();
        } );

        return Promise.resolve( convertedChannels[ 0 ] );

      } )
      .catch(( reason: any ) => {

        new Promise<void>(( resolve, reject ) => {
          this.emitter.addFailed( {
            details: [ details ],
            reason: reason
          } );
          resolve();
        } );

        return Promise.reject( {
          identifier: "AddFailed",
          data: {
            reason: reason
          }
        } );

      } );

  }

  /*****************************************************************/

  readonly update = ( filtrationCriteria: storageInterfaces.call263.channel.FiltrationCriteria, details: storageInterfaces.call263.channel.UpdateDetails, forceThrow = false ): Promise<interfaces.dataModel.call263.channel.Super[]> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.makeConditions( filtrationCriteria );

      } ).then(( conditions: QueryConditions ) => {

        return this.find( conditions, null, null );

      } )
      .then(( foundChannels: Model[] ) => {

        return Promise.all( foundChannels.map(( channel ) => {

          return this.generateUpdateDetails( channel, details )
            .then(( fedChannel: Model ) => {

              return new Promise<Model>(( resolve, reject ) => {
                fedChannel.save(( err: any ) => {
                  if ( err ) {
                    reject( err );
                  } else {
                    resolve( fedChannel );
                  }
                } );
              } );

            } );

        } ) );

      } )
      .then(( updatedChannels: Model[] ) => {

        return this.convertToAbstract( updatedChannels );

      } )
      .then(( updatedChannels: interfaces.dataModel.call263.channel.Super[] ) => {

        new Promise<any>(( resolve, reject ) => {
          this.emitter.updated( {
            conditions: filtrationCriteria,
            documents: updatedChannels
          } );
          resolve();
        } );

        return Promise.resolve( updatedChannels );

      } )
      .catch(( reason: any ) => {

        new Promise<any>(( resolve, reject ) => {
          this.emitter.updateFailed( {
            conditions: filtrationCriteria,
            updates: details,
            reason: reason
          } );
          resolve();
        } );

        return Promise.reject( {
          identifier: "UpdateFailed",
          data: {
            reason: reason
          }
        } );

      } );

  }

  /*****************************************************************/

  readonly updateById = ( channelId: string, details: storageInterfaces.call263.channel.UpdateDetails, forceThrow = false ): Promise<interfaces.dataModel.call263.channel.Super> => {

    let channelObjectId: mongoose.Types.ObjectId;

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.findById( mongoose.Types.ObjectId( channelId ) );

      } )
      .then(( channel: Model ) => {

        return this.generateUpdateDetails( channel, details )
          .then(( fedChannel: Model ) => {

            return new Promise<Model>(( resolve, reject ) => {
              fedChannel.save(( err: any ) => {
                if ( err ) {
                  reject( err );
                } else {
                  resolve( fedChannel );
                }
              } );
            } );

          } );

      } )
      .then(( updatedChannel: Model ) => {

        return this.convertToAbstract( [ updatedChannel ] );

      } )
      .then(( convertedChannels: interfaces.dataModel.call263.channel.Super[] ) => {

        new Promise<any>(( resolve, reject ) => {
          this.emitter.updated( {
            id: channelId,
            documents: convertedChannels
          } );
          resolve();
        } );

        return Promise.resolve( convertedChannels[ 0 ] );

      } )
      .catch(( reason: any ) => {

        new Promise<any>(( resolve, reject ) => {
          this.emitter.updateFailed( {
            id: channelId,
            updates: details,
            reason: reason
          } );
          resolve();
        } );

        return Promise.reject( {
          identifier: "UpdateFailed",
          data: {
            reason: reason
          }
        } );

      } );

  }

  /*****************************************************************/

  readonly remove = ( filtrationCriteria: storageInterfaces.call263.channel.FiltrationCriteria, forceThrow = false ): Promise<void> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.makeConditions( filtrationCriteria );

      } )
      .then(( conditions: QueryConditions ) => {

        return this.removeDocuments( conditions );

      } )
      .then(( response: any ) => {

        new Promise<any>(( resolve, reject ) => {
          this.emitter.removed( {
            conditions: filtrationCriteria
          } );
          resolve();
        } );

        return Promise.resolve();

      } )
      .catch(( reason: any ) => {

        new Promise<any>(( resolve, reject ) => {
          this.emitter.removeFailed( {
            conditions: filtrationCriteria,
            reason: reason
          } );
          resolve();
        } );

        return Promise.reject( {
          identifier: "RemoveFailed",
          data: {
            reason: reason
          }
        } );

      } );

  }

  /*****************************************************************/

  readonly removeById = ( channelId: string, forceThrow?: boolean ): Promise<void> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.removeDocuments( {
          "_id": mongoose.Types.ObjectId( channelId )
        } );

      } )
      .then(( response: any ) => {

        new Promise<any>(( resolve, reject ) => {
          this.emitter.removed( {
            id: channelId
          } );
          resolve();
        } );

        return Promise.resolve();

      } )
      .catch(( reason: any ) => {

        new Promise<any>(( resolve, reject ) => {
          this.emitter.removeFailed( {
            id: channelId,
            reason: reason
          } );
          resolve();
        } );

        return Promise.reject( {
          identifier: "RemoveFailed",
          data: {
            reason: reason
          }
        } );

      } );

  }

  /*****************************************************************/

  private readonly makeConditions = ( filtrationCriteria: storageInterfaces.call263.channel.FiltrationCriteria ): Promise<QueryConditions> => {

    return new Promise<QueryConditions>(( resolve, reject ) => {

      let conditions: QueryConditions = {};

      if ( filtrationCriteria.allocated ) {
        conditions[ "allocated" ] = filtrationCriteria.allocated;
      }

      if ( filtrationCriteria.allocatedTo ) {
        conditions[ "allocatedTo" ] = mongoose.Types.ObjectId( filtrationCriteria.allocatedTo );
      }

      if ( filtrationCriteria.code ) {
        conditions[ "code" ] = filtrationCriteria.code;
      }

      if ( filtrationCriteria.phoneNumber ) {
        conditions[ "phoneNumber" ] = filtrationCriteria.phoneNumber;
      }

      if ( filtrationCriteria.password ) {
        conditions[ "password" ] = filtrationCriteria.password;
      }

      if ( filtrationCriteria.textSearch ) {
        conditions.$text = { $search: filtrationCriteria.textSearch };
      }

      resolve( conditions );

    } );

  }

  /*****************************************************************/

  private readonly makeSortCriteria = ( sortCriteria: storageInterfaces.call263.channel.SortCriteria ): Promise<string> => {

    return new Promise<string>(( resolve, reject ) => {
      let sortString;
      sortString = sortCriteria.criteria;
      if ( sortCriteria.order === "Descending" ) {
        sortString = "-" + sortString;
      }
      resolve( sortString );
    } );

  }

  /*****************************************************************/

  private readonly generateUpdateDetails = ( document: Model, details: storageInterfaces.call263.channel.UpdateDetails ): Promise<Model> => {

    return new Promise<Model>(( resolve, reject ) => {

      if ( details.allocated ) {
        document.allocated = details.allocated;
      }

      if ( details.allocatedTo ) {
        document.allocatedTo = mongoose.Types.ObjectId( details.allocatedTo );
      }

      if ( details.code ) {
        document.code = details.code;
      }

      if ( details.phoneNumber ) {
        document.phoneNumber = details.phoneNumber;
      }

      if ( details.password ) {
        document.password = details.password;
      }

      resolve( document );

    } );

  }

  /*****************************************************************/

  private readonly convertToAbstract = ( channels: Model[], forceThrow = false ): Promise<interfaces.dataModel.call263.channel.Super[]> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return new Promise<interfaces.dataModel.call263.channel.Super[]>(( resolve, reject ) => {

          let returnChannels: interfaces.dataModel.call263.channel.Super[] = [];

          channels.forEach(( channel ) => {

            let returnChannel: interfaces.dataModel.call263.channel.Super = {
              id: ( <mongoose.Types.ObjectId>channel._id ).toHexString(),
              allocated: channel.allocated,
              allocatedTo: ( channel.allocatedTo as mongoose.Types.ObjectId ).toHexString(),
              code: channel.code,
              phoneNumber: channel.phoneNumber,
              password: channel.password,
              createdAt: channel.createdAt,
              updatedAt: channel.updatedAt
            };

            returnChannels.push( returnChannel );

          } );

          resolve( returnChannels );

        } );

      } );

  }

  /*****************************************************************/

}

/******************************************************************************/

interface QueryConditions {
  "allocated"?: boolean;
  "allocatedTo"?: mongoose.Types.ObjectId;
  "code"?: string;
  "phoneNumber"?: string;
  "password"?: string;
  $text?: { $search: string };
}

/******************************************************************************/

export default ( params: {
  emitEvent: interfaces.setupConfig.eventManager.Emit;
  mapDetails: sharedLogicInterfaces.dataStructures.MapDetails;
  checkThrow: sharedLogicInterfaces.moders.CheckThrow;
} ): storageInterfaces.call263.Channel => {
  return new MongoChannel( {
    emitter: emitterFactory( params.emitEvent ),
    Model: ChannelMongooseModel,
    mapDetails: params.mapDetails,
    checkThrow: params.checkThrow
  } );
}

/******************************************************************************/
