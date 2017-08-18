/******************************************************************************/

import * as Promise from "bluebird";
import * as mongoose from "mongoose";
import MongoController from "../../mongo-controller";
import { Model, Model_Partial, AirtimePaymentMongooseModel } from "./model";

import * as src from "../../../../../src";
import * as storageInterfaces from "../../../../../src/components/storage";
import * as sharedLogicInterfaces from "../../../../../src/components/shared-logic";

import eventsFactory from "./events";

/******************************************************************************/

class MongoAirtimePayment extends MongoController implements storageInterfaces.call263.AirtimePayment {

  /*****************************************************************/

  protected readonly events: storageInterfaces.call263.airtimePayment.Events;
  protected readonly Model: mongoose.Model<mongoose.Document>;
  protected readonly mapDetails: sharedLogicInterfaces.dataStructures.MapDetails;

  /*****************************************************************/

  constructor( params: {
    events: storageInterfaces.call263.airtimePayment.Events;
    Model: mongoose.Model<mongoose.Document>;
    mapDetails: sharedLogicInterfaces.dataStructures.MapDetails;
    checkThrow: sharedLogicInterfaces.moders.CheckThrow;
  } ) {
    super( {
      events: params.events,
      Model: params.Model,
      mapDetails: params.mapDetails,
      checkThrow: params.checkThrow
    } );
    this.events = params.events;
  }

  /*****************************************************************/

  readonly get = ( filtrationCriteria: storageInterfaces.call263.airtimePayment.FiltrationCriteria, sortCriteria: storageInterfaces.call263.airtimePayment.SortCriteria, limit: number, forceThrow = false ): Promise<dataModel.call263.airtimePayment.Super[]> => {

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
      .then(( foundAirtimePayments: Model[] ) => {

        return this.convertToAbstract( foundAirtimePayments );

      } )
      .then(( convertedAirtimePayments: dataModel.call263.airtimePayment.Super[] ) => {

        new Promise<dataModel.call263.airtimePayment.Super[]>(( resolve, reject ) => {
          this.events.got( {
            filtrationCriteria: filtrationCriteria,
            sortCriteria: sortCriteria,
            limit: limit,
            ids: convertedAirtimePayments.map(( airtimePayment ) => {
              return airtimePayment.id;
            } )
          } );
          resolve();
        } );

        return Promise.resolve( convertedAirtimePayments );

      } )
      .catch(( reason: any ) => {

        new Promise<void>(( resolve, reject ) => {
          this.events.getFailed( {
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

  readonly getById = ( airtimePaymentId: string, forceThrow = false ): Promise<dataModel.call263.airtimePayment.Super> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.findById( mongoose.Types.ObjectId( airtimePaymentId ) );

      } )
      .then(( foundAirtimePayment: Model ) => {

        return this.convertToAbstract( [ foundAirtimePayment ] );

      } )
      .then(( convertedAirtimePayments: dataModel.call263.airtimePayment.Super[] ) => {

        new Promise<void>(( resolve, reject ) => {
          this.events.gotById( {
            id: airtimePaymentId
          } );
        } );

        return Promise.resolve( convertedAirtimePayments[ 0 ] );

      } )
      .catch(( reason: any ) => {

        new Promise<void>(( resolve, reject ) => {
          this.events.getByIdFailed( {
            id: airtimePaymentId,
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

  readonly addBatch = ( airtimePayments: storageInterfaces.call263.airtimePayment.AddDetails[], forceThrow = false ): Promise<dataModel.call263.airtimePayment.Super[]> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.saveMultipleDocuments( airtimePayments.map(( airtimePayment ) => {
          let airtimePaymentDetails: Model_Partial = {
            user: {
              userId: mongoose.Types.ObjectId( airtimePayment.user.userId ),
              emailAddress: airtimePayment.user.emailAddress,
              fullName: airtimePayment.user.fullName,
              createdAt: new Date(),
              updatedAt: new Date()
            },
            channelId: mongoose.Types.ObjectId( airtimePayment.channelId ),
            transaction: {
              identifier: airtimePayment.transaction.identifier,
              amount: airtimePayment.transaction.amount,
              method: airtimePayment.transaction.method,
              createdAt: new Date(),
              updatedAt: new Date()
            }
          };
          return airtimePaymentDetails;
        } ) );

      } )
      .then(( addedAirtimePayments: Model[] ) => {

        return this.convertToAbstract( addedAirtimePayments );

      } )
      .then(( convertedAirtimePayments: dataModel.call263.airtimePayment.Super[] ) => {

        new Promise<void>(( resolve, reject ) => {
          this.events.added( {
            documents: convertedAirtimePayments
          } );
          resolve();
        } );

        return Promise.resolve( convertedAirtimePayments );

      } )
      .catch(( reason: any ) => {

        new Promise<any>(( resolve, reject ) => {
          this.events.addFailed( {
            details: airtimePayments,
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

  readonly add = ( details: storageInterfaces.call263.airtimePayment.AddDetails, forceThrow = false ): Promise<dataModel.call263.airtimePayment.Super> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        let airtimePaymentDetails: Model_Partial = {
          user: {
            userId: mongoose.Types.ObjectId( details.user.userId ),
            emailAddress: details.user.emailAddress,
            fullName: details.user.fullName,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          channelId: mongoose.Types.ObjectId( details.channelId ),
          transaction: {
            identifier: details.transaction.identifier,
            amount: details.transaction.amount,
            method: details.transaction.method,
            createdAt: new Date(),
            updatedAt: new Date()
          }
        };

        return this.saveDocument( airtimePaymentDetails );

      } )
      .then(( addedAirtimePayment: Model ) => {

        return this.convertToAbstract( [ addedAirtimePayment ] );

      } )
      .then(( convertedAirtimePayments: dataModel.call263.airtimePayment.Super[] ) => {

        new Promise<void>(( resolve, reject ) => {
          this.events.added( {
            documents: convertedAirtimePayments
          } );
          resolve();
        } );

        return Promise.resolve( convertedAirtimePayments[ 0 ] );

      } )
      .catch(( reason: any ) => {

        new Promise<void>(( resolve, reject ) => {
          this.events.addFailed( {
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

  readonly update = ( filtrationCriteria: storageInterfaces.call263.airtimePayment.FiltrationCriteria, details: storageInterfaces.call263.airtimePayment.UpdateDetails, forceThrow = false ): Promise<dataModel.call263.airtimePayment.Super[]> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.makeConditions( filtrationCriteria );

      } ).then(( conditions: QueryConditions ) => {

        return this.find( conditions, null, null );

      } )
      .then(( foundAirtimePayments: Model[] ) => {

        return Promise.all( foundAirtimePayments.map(( airtimePayment ) => {

          return this.generateUpdateDetails( airtimePayment, details )
            .then(( fedAirtimePayment: Model ) => {

              return new Promise<Model>(( resolve, reject ) => {
                fedAirtimePayment.save(( err: any ) => {
                  if ( err ) {
                    reject( err );
                  } else {
                    resolve( fedAirtimePayment );
                  }
                } );
              } );

            } );

        } ) );

      } )
      .then(( updatedAirtimePayments: Model[] ) => {

        return this.convertToAbstract( updatedAirtimePayments );

      } )
      .then(( updatedAirtimePayments: dataModel.call263.airtimePayment.Super[] ) => {

        new Promise<any>(( resolve, reject ) => {
          this.events.updated( {
            conditions: filtrationCriteria,
            documents: updatedAirtimePayments
          } );
          resolve();
        } );

        return Promise.resolve( updatedAirtimePayments );

      } )
      .catch(( reason: any ) => {

        new Promise<any>(( resolve, reject ) => {
          this.events.updateFailed( {
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

  readonly updateById = ( airtimePaymentId: string, details: storageInterfaces.call263.airtimePayment.UpdateDetails, forceThrow = false ): Promise<dataModel.call263.airtimePayment.Super> => {

    let airtimePaymentObjectId: mongoose.Types.ObjectId;

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.findById( mongoose.Types.ObjectId( airtimePaymentId ) );

      } )
      .then(( airtimePayment: Model ) => {

        return this.generateUpdateDetails( airtimePayment, details )
          .then(( fedAirtimePayment: Model ) => {

            return new Promise<Model>(( resolve, reject ) => {
              fedAirtimePayment.save(( err: any ) => {
                if ( err ) {
                  reject( err );
                } else {
                  resolve( fedAirtimePayment );
                }
              } );
            } );

          } );

      } )
      .then(( updatedAirtimePayment: Model ) => {

        return this.convertToAbstract( [ updatedAirtimePayment ] );

      } )
      .then(( convertedAirtimePayments: dataModel.call263.airtimePayment.Super[] ) => {

        new Promise<any>(( resolve, reject ) => {
          this.events.updated( {
            id: airtimePaymentId,
            documents: convertedAirtimePayments
          } );
          resolve();
        } );

        return Promise.resolve( convertedAirtimePayments[ 0 ] );

      } )
      .catch(( reason: any ) => {

        new Promise<any>(( resolve, reject ) => {
          this.events.updateFailed( {
            id: airtimePaymentId,
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

  readonly remove = ( filtrationCriteria: storageInterfaces.call263.airtimePayment.FiltrationCriteria, forceThrow = false ): Promise<void> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.makeConditions( filtrationCriteria );

      } )
      .then(( conditions: QueryConditions ) => {

        return this.removeDocuments( conditions );

      } )
      .then(( response: any ) => {

        new Promise<any>(( resolve, reject ) => {
          this.events.removed( {
            conditions: filtrationCriteria
          } );
          resolve();
        } );

        return Promise.resolve();

      } )
      .catch(( reason: any ) => {

        new Promise<any>(( resolve, reject ) => {
          this.events.removeFailed( {
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

  readonly removeById = ( airtimePaymentId: string, forceThrow?: boolean ): Promise<void> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.removeDocuments( {
          "_id": mongoose.Types.ObjectId( airtimePaymentId )
        } );

      } )
      .then(( response: any ) => {

        new Promise<any>(( resolve, reject ) => {
          this.events.removed( {
            id: airtimePaymentId
          } );
          resolve();
        } );

        return Promise.resolve();

      } )
      .catch(( reason: any ) => {

        new Promise<any>(( resolve, reject ) => {
          this.events.removeFailed( {
            id: airtimePaymentId,
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

  private readonly makeConditions = ( filtrationCriteria: storageInterfaces.call263.airtimePayment.FiltrationCriteria ): Promise<QueryConditions> => {

    return new Promise<QueryConditions>(( resolve, reject ) => {

      let conditions: QueryConditions = {};

      if ( filtrationCriteria.user ) {
        if ( filtrationCriteria.user.userId ) {
          conditions[ "user.userId" ] = mongoose.Types.ObjectId( filtrationCriteria.user.userId );
        }
        if ( filtrationCriteria.user.emailAddress ) {
          conditions[ "user.emailAddress" ] = filtrationCriteria.user.emailAddress;
        }
        if ( filtrationCriteria.user.fullName ) {
          conditions[ "user.fullName" ] = filtrationCriteria.user.fullName;
        }
      }

      if ( filtrationCriteria.channelId ) {
        conditions[ "channelId" ] = mongoose.Types.ObjectId( filtrationCriteria.channelId );
      }

      if ( filtrationCriteria.transaction ) {
        if ( filtrationCriteria.transaction.identifier ) {
          conditions[ "transaction.identifier" ] = filtrationCriteria.transaction.identifier;
        }
        if ( filtrationCriteria.transaction.amount ) {
          conditions[ "transaction.amount" ] = {};
          if ( filtrationCriteria.transaction.amount.min ) {
            conditions[ "transaction.amount" ].$gte = filtrationCriteria.transaction.amount.min;
          }
          if ( filtrationCriteria.transaction.amount.max ) {
            conditions[ "transaction.amount" ].$lte = filtrationCriteria.transaction.amount.max;
          }
        }
      }

      if ( filtrationCriteria.textSearch ) {
        conditions.$text = { $search: filtrationCriteria.textSearch };
      }

      resolve( conditions );

    } );

  }

  /*****************************************************************/

  private readonly makeSortCriteria = ( sortCriteria: storageInterfaces.call263.airtimePayment.SortCriteria ): Promise<string> => {

    return new Promise<string>(( resolve, reject ) => {
      let sortString;
      if ( sortCriteria.criteria === "amount" ) {
        sortString = "transaction.amount";
      } else {
        sortString = sortCriteria.criteria;
      }
      if ( sortCriteria.order === "Descending" ) {
        sortString = "-" + sortString;
      }
      resolve( sortString );
    } );

  }

  /*****************************************************************/

  private readonly generateUpdateDetails = ( document: Model, details: storageInterfaces.call263.airtimePayment.UpdateDetails ): Promise<Model> => {

    return new Promise<Model>(( resolve, reject ) => {

      if ( details.user ) {
        if ( details.user.userId ) {
          document.user.userId = mongoose.Types.ObjectId( details.user.userId );
        }
        if ( details.user.emailAddress ) {
          document.user.emailAddress = details.user.emailAddress;
        }
        if ( details.user.fullName ) {
          document.user.fullName = details.user.fullName;
        }
      }

      if ( details.channelId ) {
        document.channelId = mongoose.Types.ObjectId( details.channelId );
      }

      if ( details.transaction ) {
        if ( details.transaction.identifier ) {
          document.transaction.identifier = details.transaction.identifier;
        }
        if ( details.transaction.amount ) {
          document.transaction.amount = details.transaction.amount;
        }
        if ( details.transaction.method ) {
          document.transaction.method = details.transaction.method;
        }
      }

      resolve( document );

    } );

  }

  /*****************************************************************/

  private readonly convertToAbstract = ( airtimePayments: Model[], forceThrow = false ): Promise<dataModel.call263.airtimePayment.Super[]> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return new Promise<dataModel.call263.airtimePayment.Super[]>(( resolve, reject ) => {

          let returnAirtimePayments: dataModel.call263.airtimePayment.Super[] = [];

          airtimePayments.forEach(( airtimePayment ) => {

            let returnAirtimePayment: dataModel.call263.airtimePayment.Super = {
              id: ( <mongoose.Types.ObjectId>airtimePayment._id ).toHexString(),
              user: {
                id: ( airtimePayment.user._id as mongoose.Types.ObjectId ).toHexString(),
                userId: ( airtimePayment.user.userId as mongoose.Types.ObjectId ).toHexString(),
                emailAddress: airtimePayment.user.emailAddress,
                fullName: airtimePayment.user.fullName,
                createdAt: airtimePayment.user.createdAt,
                updatedAt: airtimePayment.user.updatedAt
              },
              channelId: ( airtimePayment.channelId as mongoose.Types.ObjectId ).toHexString(),
              transaction: {
                id: ( airtimePayment.transaction._id as mongoose.Types.ObjectId ).toHexString(),
                identifier: airtimePayment.transaction.identifier,
                amount: airtimePayment.transaction.amount,
                method: airtimePayment.transaction.method,
                createdAt: airtimePayment.transaction.createdAt,
                updatedAt: airtimePayment.transaction.updatedAt
              },
              createdAt: airtimePayment.createdAt,
              updatedAt: airtimePayment.updatedAt
            };

            returnAirtimePayments.push( returnAirtimePayment );

          } );

          resolve( returnAirtimePayments );

        } );

      } );

  }

  /*****************************************************************/

}

/******************************************************************************/

interface QueryConditions {
  "user.userId"?: mongoose.Types.ObjectId;
  "user.emailAddress"?: string;
  "user.fullName"?: string;

  "channelId"?: mongoose.Types.ObjectId;

  "transaction.identifier"?: string;
  "transaction.method"?: string;
  "transaction.amount"?: { $gte?: number; $lte?: number; };

  $text?: { $search: string };
}

/******************************************************************************/

export default ( params: {
  emitEvent: src.setupConfig.eventManager.Emit;
  mapDetails: sharedLogicInterfaces.dataStructures.MapDetails;
  checkThrow: sharedLogicInterfaces.moders.CheckThrow;
} ): storageInterfaces.call263.AirtimePayment => {
  return new MongoAirtimePayment( {
    events: eventsFactory( params.emitEvent ),
    Model: AirtimePaymentMongooseModel,
    mapDetails: params.mapDetails,
    checkThrow: params.checkThrow
  } );
}

/******************************************************************************/
