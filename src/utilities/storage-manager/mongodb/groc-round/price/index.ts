/******************************************************************************/

import * as Promise from "bluebird";
import * as mongoose from "mongoose";
import MongoController from "../../mongo-controller";
import { Model, Model_Partial, PriceMongooseModel } from "./model";

import * as interfaces from "../../../../../interfaces";
import * as storageManagerInterfaces from "../../../../../interfaces/utilities/storage-manager";
import * as sharedLogicInterfaces from "../../../../../interfaces/utilities/shared-logic";

import emitterFactory from "./event-emitter";

/******************************************************************************/

class MongoPrice extends MongoController implements storageManagerInterfaces.grocRound.Price {

  /*****************************************************************/

  protected readonly emitter: storageManagerInterfaces.grocRound.price.Emitter;
  protected readonly Model: mongoose.Model<mongoose.Document>;
  protected readonly mapDetails: sharedLogicInterfaces.dataStructures.MapDetails;

  /*****************************************************************/

  constructor( params: {
    emitter: storageManagerInterfaces.grocRound.price.Emitter;
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

  readonly get = ( filtrationCriteria: storageManagerInterfaces.grocRound.price.FiltrationCriteria, sortCriteria: storageManagerInterfaces.grocRound.price.SortCriteria, limit: number, forceThrow = false ): Promise<interfaces.dataModel.grocRound.price.Super[]> => {

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
      .then(( foundPrices: Model[] ) => {

        return this.convertToAbstract( foundPrices );

      } )
      .then(( convertedPrices: interfaces.dataModel.grocRound.price.Super[] ) => {

        new Promise<interfaces.dataModel.grocRound.price.Super[]>(( resolve, reject ) => {
          this.emitter.got( {
            filtrationCriteria: filtrationCriteria,
            sortCriteria: sortCriteria,
            limit: limit,
            ids: convertedPrices.map(( price ) => {
              return price.id;
            } )
          } );
          resolve();
        } );

        return Promise.resolve( convertedPrices );

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

  readonly getById = ( priceId: string, forceThrow = false ): Promise<interfaces.dataModel.grocRound.price.Super> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.findById( mongoose.Types.ObjectId( priceId ) );

      } )
      .then(( foundPrice: Model ) => {

        return this.convertToAbstract( [ foundPrice ] );

      } )
      .then(( convertedPrices: interfaces.dataModel.grocRound.price.Super[] ) => {

        new Promise<void>(( resolve, reject ) => {
          this.emitter.gotById( {
            id: priceId
          } );
        } );

        return Promise.resolve( convertedPrices[ 0 ] );

      } )
      .catch(( reason: any ) => {

        new Promise<void>(( resolve, reject ) => {
          this.emitter.getByIdFailed( {
            id: priceId,
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

  readonly addBatch = ( prices: storageManagerInterfaces.grocRound.price.AddDetails[], forceThrow = false ): Promise<interfaces.dataModel.grocRound.price.Super[]> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.saveMultipleDocuments( prices.map(( price ) => {
          let priceDetails: Model_Partial = {
            productId: mongoose.Types.ObjectId( price.productId ),
            shopId: mongoose.Types.ObjectId( price.shopId ),
            quantity: price.quantity,
            price: price.price
          };
          return priceDetails;
        } ) );

      } )
      .then(( addedPrices: Model[] ) => {

        return this.convertToAbstract( addedPrices );

      } )
      .then(( convertedPrices: interfaces.dataModel.grocRound.price.Super[] ) => {

        new Promise<void>(( resolve, reject ) => {
          this.emitter.added( {
            documents: convertedPrices
          } );
          resolve();
        } );

        return Promise.resolve( convertedPrices );

      } )
      .catch(( reason: any ) => {

        new Promise<any>(( resolve, reject ) => {
          this.emitter.addFailed( {
            details: prices,
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

  readonly add = ( details: storageManagerInterfaces.grocRound.price.AddDetails, forceThrow = false ): Promise<interfaces.dataModel.grocRound.price.Super> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        let priceDetails: Model_Partial = {
          productId: mongoose.Types.ObjectId( details.productId ),
          shopId: mongoose.Types.ObjectId( details.shopId ),
          quantity: details.quantity,
          price: details.price
        };

        return this.saveDocument( priceDetails );

      } )
      .then(( addedPrice: Model ) => {

        return this.convertToAbstract( [ addedPrice ] );

      } )
      .then(( convertedPrices: interfaces.dataModel.grocRound.price.Super[] ) => {

        new Promise<void>(( resolve, reject ) => {
          this.emitter.added( {
            documents: convertedPrices
          } );
          resolve();
        } );

        return Promise.resolve( convertedPrices[ 0 ] );

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

  readonly update = ( filtrationCriteria: storageManagerInterfaces.grocRound.price.FiltrationCriteria, details: storageManagerInterfaces.grocRound.price.UpdateDetails, forceThrow = false ): Promise<interfaces.dataModel.grocRound.price.Super[]> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.makeConditions( filtrationCriteria );

      } ).then(( conditions: QueryConditions ) => {

        return this.find( conditions, null, null );

      } )
      .then(( foundPrices: Model[] ) => {

        return Promise.all( foundPrices.map(( price ) => {

          return this.generateUpdateDetails( price, details )
            .then(( fedPrice: Model ) => {

              return new Promise<Model>(( resolve, reject ) => {
                fedPrice.save(( err: any ) => {
                  if ( err ) {
                    reject( err );
                  } else {
                    resolve( fedPrice );
                  }
                } );
              } );

            } );

        } ) );

      } )
      .then(( updatedPrices: Model[] ) => {

        return this.convertToAbstract( updatedPrices );

      } )
      .then(( updatedPrices: interfaces.dataModel.grocRound.price.Super[] ) => {

        new Promise<any>(( resolve, reject ) => {
          this.emitter.updated( {
            conditions: filtrationCriteria,
            documents: updatedPrices
          } );
          resolve();
        } );

        return Promise.resolve( updatedPrices );

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

  readonly updateById = ( priceId: string, details: storageManagerInterfaces.grocRound.price.UpdateDetails, forceThrow = false ): Promise<interfaces.dataModel.grocRound.price.Super> => {

    let priceObjectId: mongoose.Types.ObjectId;

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.findById( mongoose.Types.ObjectId( priceId ) );

      } )
      .then(( price: Model ) => {

        return this.generateUpdateDetails( price, details )
          .then(( fedPrice: Model ) => {

            return new Promise<Model>(( resolve, reject ) => {
              fedPrice.save(( err: any ) => {
                if ( err ) {
                  reject( err );
                } else {
                  resolve( fedPrice );
                }
              } );
            } );

          } );

      } )
      .then(( updatedPrice: Model ) => {

        return this.convertToAbstract( [ updatedPrice ] );

      } )
      .then(( convertedPrices: interfaces.dataModel.grocRound.price.Super[] ) => {

        new Promise<any>(( resolve, reject ) => {
          this.emitter.updated( {
            id: priceId,
            documents: convertedPrices
          } );
          resolve();
        } );

        return Promise.resolve( convertedPrices[ 0 ] );

      } )
      .catch(( reason: any ) => {

        new Promise<any>(( resolve, reject ) => {
          this.emitter.updateFailed( {
            id: priceId,
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

  readonly remove = ( filtrationCriteria: storageManagerInterfaces.grocRound.price.FiltrationCriteria, forceThrow = false ): Promise<void> => {

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

  readonly removeById = ( priceId: string, forceThrow?: boolean ): Promise<void> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.removeDocuments( {
          "_id": mongoose.Types.ObjectId( priceId )
        } );

      } )
      .then(( response: any ) => {

        new Promise<any>(( resolve, reject ) => {
          this.emitter.removed( {
            id: priceId
          } );
          resolve();
        } );

        return Promise.resolve();

      } )
      .catch(( reason: any ) => {

        new Promise<any>(( resolve, reject ) => {
          this.emitter.removeFailed( {
            id: priceId,
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

  private readonly makeConditions = ( filtrationCriteria: storageManagerInterfaces.grocRound.price.FiltrationCriteria ): Promise<QueryConditions> => {

    return new Promise<QueryConditions>(( resolve, reject ) => {

      let conditions: QueryConditions = {};

      if ( filtrationCriteria.productId ) {
        conditions[ "productId" ] = mongoose.Types.ObjectId( filtrationCriteria.productId );
      }

      if ( filtrationCriteria.shopId ) {
        conditions[ "shopId" ] = mongoose.Types.ObjectId( filtrationCriteria.shopId );
      }

      if ( filtrationCriteria.quantity ) {
        conditions[ "quantity" ] = {};
        if ( filtrationCriteria.quantity.min ) {
          conditions[ "quantity" ].$gte = filtrationCriteria.quantity.min;
        }
        if ( filtrationCriteria.quantity.max ) {
          conditions[ "quantity" ].$lte = filtrationCriteria.quantity.max;
        }
      }

      if ( filtrationCriteria.price ) {
        conditions[ "price" ] = {};
        if ( filtrationCriteria.price.min ) {
          conditions[ "price" ].$gte = filtrationCriteria.price.min;
        }
        if ( filtrationCriteria.price.max ) {
          conditions[ "price" ].$lte = filtrationCriteria.price.max;
        }
      }

      if ( filtrationCriteria.textSearch ) {
        conditions.$text = { $search: filtrationCriteria.textSearch };
      }

      resolve( conditions );

    } );

  }

  /*****************************************************************/

  private readonly makeSortCriteria = ( sortCriteria: storageManagerInterfaces.grocRound.price.SortCriteria ): Promise<string> => {

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

  private readonly generateUpdateDetails = ( document: Model, details: storageManagerInterfaces.grocRound.price.UpdateDetails ): Promise<Model> => {

    return new Promise<Model>(( resolve, reject ) => {

      if ( details.productId ) {
        document.productId = mongoose.Types.ObjectId( details.productId );
      }

      if ( details.shopId ) {
        document.shopId = mongoose.Types.ObjectId( details.shopId );
      }

      if ( details.quantity ) {
        document.quantity = details.quantity;
      }

      if ( details.price ) {
        document.price = details.price;
      }

      resolve( document );

    } );

  }

  /*****************************************************************/

  private readonly convertToAbstract = ( prices: Model[], forceThrow = false ): Promise<interfaces.dataModel.grocRound.price.Super[]> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return new Promise<interfaces.dataModel.grocRound.price.Super[]>(( resolve, reject ) => {

          let returnPrices: interfaces.dataModel.grocRound.price.Super[] = [];

          prices.forEach(( price ) => {

            let returnPrice: interfaces.dataModel.grocRound.price.Super = {
              id: ( <mongoose.Types.ObjectId>price._id ).toHexString(),
              productId: ( price.productId as mongoose.Types.ObjectId ).toHexString(),
              shopId: ( price.shopId as mongoose.Types.ObjectId ).toHexString(),
              quantity: price.quantity,
              price: price.price,
              createdAt: price.createdAt,
              updatedAt: price.updatedAt
            };

            returnPrices.push( returnPrice );

          } );

          resolve( returnPrices );

        } );

      } );

  }

  /*****************************************************************/

}

/******************************************************************************/

interface QueryConditions {
  "productId"?: mongoose.Types.ObjectId;
  "shopId"?: mongoose.Types.ObjectId;
  "quantity"?: { $gte?: number; $lte?: number; };
  "price"?: { $gte?: number; $lte?: number; };
  $text?: { $search: string };
}

/******************************************************************************/

export default ( params: {
  emitEvent: interfaces.setupConfig.eventManager.Emit;
  mapDetails: sharedLogicInterfaces.dataStructures.MapDetails;
  checkThrow: sharedLogicInterfaces.moders.CheckThrow;
} ): storageManagerInterfaces.grocRound.Price => {
  return new MongoPrice( {
    emitter: emitterFactory( params.emitEvent ),
    Model: PriceMongooseModel,
    mapDetails: params.mapDetails,
    checkThrow: params.checkThrow
  } );
}

/******************************************************************************/
