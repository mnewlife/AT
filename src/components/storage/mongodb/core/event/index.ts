/******************************************************************************/

import * as Promise from "bluebird";
import * as mongoose from "mongoose";
import MongoController from "../../mongo-controller";
import { Model, Model_Partial, EventMongooseModel } from "./model";

import * as interfaces from "../../../../../interfaces";
import * as storageInterfaces from "../../../../../interfaces/components/storage";
import * as sharedLogicInterfaces from "../../../../../interfaces/components/shared-logic";

import emitterFactory from "./event-emitter";

/******************************************************************************/

class MongoEvent extends MongoController implements storageInterfaces.core.Event {

  /*****************************************************************/

  protected readonly emitter: storageInterfaces.core.event.Emitter;
  protected readonly Model: mongoose.Model<mongoose.Document>;
  protected readonly mapDetails: sharedLogicInterfaces.dataStructures.MapDetails;

  /*****************************************************************/

  constructor( params: {
    emitter: storageInterfaces.core.event.Emitter;
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

  readonly get = ( filtrationCriteria: storageInterfaces.core.event.FiltrationCriteria, sortCriteria: storageInterfaces.core.event.SortCriteria, limit: number, forceThrow = false ): Promise<interfaces.dataModel.core.event.Super[]> => {

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
      .then(( foundEvents: Model[] ) => {

        return this.convertToAbstract( foundEvents );

      } )
      .then(( convertedEvents: interfaces.dataModel.core.event.Super[] ) => {

        new Promise<interfaces.dataModel.core.event.Super[]>(( resolve, reject ) => {
          this.emitter.got( {
            filtrationCriteria: filtrationCriteria,
            sortCriteria: sortCriteria,
            limit: limit,
            ids: convertedEvents.map(( event ) => {
              return event.id;
            } )
          } );
          resolve();
        } );

        return Promise.resolve( convertedEvents );

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

  readonly getById = ( userId: string, forceThrow = false ): Promise<interfaces.dataModel.core.event.Super> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.findById( mongoose.Types.ObjectId( userId ) );

      } )
      .then(( foundEvent: Model ) => {

        return this.convertToAbstract( [ foundEvent ] );

      } )
      .then(( convertedEvents: interfaces.dataModel.core.event.Super[] ) => {

        new Promise<void>(( resolve, reject ) => {
          this.emitter.gotById( {
            id: userId
          } );
        } );

        return Promise.resolve( convertedEvents[ 0 ] );

      } )
      .catch(( reason: any ) => {

        new Promise<void>(( resolve, reject ) => {
          this.emitter.getByIdFailed( {
            id: userId,
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

  readonly addBatch = ( events: storageInterfaces.core.event.AddDetails[], forceThrow = false ): Promise<interfaces.dataModel.core.event.Super[]> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.saveMultipleDocuments( events.map(( event ) => {
          let eventDetails: Model_Partial = {
            context: event.context,
            identifier: event.identifier,
            tags: event.tags,
            data: event.data
          };
          return eventDetails;
        } ) );

      } )
      .then(( addedEvents: Model[] ) => {

        return this.convertToAbstract( addedEvents );

      } )
      .then(( convertedEvents: interfaces.dataModel.core.event.Super[] ) => {

        new Promise<void>(( resolve, reject ) => {
          this.emitter.added( {
            documents: convertedEvents
          } );
          resolve();
        } );

        return Promise.resolve( convertedEvents );

      } )
      .catch(( reason: any ) => {

        new Promise<any>(( resolve, reject ) => {
          this.emitter.addFailed( {
            details: events,
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

  readonly add = ( details: storageInterfaces.core.event.AddDetails, forceThrow = false ): Promise<interfaces.dataModel.core.event.Super> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        let eventDetails: Model_Partial = {
          context: details.context,
          identifier: details.identifier,
          tags: details.tags,
          data: details.data
        };

        return this.saveDocument( eventDetails );

      } )
      .then(( addedEvent: Model ) => {

        return this.convertToAbstract( [ addedEvent ] );

      } )
      .then(( convertedEvents: interfaces.dataModel.core.event.Super[] ) => {

        new Promise<void>(( resolve, reject ) => {
          this.emitter.added( {
            documents: convertedEvents
          } );
          resolve();
        } );

        return Promise.resolve( convertedEvents[ 0 ] );

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

  readonly update = ( filtrationCriteria: storageInterfaces.core.event.FiltrationCriteria, details: storageInterfaces.core.event.UpdateDetails, forceThrow = false ): Promise<interfaces.dataModel.core.event.Super[]> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.makeConditions( filtrationCriteria );

      } ).then(( conditions: QueryConditions ) => {

        return this.find( conditions, null, null );

      } )
      .then(( foundEvents: Model[] ) => {

        return Promise.all( foundEvents.map(( event ) => {

          return this.generateUpdateDetails( event, details )
            .then(( fedEvent: Model ) => {

              return new Promise<Model>(( resolve, reject ) => {
                fedEvent.save(( err: any ) => {
                  if ( err ) {
                    reject( err );
                  } else {
                    resolve( fedEvent );
                  }
                } );
              } );

            } );

        } ) );

      } )
      .then(( updatedEvents: Model[] ) => {

        return this.convertToAbstract( updatedEvents );

      } )
      .then(( updatedEvents: interfaces.dataModel.core.event.Super[] ) => {

        new Promise<any>(( resolve, reject ) => {
          this.emitter.updated( {
            conditions: filtrationCriteria,
            documents: updatedEvents
          } );
          resolve();
        } );

        return Promise.resolve( updatedEvents );

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

  readonly updateById = ( userId: string, details: storageInterfaces.core.event.UpdateDetails, forceThrow = false ): Promise<interfaces.dataModel.core.event.Super> => {

    let userObjectId: mongoose.Types.ObjectId;

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.findById( mongoose.Types.ObjectId( userId ) );

      } )
      .then(( event: Model ) => {

        return this.generateUpdateDetails( event, details )
          .then(( fedEvent: Model ) => {

            return new Promise<Model>(( resolve, reject ) => {
              fedEvent.save(( err: any ) => {
                if ( err ) {
                  reject( err );
                } else {
                  resolve( fedEvent );
                }
              } );
            } );

          } );

      } )
      .then(( updatedEvent: Model ) => {

        return this.convertToAbstract( [ updatedEvent ] );

      } )
      .then(( convertedEvents: interfaces.dataModel.core.event.Super[] ) => {

        new Promise<any>(( resolve, reject ) => {
          this.emitter.updated( {
            id: userId,
            documents: convertedEvents
          } );
          resolve();
        } );

        return Promise.resolve( convertedEvents[ 0 ] );

      } )
      .catch(( reason: any ) => {

        new Promise<any>(( resolve, reject ) => {
          this.emitter.updateFailed( {
            id: userId,
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

  readonly remove = ( filtrationCriteria: storageInterfaces.core.event.FiltrationCriteria, forceThrow = false ): Promise<void> => {

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

  readonly removeById = ( userId: string, forceThrow?: boolean ): Promise<void> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.removeDocuments( {
          "_id": mongoose.Types.ObjectId( userId )
        } );

      } )
      .then(( response: any ) => {

        new Promise<any>(( resolve, reject ) => {
          this.emitter.removed( {
            id: userId
          } );
          resolve();
        } );

        return Promise.resolve();

      } )
      .catch(( reason: any ) => {

        new Promise<any>(( resolve, reject ) => {
          this.emitter.removeFailed( {
            id: userId,
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

  private readonly makeConditions = ( filtrationCriteria: storageInterfaces.core.event.FiltrationCriteria ): Promise<QueryConditions> => {

    return new Promise<QueryConditions>(( resolve, reject ) => {

      let conditions: QueryConditions = {};

      if ( filtrationCriteria.context ) {
        conditions[ "context" ] = filtrationCriteria.context;
      }

      if ( filtrationCriteria.identifier ) {
        conditions[ "identifier" ] = filtrationCriteria.identifier;
      }

      if ( filtrationCriteria.tags ) {
        conditions[ "tags" ] = { $all: filtrationCriteria.tags };
      }

      if ( filtrationCriteria.textSearch ) {
        conditions.$text = { $search: filtrationCriteria.textSearch };
      }

      resolve( conditions );

    } );

  }

  /*****************************************************************/

  private readonly makeSortCriteria = ( sortCriteria: storageInterfaces.core.event.SortCriteria ): Promise<string> => {

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

  private readonly generateUpdateDetails = ( document: Model, details: storageInterfaces.core.event.UpdateDetails ): Promise<Model> => {

    return new Promise<Model>(( resolve, reject ) => {

      if ( details.context ) {
        document.context = details.context;
      }

      if ( details.identifier ) {
        document.identifier = details.identifier;
      }

      if ( details.tagsToAdd ) {
        details.tagsToAdd.forEach(( tag ) => {
          document.tags.push( tag );
        } );
      }

      if ( details.tagsToRemove ) {
        details.tagsToRemove.forEach(( tag ) => {
          let matches = document.tags.filter(( subject ) => {
            return ( subject == tag );
          } );
          if ( matches.length ) {
            matches.forEach(( match ) => {
              document.tags.splice( document.tags.indexOf( match ) );
            } );
          }
        } );
      }

      if ( details.data ) {
        document.data = details.data;
      }

      resolve( document );

    } );

  }

  /*****************************************************************/

  private readonly convertToAbstract = ( events: Model[], forceThrow = false ): Promise<interfaces.dataModel.core.event.Super[]> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return new Promise<interfaces.dataModel.core.event.Super[]>(( resolve, reject ) => {

          let returnEvents: interfaces.dataModel.core.event.Super[] = [];

          events.forEach(( event ) => {

            let returnEvent: interfaces.dataModel.core.event.Super = {
              id: ( <mongoose.Types.ObjectId>event._id ).toHexString(),
              context: event.context,
              identifier: event.identifier,
              tags: event.tags,
              data: event.data,
              createdAt: event.createdAt,
              updatedAt: event.updatedAt
            };
            
            returnEvents.push( returnEvent );

          } );

          resolve( returnEvents );

        } );

      } );

  }

  /*****************************************************************/

}

/******************************************************************************/

interface QueryConditions {
  "context"?: string;
  "identifier"?: string;
  "tags"?: { $all: string[] };
  $text?: { $search: string };
}

/******************************************************************************/

export default ( params: {
  emitEvent: interfaces.setupConfig.eventManager.Emit;
  mapDetails: sharedLogicInterfaces.dataStructures.MapDetails;
  checkThrow: sharedLogicInterfaces.moders.CheckThrow;
} ): storageInterfaces.core.Event => {
  return new MongoEvent( {
    emitter: emitterFactory( params.emitEvent ),
    Model: EventMongooseModel,
    mapDetails: params.mapDetails,
    checkThrow: params.checkThrow
  } );
}

/******************************************************************************/
