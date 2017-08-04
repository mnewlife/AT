/******************************************************************************/

import * as Promise from "bluebird";
import * as mongoose from "mongoose";

import * as interfaces from "../../../../interfaces/index";

import * as events from "../../../../interfaces/events/utilities/storage-manager/shop/index";
import * as getParams from "../../../../interfaces/data-model/get-params/shop/index";
import * as storageManagerInterfaces from "../../../../interfaces/utilities/storage-manager/index";
import * as shopInterfaces from "../../../../interfaces/utilities/storage-manager/shop/index";

import * as dataStructuresInterfaces from "../../../../interfaces/utilities/shared-logic/data-structures/index";

import MongoController from "../mongo-controller/index";
import { ShopModel, ShopMongooseModel } from "./model/index";

import emitterFactory from "./event-emitter";

/******************************************************************************/

class MongoStorageShop extends MongoController implements storageManagerInterfaces.StorageShop {

  /*****************************************************************/

  constructor( protected readonly emitter: shopInterfaces.Emitter, protected readonly Model: mongoose.Model<mongoose.Document>, mapDetails: dataStructuresInterfaces.MapDetails ) {
    super( emitter, Model, mapDetails );
  }

  /*****************************************************************/

  readonly get = ( filtrationCriteria: getParams.FiltrationCriteria, sortCriteria: getParams.SortCriteria, limit: number, forceThrow = false ): Promise<any> => {

    let params: any = {
      conditions: "",
      sortCriteria: "",
      limit: 0
    };

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.makeConditions( filtrationCriteria );

      } )
      .then(( conditions: any ) => {

        if ( conditions ) {
          params.conditions = conditions;
        }

        return this.makeSortCriteria( sortCriteria );

      } )
      .then(( retrievedSortCriteria: string ) => {

        if ( retrievedSortCriteria ) {
          params.sortCriteria = retrievedSortCriteria;
        }

        if ( limit ) {
          params.limit = limit;
        }

        return Promise.resolve();

      } )
      .then(( response: any ) => {

        return this.find( params.conditions, params.sortCriteria, params.limit );

      } )
      .then(( foundShops: interfaces.dataModel.Shop[] ) => {

        new Promise<any>(( resolve, reject ) => {

          this.emitter.got( {
            filtrationCriteria: filtrationCriteria,
            sortCriteria: sortCriteria,
            limit: limit,
            numDocuments: foundShops.length
          } );

          resolve();

        } );

        return Promise.resolve( foundShops );

      } )
      .catch(( reason: any ) => {

        new Promise<any>(( resolve, reject ) => {

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

  readonly getById = ( shopIdString: string, forceThrow = false ): Promise<any> => {

    let shopId = mongoose.Types.ObjectId( shopIdString );

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.findById( shopId );

      } )
      .then(( foundShop: interfaces.dataModel.Shop ) => {

        new Promise<any>(( resolve, reject ) => {

          this.emitter.gotById( {
            id: shopId
          } );

        } );

        return Promise.resolve( foundShop );

      } )
      .catch(( reason: any ) => {

        new Promise<any>(( resolve, reject ) => {

          this.emitter.getByIdFailed( {
            id: shopId,
            reason: reason
          } );

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

  readonly addBatch = ( shops: shopInterfaces.AddBatchParams[], forceThrow = false ): Promise<any> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.saveMulitpleDocuments( shops.map(( shop ) => {

          return {
            shopName: shop.shopName,
            images: ( shop.images ) ? shop.images : [],
            numProducts: 0
          };

        } ) );

      } )
      .then(( shops: interfaces.dataModel.Shop[] ) => {

        new Promise<any>(( resolve, reject ) => {

          shops.forEach(( shop: interfaces.dataModel.Shop ) => {

            this.emitter.added( {
              document: shop
            } );

          } );

          resolve();

        } );

        return Promise.resolve( shops );

      } )
      .catch(( reason: any ) => {

        new Promise<any>(( resolve, reject ) => {

          this.emitter.addFailed( {
            details: shops,
            reason: reason
          } );

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

  readonly add = ( shopName: string, images?: string[], forceThrow?: boolean ): Promise<any> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.saveDocument( {
          shopName: shopName,
          images: ( images ) ? images : [],
          numProducts: 0
        } );

      } )
      .then(( shop: ShopModel ) => {

        new Promise<any>(( resolve, reject ) => {

          this.emitter.added( {
            document: shop
          } );

        } );

        return Promise.resolve( shop );

      } )
      .catch(( reason: any ) => {

        new Promise<any>(( resolve, reject ) => {

          this.emitter.addFailed( {
            details: {
              shopName: shopName,
              images: ( images ) ? images : [],
              numProducts: 0
            },
            reason: reason
          } );

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

  readonly update = ( filtrationCriteria: getParams.FiltrationCriteria, details: shopInterfaces.UpdateDetails, forceThrow = false ): Promise<any> => {

    let params: any = {
      conditions: "",
      details: ""
    };

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.makeConditions( filtrationCriteria );

      } )
      .then(( conditions: any ) => {

        if ( conditions ) {
          params.conditions = conditions;
        }

        return this.generateUpdateDetails( details );

      } )
      .then(( details: any ) => {

        if ( details ) {
          params.details = details;
        }

        return this.updateDocuments( params.conditions, params.details );

      } )
      .then(( updatedDocuments: interfaces.dataModel.Shop[] ) => {

        new Promise<any>(( resolve, reject ) => {

          updatedDocuments.forEach(( document: interfaces.dataModel.Shop ) => {

            this.emitter.updated( {
              conditions: filtrationCriteria,
              document: document
            } );

          } );

        } );

        return Promise.resolve( updatedDocuments );

      } )
      .catch(( reason: any ) => {

        new Promise<any>(( resolve, reject ) => {

          this.emitter.updateFailed( {
            conditions: filtrationCriteria,
            details: details,
            reason: reason
          } );

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

  readonly updateById = ( shopIdString: string, details: shopInterfaces.UpdateDetails, forceThrow = false ): Promise<any> => {

    let params: any = {
      conditions: ""
    };

    let shopId = mongoose.Types.ObjectId( shopIdString );

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        params.conditions = {
          "_id": shopId
        };

        return this.generateUpdateDetails( details );

      } )
      .then(( details: any ) => {

        return this.updateDocuments( params.conditions, details );

      } )
      .then(( updatedDocuments: interfaces.dataModel.Shop[] ) => {

        new Promise<any>(( resolve, reject ) => {

          updatedDocuments.forEach(( document: interfaces.dataModel.Shop ) => {

            this.emitter.updated( {
              id: shopId,
              document: document
            } );

          } );

        } );

        return Promise.resolve( updatedDocuments[ 0 ] );

      } )
      .catch(( reason: any ) => {

        new Promise<any>(( resolve, reject ) => {

          this.emitter.updateFailed( {
            id: shopId,
            details: details,
            reason: reason
          } );

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

  readonly remove = ( filtrationCriteria: getParams.FiltrationCriteria, forceThrow = false ): Promise<any> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.makeConditions( filtrationCriteria );

      } )
      .then(( conditions: any ) => {

        return this.removeDocuments( conditions );

      } )
      .then(( response: any ) => {

        new Promise<any>(( resolve, reject ) => {

          this.emitter.removed( {
            conditions: filtrationCriteria
          } );

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

  readonly removeById = ( shopIdString: string, forceThrow?: boolean ): Promise<any> => {

    let shopId = mongoose.Types.ObjectId( shopIdString );

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.removeDocuments( {
          "_id": shopId
        } );

      } )
      .then(( response: any ) => {

        new Promise<any>(( resolve, reject ) => {

          this.emitter.removed( {
            id: shopId
          } );

        } );

        return Promise.resolve();

      } )
      .catch(( reason: any ) => {

        new Promise<any>(( resolve, reject ) => {

          this.emitter.removeFailed( {
            id: shopId,
            reason: reason
          } );

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

  private readonly makeConditions = ( filtrationCriteria: getParams.FiltrationCriteria ): Promise<any> => {

    let conditions: any = {};

    return new Promise<any>(( resolve, reject ) => {

      if ( !filtrationCriteria ) {
        return resolve( "" );
      }

      if ( filtrationCriteria.hasOwnProperty( "shopName" ) ) {
        conditions[ "shopName" ] = filtrationCriteria.shopName;
      }

      if ( filtrationCriteria.hasOwnProperty( "images" ) ) {
        conditions[ "images" ] = {};
        conditions[ "images" ].$all = filtrationCriteria.images;
      }

      if ( filtrationCriteria.hasOwnProperty( "numProductsMin" ) || filtrationCriteria.hasOwnProperty( "numProductsMax" ) ) {
        conditions[ "numProducts" ] = {};
      }
      if ( filtrationCriteria.hasOwnProperty( "numProductsMin" ) ) {
        conditions[ "numProducts" ].$gte = filtrationCriteria.numProductsMin;
      }
      if ( filtrationCriteria.hasOwnProperty( "numProductsMax" ) ) {
        conditions[ "numProducts" ].$lte = filtrationCriteria.numProductsMax;
      }

      if ( filtrationCriteria.hasOwnProperty( "textSearch" ) ) {
        conditions.$text = {
          $search: filtrationCriteria.textSearch
        };
      }

      resolve( conditions );

    } );

  }

  /*****************************************************************/

  private readonly makeSortCriteria = ( sortCriteria: getParams.SortCriteria ): Promise<any> => {

    return new Promise<any>(( resolve, reject ) => {

      let sortString: string;
      let criteria: string;

      if ( !sortCriteria ) {
        resolve( "" );
      }

      criteria = sortCriteria.criteria;

      if ( sortCriteria.order === "Descending" ) {
        sortString = "-" + criteria;
      } else {
        sortString = criteria;
      }

      resolve( sortString );

    } );

  }

  /*****************************************************************/

  private readonly generateUpdateDetails = ( details: shopInterfaces.UpdateDetails ): Promise<any> => {

    return new Promise<any>(( resolve, reject ) => {

      if ( !details ) {
        resolve( "" );
      }

      let updateDetails: any = {};

      let subjects: any[] = [
        "shopName",
        "images",
        "numProducts"
      ];

      subjects.forEach(( subject: any ) => {
        if ( details[ subject ] ) {
          updateDetails[ subject ] = details[ subject ];
        }
      } );

      resolve( updateDetails );

    } );

  }

  /*****************************************************************/

}

/******************************************************************************/

export default ( emitEvent: interfaces.setupConfig.eventManager.Emit, mapDetails: dataStructuresInterfaces.MapDetails ): storageManagerInterfaces.StorageShop => {

  return new MongoStorageShop( emitterFactory( emitEvent ), ShopMongooseModel, mapDetails );

}

/******************************************************************************/
