/******************************************************************************/

import * as Promise from "bluebird";
import * as mongoose from "mongoose";
import MongoController from "../../mongo-controller";
import { Model, Model_Partial, AirtimeSaleMongooseModel } from "./model";

import * as src from "../../../../../src";
import * as storageInterfaces from "../../../../../src/components/storage";
import * as sharedLogicInterfaces from "../../../../../src/components/shared-logic";

import eventsFactory from "./events";

/******************************************************************************/

class MongoAirtimeSale extends MongoController implements storageInterfaces.powertel.AirtimeSale {

  /*****************************************************************/

  protected readonly events: storageInterfaces.powertel.airtimeSale.Events;
  protected readonly Model: mongoose.Model<mongoose.Document>;
  protected readonly mapDetails: sharedLogicInterfaces.dataStructures.MapDetails;

  /*****************************************************************/

  constructor( params: {
    events: storageInterfaces.powertel.airtimeSale.Events;
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

  readonly get = ( filtrationCriteria: storageInterfaces.powertel.airtimeSale.FiltrationCriteria, sortCriteria: storageInterfaces.powertel.airtimeSale.SortCriteria, limit: number, forceThrow = false ): Promise<dataModel.powertel.airtimeSale.Super[]> => {

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
      .then(( foundAirtimeSales: Model[] ) => {

        return this.convertToAbstract( foundAirtimeSales );

      } )
      .then(( convertedAirtimeSales: dataModel.powertel.airtimeSale.Super[] ) => {

        new Promise<dataModel.powertel.airtimeSale.Super[]>(( resolve, reject ) => {
          this.events.got( {
            filtrationCriteria: filtrationCriteria,
            sortCriteria: sortCriteria,
            limit: limit,
            ids: convertedAirtimeSales.map(( airtimeSale ) => {
              return airtimeSale.id;
            } )
          } );
          resolve();
        } );

        return Promise.resolve( convertedAirtimeSales );

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

  readonly getById = ( airtimeSaleId: string, forceThrow = false ): Promise<dataModel.powertel.airtimeSale.Super> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.findById( mongoose.Types.ObjectId( airtimeSaleId ) );

      } )
      .then(( foundAirtimeSale: Model ) => {

        return this.convertToAbstract( [ foundAirtimeSale ] );

      } )
      .then(( convertedAirtimeSales: dataModel.powertel.airtimeSale.Super[] ) => {

        new Promise<void>(( resolve, reject ) => {
          this.events.gotById( {
            id: airtimeSaleId
          } );
        } );

        return Promise.resolve( convertedAirtimeSales[ 0 ] );

      } )
      .catch(( reason: any ) => {

        new Promise<void>(( resolve, reject ) => {
          this.events.getByIdFailed( {
            id: airtimeSaleId,
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

  readonly addBatch = ( airtimeSales: storageInterfaces.powertel.airtimeSale.AddDetails[], forceThrow = false ): Promise<dataModel.powertel.airtimeSale.Super[]> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.saveMultipleDocuments( airtimeSales.map(( airtimeSale ) => {
          let airtimeSaleDetails: Model_Partial = {
            buyerName: airtimeSale.buyerName,
            amount: airtimeSale.amount
          };
          if ( airtimeSale.card ) {
            airtimeSaleDetails.card = {
              cardId: mongoose.Types.ObjectId( airtimeSale.card.cardId ),
              mdn: airtimeSale.card.mdn
            };
          }
          if ( airtimeSale.user ) {
            airtimeSaleDetails.user = {
              userId: mongoose.Types.ObjectId( airtimeSale.user.userId ),
              emailAddress: airtimeSale.user.emailAddress,
              fullName: airtimeSale.user.fullName
            };
          }
          if ( airtimeSale.bundles ) {
            airtimeSaleDetails.bundles = {
              gb: airtimeSale.bundles.gb,
              days: airtimeSale.bundles.days
            };
          }
          return airtimeSaleDetails;
        } ) );

      } )
      .then(( addedAirtimeSales: Model[] ) => {

        return this.convertToAbstract( addedAirtimeSales );

      } )
      .then(( convertedAirtimeSales: dataModel.powertel.airtimeSale.Super[] ) => {

        new Promise<void>(( resolve, reject ) => {
          this.events.added( {
            documents: convertedAirtimeSales
          } );
          resolve();
        } );

        return Promise.resolve( convertedAirtimeSales );

      } )
      .catch(( reason: any ) => {

        new Promise<any>(( resolve, reject ) => {
          this.events.addFailed( {
            details: airtimeSales,
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

  readonly add = ( details: storageInterfaces.powertel.airtimeSale.AddDetails, forceThrow = false ): Promise<dataModel.powertel.airtimeSale.Super> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        let airtimeSaleDetails: Model_Partial = {
          buyerName: details.buyerName,
          amount: details.amount
        };
        if ( details.card ) {
          airtimeSaleDetails.card = {
            cardId: mongoose.Types.ObjectId( details.card.cardId ),
            mdn: details.card.mdn
          };
        }
        if ( details.user ) {
          airtimeSaleDetails.user = {
            userId: mongoose.Types.ObjectId( details.user.userId ),
            emailAddress: details.user.emailAddress,
            fullName: details.user.fullName
          };
        }
        if ( details.bundles ) {
          airtimeSaleDetails.bundles = {
            gb: details.bundles.gb,
            days: details.bundles.days
          };
        }

        return this.saveDocument( airtimeSaleDetails );

      } )
      .then(( addedAirtimeSale: Model ) => {

        return this.convertToAbstract( [ addedAirtimeSale ] );

      } )
      .then(( convertedAirtimeSales: dataModel.powertel.airtimeSale.Super[] ) => {

        new Promise<void>(( resolve, reject ) => {
          this.events.added( {
            documents: convertedAirtimeSales
          } );
          resolve();
        } );

        return Promise.resolve( convertedAirtimeSales[ 0 ] );

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

  readonly update = ( filtrationCriteria: storageInterfaces.powertel.airtimeSale.FiltrationCriteria, details: storageInterfaces.powertel.airtimeSale.UpdateDetails, forceThrow = false ): Promise<dataModel.powertel.airtimeSale.Super[]> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.makeConditions( filtrationCriteria );

      } ).then(( conditions: QueryConditions ) => {

        return this.find( conditions, null, null );

      } )
      .then(( foundAirtimeSales: Model[] ) => {

        return Promise.all( foundAirtimeSales.map(( airtimeSale ) => {

          return this.generateUpdateDetails( airtimeSale, details )
            .then(( fedAirtimeSale: Model ) => {

              return new Promise<Model>(( resolve, reject ) => {
                fedAirtimeSale.save(( err: any ) => {
                  if ( err ) {
                    reject( err );
                  } else {
                    resolve( fedAirtimeSale );
                  }
                } );
              } );

            } );

        } ) );

      } )
      .then(( updatedAirtimeSales: Model[] ) => {

        return this.convertToAbstract( updatedAirtimeSales );

      } )
      .then(( updatedAirtimeSales: dataModel.powertel.airtimeSale.Super[] ) => {

        new Promise<any>(( resolve, reject ) => {
          this.events.updated( {
            conditions: filtrationCriteria,
            documents: updatedAirtimeSales
          } );
          resolve();
        } );

        return Promise.resolve( updatedAirtimeSales );

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

  readonly updateById = ( airtimeSaleId: string, details: storageInterfaces.powertel.airtimeSale.UpdateDetails, forceThrow = false ): Promise<dataModel.powertel.airtimeSale.Super> => {

    let airtimeSaleObjectId: mongoose.Types.ObjectId;

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.findById( mongoose.Types.ObjectId( airtimeSaleId ) );

      } )
      .then(( airtimeSale: Model ) => {

        return this.generateUpdateDetails( airtimeSale, details )
          .then(( fedAirtimeSale: Model ) => {

            return new Promise<Model>(( resolve, reject ) => {
              fedAirtimeSale.save(( err: any ) => {
                if ( err ) {
                  reject( err );
                } else {
                  resolve( fedAirtimeSale );
                }
              } );
            } );

          } );

      } )
      .then(( updatedAirtimeSale: Model ) => {

        return this.convertToAbstract( [ updatedAirtimeSale ] );

      } )
      .then(( convertedAirtimeSales: dataModel.powertel.airtimeSale.Super[] ) => {

        new Promise<any>(( resolve, reject ) => {
          this.events.updated( {
            id: airtimeSaleId,
            documents: convertedAirtimeSales
          } );
          resolve();
        } );

        return Promise.resolve( convertedAirtimeSales[ 0 ] );

      } )
      .catch(( reason: any ) => {

        new Promise<any>(( resolve, reject ) => {
          this.events.updateFailed( {
            id: airtimeSaleId,
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

  readonly remove = ( filtrationCriteria: storageInterfaces.powertel.airtimeSale.FiltrationCriteria, forceThrow = false ): Promise<void> => {

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

  readonly removeById = ( airtimeSaleId: string, forceThrow?: boolean ): Promise<void> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.removeDocuments( {
          "_id": mongoose.Types.ObjectId( airtimeSaleId )
        } );

      } )
      .then(( response: any ) => {

        new Promise<any>(( resolve, reject ) => {
          this.events.removed( {
            id: airtimeSaleId
          } );
          resolve();
        } );

        return Promise.resolve();

      } )
      .catch(( reason: any ) => {

        new Promise<any>(( resolve, reject ) => {
          this.events.removeFailed( {
            id: airtimeSaleId,
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

  private readonly makeConditions = ( filtrationCriteria: storageInterfaces.powertel.airtimeSale.FiltrationCriteria ): Promise<QueryConditions> => {

    return new Promise<QueryConditions>(( resolve, reject ) => {

      let conditions: QueryConditions = {};

      if ( filtrationCriteria.buyerName ) {
        conditions[ "buyerName" ] = filtrationCriteria.buyerName;
      }

      if ( filtrationCriteria.buyerName ) {
        conditions[ "buyerName" ] = filtrationCriteria.buyerName;
      }

      if ( filtrationCriteria.card ) {
        if ( filtrationCriteria.card.cardId ) {
          conditions[ "card.cardId" ] = mongoose.Types.ObjectId( filtrationCriteria.card.cardId );
        }
        if ( filtrationCriteria.card.mdn ) {
          conditions[ "card.mdn" ] = {};
          if ( filtrationCriteria.card.mdn.min ) {
            conditions[ "card.mdn" ].$gte = filtrationCriteria.card.mdn.min;
          }
          if ( filtrationCriteria.card.mdn.max ) {
            conditions[ "card.mdn" ].$lte = filtrationCriteria.card.mdn.max;
          }
        }
      }

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

      if ( filtrationCriteria.bundles ) {
        if ( filtrationCriteria.bundles.gb ) {
          conditions[ "bundles.gb" ] = {};
          if ( filtrationCriteria.bundles.gb.min ) {
            conditions[ "bundles.gb" ].$gte = filtrationCriteria.bundles.gb.min;
          }
          if ( filtrationCriteria.bundles.gb.max ) {
            conditions[ "bundles.gb" ].$lte = filtrationCriteria.bundles.gb.max;
          }
        }
        if ( filtrationCriteria.bundles.days ) {
          conditions[ "bundles.days" ] = {};
          if ( filtrationCriteria.bundles.days.min ) {
            conditions[ "bundles.days" ].$gte = filtrationCriteria.bundles.days.min;
          }
          if ( filtrationCriteria.bundles.days.max ) {
            conditions[ "bundles.days" ].$lte = filtrationCriteria.bundles.days.max;
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

  private readonly makeSortCriteria = ( sortCriteria: storageInterfaces.powertel.airtimeSale.SortCriteria ): Promise<string> => {

    return new Promise<string>(( resolve, reject ) => {
      let sortString;
      if ( sortCriteria.criteria === "mdn" ) {
        sortString = "card.mdn";
      } else if ( sortCriteria.criteria === "gb" ) {
        sortString = "bundles.gb";
      } else if ( sortCriteria.criteria === "days" ) {
        sortString = "bundles.days";
      }
      else {
        sortString = sortCriteria.criteria;
      }
      if ( sortCriteria.order === "Descending" ) {
        sortString = "-" + sortString;
      }
      resolve( sortString );
    } );

  }

  /*****************************************************************/

  private readonly generateUpdateDetails = ( document: Model, details: storageInterfaces.powertel.airtimeSale.UpdateDetails ): Promise<Model> => {

    return new Promise<Model>(( resolve, reject ) => {

      if ( details.buyerName ) {
        document.buyerName = details.buyerName;
      }

      if ( details.card ) {
        if ( details.card.cardId ) {
          document.card.cardId = mongoose.Types.ObjectId( details.card.cardId );
        }
        if ( details.card.mdn ) {
          document.card.mdn = details.card.mdn;
        }
      }

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

      if ( details.bundles ) {
        if ( details.bundles.gb ) {
          document.bundles.gb = details.bundles.gb;
        }
        if ( details.bundles.days ) {
          document.bundles.days = details.bundles.days;
        }
      }

      resolve( document );

    } );

  }

  /*****************************************************************/

  private readonly convertToAbstract = ( airtimeSales: Model[], forceThrow = false ): Promise<dataModel.powertel.airtimeSale.Super[]> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return new Promise<dataModel.powertel.airtimeSale.Super[]>(( resolve, reject ) => {

          let returnAirtimeSales: dataModel.powertel.airtimeSale.Super[] = [];

          airtimeSales.forEach(( airtimeSale ) => {

            let returnAirtimeSale: dataModel.powertel.airtimeSale.Super = {
              id: ( <mongoose.Types.ObjectId>airtimeSale._id ).toHexString(),
              buyerName: airtimeSale.buyerName,
              amount: airtimeSale.amount,
              createdAt: airtimeSale.createdAt,
              updatedAt: airtimeSale.updatedAt
            };
            if ( airtimeSale.card ) {
              returnAirtimeSale.card = {
                id: ( <mongoose.Types.ObjectId>airtimeSale.card._id ).toHexString(),
                cardId: ( <mongoose.Types.ObjectId>airtimeSale.card.cardId ).toHexString(),
                mdn: airtimeSale.card.mdn,
                createdAt: airtimeSale.card.createdAt,
                updatedAt: airtimeSale.card.updatedAt
              };
            }
            if ( airtimeSale.user ) {
              returnAirtimeSale.user = {
                id: ( <mongoose.Types.ObjectId>airtimeSale.user._id ).toHexString(),
                userId: ( <mongoose.Types.ObjectId>airtimeSale.user.userId ).toHexString(),
                emailAddress: airtimeSale.user.emailAddress,
                fullName: airtimeSale.user.fullName,
                createdAt: airtimeSale.user.createdAt,
                updatedAt: airtimeSale.user.updatedAt
              };
            }
            if ( airtimeSale.bundles ) {
              returnAirtimeSale.bundles = {
                gb: airtimeSale.bundles.gb,
                days: airtimeSale.bundles.days
              };
            }

            returnAirtimeSales.push( returnAirtimeSale );

          } );

          resolve( returnAirtimeSales );

        } );

      } );

  }

  /*****************************************************************/

}

/******************************************************************************/

interface QueryConditions {
  "buyerName"?: string;
  "card.cardId"?: mongoose.Types.ObjectId;
  "card.mdn"?: { $gte?: number; $lte?: number; };

  "user.userId"?: mongoose.Types.ObjectId;
  "user.emailAddress"?: string;
  "user.fullName"?: string;

  "amount"?: { $gte?: number; $lte?: number; };

  "bundles.gb"?: { $gte?: number; $lte?: number; };
  "bundles.days"?: { $gte?: number; $lte?: number; };

  $text?: { $search: string };
}

/******************************************************************************/

export default ( params: {
  emitEvent: src.setupConfig.eventManager.Emit;
  mapDetails: sharedLogicInterfaces.dataStructures.MapDetails;
  checkThrow: sharedLogicInterfaces.moders.CheckThrow;
} ): storageInterfaces.powertel.AirtimeSale => {
  return new MongoAirtimeSale( {
    events: eventsFactory( params.emitEvent ),
    Model: AirtimeSaleMongooseModel,
    mapDetails: params.mapDetails,
    checkThrow: params.checkThrow
  } );
}

/******************************************************************************/
