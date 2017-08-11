/******************************************************************************/

import * as Promise from "bluebird";
import * as mongoose from "mongoose";
import MongoController from "../../mongo-controller";
import { Model, Model_Partial, ShopMongooseModel } from "./model";

import * as interfaces from "../../../../../interfaces";
import * as storageInterfaces from "../../../../../interfaces/components/storage";
import * as sharedLogicInterfaces from "../../../../../interfaces/components/shared-logic";

import emitterFactory from "./event-emitter";

/******************************************************************************/

class MongoShop extends MongoController implements storageInterfaces.grocRound.Shop {

  /*****************************************************************/

  protected readonly emitter: storageInterfaces.grocRound.shop.Emitter;
  protected readonly Model: mongoose.Model<mongoose.Document>;
  protected readonly mapDetails: sharedLogicInterfaces.dataStructures.MapDetails;

  /*****************************************************************/

  constructor( params: {
    emitter: storageInterfaces.grocRound.shop.Emitter;
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

  readonly get = ( filtrationCriteria: storageInterfaces.grocRound.shop.FiltrationCriteria, sortCriteria: storageInterfaces.grocRound.shop.SortCriteria, limit: number, forceThrow = false ): Promise<interfaces.dataModel.grocRound.shop.Super[]> => {

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
      .then(( foundShops: Model[] ) => {

        return this.convertToAbstract( foundShops );

      } )
      .then(( convertedShops: interfaces.dataModel.grocRound.shop.Super[] ) => {

        new Promise<interfaces.dataModel.grocRound.shop.Super[]>(( resolve, reject ) => {
          this.emitter.got( {
            filtrationCriteria: filtrationCriteria,
            sortCriteria: sortCriteria,
            limit: limit,
            ids: convertedShops.map(( shop ) => {
              return shop.id;
            } )
          } );
          resolve();
        } );

        return Promise.resolve( convertedShops );

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

  readonly getById = ( shopId: string, forceThrow = false ): Promise<interfaces.dataModel.grocRound.shop.Super> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.findById( mongoose.Types.ObjectId( shopId ) );

      } )
      .then(( foundShop: Model ) => {

        return this.convertToAbstract( [ foundShop ] );

      } )
      .then(( convertedShops: interfaces.dataModel.grocRound.shop.Super[] ) => {

        new Promise<void>(( resolve, reject ) => {
          this.emitter.gotById( {
            id: shopId
          } );
        } );

        return Promise.resolve( convertedShops[ 0 ] );

      } )
      .catch(( reason: any ) => {

        new Promise<void>(( resolve, reject ) => {
          this.emitter.getByIdFailed( {
            id: shopId,
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

  readonly addBatch = ( shops: storageInterfaces.grocRound.shop.AddDetails[], forceThrow = false ): Promise<interfaces.dataModel.grocRound.shop.Super[]> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.saveMultipleDocuments( shops.map(( shop ) => {
          let shopDetails: Model_Partial = {
            shopName: shop.shopName,
            numProducts: shop.numProducts
          };
          if ( shop.images ) {
            shopDetails.images = shop.images;
          }
          return shopDetails;
        } ) );

      } )
      .then(( addedShops: Model[] ) => {

        return this.convertToAbstract( addedShops );

      } )
      .then(( convertedShops: interfaces.dataModel.grocRound.shop.Super[] ) => {

        new Promise<void>(( resolve, reject ) => {
          this.emitter.added( {
            documents: convertedShops
          } );
          resolve();
        } );

        return Promise.resolve( convertedShops );

      } )
      .catch(( reason: any ) => {

        new Promise<any>(( resolve, reject ) => {
          this.emitter.addFailed( {
            details: shops,
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

  readonly add = ( details: storageInterfaces.grocRound.shop.AddDetails, forceThrow = false ): Promise<interfaces.dataModel.grocRound.shop.Super> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        let shopDetails: Model_Partial = {
          shopName: details.shopName,
          numProducts: details.numProducts
        };
        if ( details.images ) {
          shopDetails.images = details.images;
        }

        return this.saveDocument( shopDetails );

      } )
      .then(( addedShop: Model ) => {

        return this.convertToAbstract( [ addedShop ] );

      } )
      .then(( convertedShops: interfaces.dataModel.grocRound.shop.Super[] ) => {

        new Promise<void>(( resolve, reject ) => {
          this.emitter.added( {
            documents: convertedShops
          } );
          resolve();
        } );

        return Promise.resolve( convertedShops[ 0 ] );

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

  readonly update = ( filtrationCriteria: storageInterfaces.grocRound.shop.FiltrationCriteria, details: storageInterfaces.grocRound.shop.UpdateDetails, forceThrow = false ): Promise<interfaces.dataModel.grocRound.shop.Super[]> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.makeConditions( filtrationCriteria );

      } ).then(( conditions: QueryConditions ) => {

        return this.find( conditions, null, null );

      } )
      .then(( foundShops: Model[] ) => {

        return Promise.all( foundShops.map(( shop ) => {

          return this.generateUpdateDetails( shop, details )
            .then(( fedShop: Model ) => {

              return new Promise<Model>(( resolve, reject ) => {
                fedShop.save(( err: any ) => {
                  if ( err ) {
                    reject( err );
                  } else {
                    resolve( fedShop );
                  }
                } );
              } );

            } );

        } ) );

      } )
      .then(( updatedShops: Model[] ) => {

        return this.convertToAbstract( updatedShops );

      } )
      .then(( updatedShops: interfaces.dataModel.grocRound.shop.Super[] ) => {

        new Promise<any>(( resolve, reject ) => {
          this.emitter.updated( {
            conditions: filtrationCriteria,
            documents: updatedShops
          } );
          resolve();
        } );

        return Promise.resolve( updatedShops );

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

  readonly updateById = ( shopId: string, details: storageInterfaces.grocRound.shop.UpdateDetails, forceThrow = false ): Promise<interfaces.dataModel.grocRound.shop.Super> => {

    let shopObjectId: mongoose.Types.ObjectId;

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.findById( mongoose.Types.ObjectId( shopId ) );

      } )
      .then(( shop: Model ) => {

        return this.generateUpdateDetails( shop, details )
          .then(( fedShop: Model ) => {

            return new Promise<Model>(( resolve, reject ) => {
              fedShop.save(( err: any ) => {
                if ( err ) {
                  reject( err );
                } else {
                  resolve( fedShop );
                }
              } );
            } );

          } );

      } )
      .then(( updatedShop: Model ) => {

        return this.convertToAbstract( [ updatedShop ] );

      } )
      .then(( convertedShops: interfaces.dataModel.grocRound.shop.Super[] ) => {

        new Promise<any>(( resolve, reject ) => {
          this.emitter.updated( {
            id: shopId,
            documents: convertedShops
          } );
          resolve();
        } );

        return Promise.resolve( convertedShops[ 0 ] );

      } )
      .catch(( reason: any ) => {

        new Promise<any>(( resolve, reject ) => {
          this.emitter.updateFailed( {
            id: shopId,
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

  readonly remove = ( filtrationCriteria: storageInterfaces.grocRound.shop.FiltrationCriteria, forceThrow = false ): Promise<void> => {

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

  readonly removeById = ( shopId: string, forceThrow?: boolean ): Promise<void> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.removeDocuments( {
          "_id": mongoose.Types.ObjectId( shopId )
        } );

      } )
      .then(( response: any ) => {

        new Promise<any>(( resolve, reject ) => {
          this.emitter.removed( {
            id: shopId
          } );
          resolve();
        } );

        return Promise.resolve();

      } )
      .catch(( reason: any ) => {

        new Promise<any>(( resolve, reject ) => {
          this.emitter.removeFailed( {
            id: shopId,
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

  private readonly makeConditions = ( filtrationCriteria: storageInterfaces.grocRound.shop.FiltrationCriteria ): Promise<QueryConditions> => {

    return new Promise<QueryConditions>(( resolve, reject ) => {

      let conditions: QueryConditions = {};

      if ( filtrationCriteria.shopName ) {
        conditions[ "shopName" ] = filtrationCriteria.shopName;
      }

      if ( filtrationCriteria.images ) {
        conditions[ "images" ] = { $all: filtrationCriteria.images };
      }

      if ( filtrationCriteria.numProducts ) {
        conditions[ "numProducts" ] = {};
        if ( filtrationCriteria.numProducts.min ) {
          conditions[ "numProducts" ].$gte = filtrationCriteria.numProducts.min;
        }
        if ( filtrationCriteria.numProducts.max ) {
          conditions[ "numProducts" ].$lte = filtrationCriteria.numProducts.max;
        }
      }

      if ( filtrationCriteria.textSearch ) {
        conditions.$text = { $search: filtrationCriteria.textSearch };
      }

      resolve( conditions );

    } );

  }

  /*****************************************************************/

  private readonly makeSortCriteria = ( sortCriteria: storageInterfaces.grocRound.shop.SortCriteria ): Promise<string> => {

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

  private readonly generateUpdateDetails = ( document: Model, details: storageInterfaces.grocRound.shop.UpdateDetails ): Promise<Model> => {

    return new Promise<Model>(( resolve, reject ) => {

      if ( details.shopName ) {
        document.shopName = details.shopName;
      }

      if ( details.imagesToAdd ) {
        details.imagesToAdd.forEach(( image ) => {
          document.images.push( image );
        } );
      }

      if ( details.imagesToRemove ) {
        details.imagesToRemove.forEach(( image ) => {
          let index = document.images.indexOf( image );
          if ( index && index != -1 ) {
            document.images.splice( index, 1 );
          }
        } );
      }

      if ( details.numProductsPlus ) {
        document.numProducts += details.numProductsPlus;
      }
      if ( details.numProductsMinus ) {
        document.numProducts -= details.numProductsMinus;
      }
      if ( details.numProducts ) {
        document.numProducts = details.numProducts;
      }

      resolve( document );

    } );

  }

  /*****************************************************************/

  private readonly convertToAbstract = ( shops: Model[], forceThrow = false ): Promise<interfaces.dataModel.grocRound.shop.Super[]> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return new Promise<interfaces.dataModel.grocRound.shop.Super[]>(( resolve, reject ) => {

          let returnShops: interfaces.dataModel.grocRound.shop.Super[] = [];

          shops.forEach(( shop ) => {

            let returnShop: interfaces.dataModel.grocRound.shop.Super = {
              id: ( <mongoose.Types.ObjectId>shop._id ).toHexString(),
              shopName: shop.shopName,
              numProducts: shop.numProducts,
              createdAt: shop.createdAt,
              updatedAt: shop.updatedAt
            };
            if ( shop.images ) {
              returnShop.images = shop.images;
            }

            returnShops.push( returnShop );

          } );

          resolve( returnShops );

        } );

      } );

  }

  /*****************************************************************/

}

/******************************************************************************/

interface QueryConditions {
  "shopName"?: string;
  "images"?: { $all: string[] };
  "numProducts"?: { $gte?: number; $lte?: number; };
  $text?: { $search: string };
}

/******************************************************************************/

export default ( params: {
  emitEvent: interfaces.setupConfig.eventManager.Emit;
  mapDetails: sharedLogicInterfaces.dataStructures.MapDetails;
  checkThrow: sharedLogicInterfaces.moders.CheckThrow;
} ): storageInterfaces.grocRound.Shop => {
  return new MongoShop( {
    emitter: emitterFactory( params.emitEvent ),
    Model: ShopMongooseModel,
    mapDetails: params.mapDetails,
    checkThrow: params.checkThrow
  } );
}

/******************************************************************************/
