/******************************************************************************/

import * as Promise from "bluebird";
import * as mongoose from "mongoose";
import MongoController from "../../mongo-controller";
import { Model, Model_Partial, CardSaleMongooseModel } from "./model";

import * as interfaces from "../../../../../interfaces";
import * as storageInterfaces from "../../../../../interfaces/components/storage";
import * as sharedLogicInterfaces from "../../../../../interfaces/components/shared-logic";

import emitterFactory from "./event-emitter";

/******************************************************************************/

class MongoCardSale extends MongoController implements storageInterfaces.powertel.CardSale {

  /*****************************************************************/

  protected readonly emitter: storageInterfaces.powertel.cardSale.Emitter;
  protected readonly Model: mongoose.Model<mongoose.Document>;
  protected readonly mapDetails: sharedLogicInterfaces.dataStructures.MapDetails;

  /*****************************************************************/

  constructor( params: {
    emitter: storageInterfaces.powertel.cardSale.Emitter;
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

  readonly get = ( filtrationCriteria: storageInterfaces.powertel.cardSale.FiltrationCriteria, sortCriteria: storageInterfaces.powertel.cardSale.SortCriteria, limit: number, forceThrow = false ): Promise<interfaces.dataModel.powertel.cardSale.Super[]> => {

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
      .then(( foundCardSales: Model[] ) => {

        return this.convertToAbstract( foundCardSales );

      } )
      .then(( convertedCardSales: interfaces.dataModel.powertel.cardSale.Super[] ) => {

        new Promise<interfaces.dataModel.powertel.cardSale.Super[]>(( resolve, reject ) => {
          this.emitter.got( {
            filtrationCriteria: filtrationCriteria,
            sortCriteria: sortCriteria,
            limit: limit,
            ids: convertedCardSales.map(( cardSale ) => {
              return cardSale.id;
            } )
          } );
          resolve();
        } );

        return Promise.resolve( convertedCardSales );

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

  readonly getById = ( cardSaleId: string, forceThrow = false ): Promise<interfaces.dataModel.powertel.cardSale.Super> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.findById( mongoose.Types.ObjectId( cardSaleId ) );

      } )
      .then(( foundCardSale: Model ) => {

        return this.convertToAbstract( [ foundCardSale ] );

      } )
      .then(( convertedCardSales: interfaces.dataModel.powertel.cardSale.Super[] ) => {

        new Promise<void>(( resolve, reject ) => {
          this.emitter.gotById( {
            id: cardSaleId
          } );
        } );

        return Promise.resolve( convertedCardSales[ 0 ] );

      } )
      .catch(( reason: any ) => {

        new Promise<void>(( resolve, reject ) => {
          this.emitter.getByIdFailed( {
            id: cardSaleId,
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

  readonly addBatch = ( cardSales: storageInterfaces.powertel.cardSale.AddDetails[], forceThrow = false ): Promise<interfaces.dataModel.powertel.cardSale.Super[]> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.saveMultipleDocuments( cardSales.map(( cardSale ) => {
          let cardSaleDetails: Model_Partial = {
            cardId: mongoose.Types.ObjectId( cardSale.cardId ),
            mdn: cardSale.mdn,
            cost: cardSale.cost
          };
          if ( cardSale.conditions ) {
            cardSaleDetails.conditions = {};
            if ( cardSale.conditions.withRouter ) {
              cardSaleDetails.conditions.withRouter = cardSale.conditions.withRouter;
            }
            if ( cardSale.conditions.routerType ) {
              cardSaleDetails.conditions.routerType = cardSale.conditions.routerType;
            }
          }
          return cardSaleDetails;
        } ) );

      } )
      .then(( addedCardSales: Model[] ) => {

        return this.convertToAbstract( addedCardSales );

      } )
      .then(( convertedCardSales: interfaces.dataModel.powertel.cardSale.Super[] ) => {

        new Promise<void>(( resolve, reject ) => {
          this.emitter.added( {
            documents: convertedCardSales
          } );
          resolve();
        } );

        return Promise.resolve( convertedCardSales );

      } )
      .catch(( reason: any ) => {

        new Promise<any>(( resolve, reject ) => {
          this.emitter.addFailed( {
            details: cardSales,
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

  readonly add = ( details: storageInterfaces.powertel.cardSale.AddDetails, forceThrow = false ): Promise<interfaces.dataModel.powertel.cardSale.Super> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        let cardSaleDetails: Model_Partial = {
          cardId: mongoose.Types.ObjectId( details.cardId ),
          mdn: details.mdn,
          cost: details.cost
        };
        if ( details.conditions ) {
          cardSaleDetails.conditions = {};
          if ( details.conditions.withRouter ) {
            cardSaleDetails.conditions.withRouter = details.conditions.withRouter;
          }
          if ( details.conditions.routerType ) {
            cardSaleDetails.conditions.routerType = details.conditions.routerType;
          }
        }

        return this.saveDocument( cardSaleDetails );

      } )
      .then(( addedCardSale: Model ) => {

        return this.convertToAbstract( [ addedCardSale ] );

      } )
      .then(( convertedCardSales: interfaces.dataModel.powertel.cardSale.Super[] ) => {

        new Promise<void>(( resolve, reject ) => {
          this.emitter.added( {
            documents: convertedCardSales
          } );
          resolve();
        } );

        return Promise.resolve( convertedCardSales[ 0 ] );

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

  readonly update = ( filtrationCriteria: storageInterfaces.powertel.cardSale.FiltrationCriteria, details: storageInterfaces.powertel.cardSale.UpdateDetails, forceThrow = false ): Promise<interfaces.dataModel.powertel.cardSale.Super[]> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.makeConditions( filtrationCriteria );

      } ).then(( conditions: QueryConditions ) => {

        return this.find( conditions, null, null );

      } )
      .then(( foundCardSales: Model[] ) => {

        return Promise.all( foundCardSales.map(( cardSale ) => {

          return this.generateUpdateDetails( cardSale, details )
            .then(( fedCardSale: Model ) => {

              return new Promise<Model>(( resolve, reject ) => {
                fedCardSale.save(( err: any ) => {
                  if ( err ) {
                    reject( err );
                  } else {
                    resolve( fedCardSale );
                  }
                } );
              } );

            } );

        } ) );

      } )
      .then(( updatedCardSales: Model[] ) => {

        return this.convertToAbstract( updatedCardSales );

      } )
      .then(( updatedCardSales: interfaces.dataModel.powertel.cardSale.Super[] ) => {

        new Promise<any>(( resolve, reject ) => {
          this.emitter.updated( {
            conditions: filtrationCriteria,
            documents: updatedCardSales
          } );
          resolve();
        } );

        return Promise.resolve( updatedCardSales );

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

  readonly updateById = ( cardSaleId: string, details: storageInterfaces.powertel.cardSale.UpdateDetails, forceThrow = false ): Promise<interfaces.dataModel.powertel.cardSale.Super> => {

    let cardSaleObjectId: mongoose.Types.ObjectId;

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.findById( mongoose.Types.ObjectId( cardSaleId ) );

      } )
      .then(( cardSale: Model ) => {

        return this.generateUpdateDetails( cardSale, details )
          .then(( fedCardSale: Model ) => {

            return new Promise<Model>(( resolve, reject ) => {
              fedCardSale.save(( err: any ) => {
                if ( err ) {
                  reject( err );
                } else {
                  resolve( fedCardSale );
                }
              } );
            } );

          } );

      } )
      .then(( updatedCardSale: Model ) => {

        return this.convertToAbstract( [ updatedCardSale ] );

      } )
      .then(( convertedCardSales: interfaces.dataModel.powertel.cardSale.Super[] ) => {

        new Promise<any>(( resolve, reject ) => {
          this.emitter.updated( {
            id: cardSaleId,
            documents: convertedCardSales
          } );
          resolve();
        } );

        return Promise.resolve( convertedCardSales[ 0 ] );

      } )
      .catch(( reason: any ) => {

        new Promise<any>(( resolve, reject ) => {
          this.emitter.updateFailed( {
            id: cardSaleId,
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

  readonly remove = ( filtrationCriteria: storageInterfaces.powertel.cardSale.FiltrationCriteria, forceThrow = false ): Promise<void> => {

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

  readonly removeById = ( cardSaleId: string, forceThrow?: boolean ): Promise<void> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.removeDocuments( {
          "_id": mongoose.Types.ObjectId( cardSaleId )
        } );

      } )
      .then(( response: any ) => {

        new Promise<any>(( resolve, reject ) => {
          this.emitter.removed( {
            id: cardSaleId
          } );
          resolve();
        } );

        return Promise.resolve();

      } )
      .catch(( reason: any ) => {

        new Promise<any>(( resolve, reject ) => {
          this.emitter.removeFailed( {
            id: cardSaleId,
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

  private readonly makeConditions = ( filtrationCriteria: storageInterfaces.powertel.cardSale.FiltrationCriteria ): Promise<QueryConditions> => {

    return new Promise<QueryConditions>(( resolve, reject ) => {

      let conditions: QueryConditions = {};

      if ( filtrationCriteria.cardId ) {
        conditions[ "cardId" ] = mongoose.Types.ObjectId( filtrationCriteria.cardId );
      }

      if ( filtrationCriteria.mdn ) {
        conditions[ "mdn" ] = filtrationCriteria.mdn;
      }

      if ( filtrationCriteria.cost ) {
        conditions[ "cost" ] = filtrationCriteria.cost;
      }

      if ( filtrationCriteria.conditions ) {
        if ( filtrationCriteria.conditions.withRouter ) {
          conditions[ "conditions.withRouter" ] = filtrationCriteria.conditions.withRouter;
        }
        if ( filtrationCriteria.conditions.routerType ) {
          conditions[ "conditions.routerType" ] = filtrationCriteria.conditions.routerType;
        }
      }

      if ( filtrationCriteria.textSearch ) {
        conditions.$text = { $search: filtrationCriteria.textSearch };
      }

      resolve( conditions );

    } );

  }

  /*****************************************************************/

  private readonly makeSortCriteria = ( sortCriteria: storageInterfaces.powertel.cardSale.SortCriteria ): Promise<string> => {

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

  private readonly generateUpdateDetails = ( document: Model, details: storageInterfaces.powertel.cardSale.UpdateDetails ): Promise<Model> => {

    return new Promise<Model>(( resolve, reject ) => {

      if ( details.cardId ) {
        document.cardId = mongoose.Types.ObjectId( details.cardId );
      }

      if ( details.mdn ) {
        document.mdn = details.mdn;
      }

      if ( details.cost ) {
        document.cost = details.cost;
      }

      if ( details.conditions ) {
        if ( details.conditions.withRouter ) {
          document.conditions.withRouter = details.conditions.withRouter;
        }
        if ( details.conditions.routerType ) {
          document.conditions.routerType = details.conditions.routerType;
        }
      }

      resolve( document );

    } );

  }

  /*****************************************************************/

  private readonly convertToAbstract = ( cardSales: Model[], forceThrow = false ): Promise<interfaces.dataModel.powertel.cardSale.Super[]> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return new Promise<interfaces.dataModel.powertel.cardSale.Super[]>(( resolve, reject ) => {

          let returnCardSales: interfaces.dataModel.powertel.cardSale.Super[] = [];

          cardSales.forEach(( cardSale ) => {

            let returnCardSale: interfaces.dataModel.powertel.cardSale.Super = {
              id: ( <mongoose.Types.ObjectId>cardSale._id ).toHexString(),
              cardId: ( cardSale.cardId as mongoose.Types.ObjectId ).toHexString(),
              mdn: cardSale.mdn,
              cost: cardSale.cost,
              createdAt: cardSale.createdAt,
              updatedAt: cardSale.updatedAt
            };

            if ( cardSale.conditions ) {
              returnCardSale.conditions = {};
              if ( cardSale.conditions.withRouter ) {
                returnCardSale.conditions.withRouter = cardSale.conditions.withRouter;
              }
              if ( cardSale.conditions.routerType ) {
                returnCardSale.conditions.routerType = cardSale.conditions.routerType;
              }
            }

            returnCardSales.push( returnCardSale );

          } );

          resolve( returnCardSales );

        } );

      } );

  }

  /*****************************************************************/

}

/******************************************************************************/

interface QueryConditions {
  "cardId"?: mongoose.Types.ObjectId;
  "mdn"?: number;
  "cost"?: number;
  "conditions.withRouter"?: boolean;
  "conditions.routerType"?: string;
  $text?: { $search: string };
}

/******************************************************************************/

export default ( params: {
  emitEvent: interfaces.setupConfig.eventManager.Emit;
  mapDetails: sharedLogicInterfaces.dataStructures.MapDetails;
  checkThrow: sharedLogicInterfaces.moders.CheckThrow;
} ): storageInterfaces.powertel.CardSale => {
  return new MongoCardSale( {
    emitter: emitterFactory( params.emitEvent ),
    Model: CardSaleMongooseModel,
    mapDetails: params.mapDetails,
    checkThrow: params.checkThrow
  } );
}

/******************************************************************************/
