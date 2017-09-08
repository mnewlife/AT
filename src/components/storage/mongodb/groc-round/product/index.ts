/******************************************************************************/

import * as Promise from "bluebird";
import * as mongoose from "mongoose";

import * as eventListener from "../../../../../event-listener/interfaces";
import * as dataModel from "../../../../../data-model";
import * as dataStructures from "../../../../helpers/data-structures/interfaces";
import * as moders from "../../../../helpers/moders/interfaces";

import ModelController from "../../generic-model-class";
import Events from "../../generic-event-class";

import * as storage from "../../../interfaces";
import * as interfaces from "../../../interfaces/groc-round/product";

import { Model, PartialModel, MongooseModel } from "./model";

/*******************************************************************************/

export default (
  emitEvent: eventListener.Emit,
  mapDetails: dataStructures.MapDetails,
  checkThrow: moders.CheckThrow
): interfaces.Instance => {

  let models = new Events<interfaces.Context, interfaces.FiltrationCriteria,
    interfaces.SortCriteria, interfaces.AddDetails, interfaces.UpdateDetails,
    dataModel.grocRound.product.Super>( emitEvent, "GrocRound|Product" );

  return new ModelController<interfaces.FiltrationCriteria, storage.BaseSortCriteria,
    interfaces.AddDetails, interfaces.UpdateDetails, QueryConditions, Model,
    dataModel.grocRound.product.Super, interfaces.Events>(

    models,
    MongooseModel,
    mapDetails,
    checkThrow,
    makeConditions,
    makeSortCriteria,
    generateAddDetails,
    generateUpdateDetails,
    convertToAbstract

    );

}

/******************************************************************************/

interface QueryConditions {
  "label"?: string;
  "images"?: { $all: string[] };

  "priceValues.min.shopId"?: mongoose.Types.ObjectId;
  "priceValues.min.price"?: { $gte?: number; $lte?: number; };

  "priceValues.max.shopId"?: mongoose.Types.ObjectId;
  "priceValues.max.price"?: { $gte?: number; $lte?: number; };

  "priceValues.median.shopId"?: mongoose.Types.ObjectId;
  "priceValues.median.price"?: { $gte?: number; $lte?: number; };

  "priceValues.mean.shopId"?: mongoose.Types.ObjectId;
  "priceValues.mean.price"?: { $gte?: number; $lte?: number; };

  "effectivePrice.shopId"?: mongoose.Types.ObjectId;
  "effectivePrice.price"?: { $gte?: number; $lte?: number; };

  $text?: { $search: string };
}

/******************************************************************************/

function makeConditions ( filtrationCriteria: storage.grocRound.product.FiltrationCriteria ): Promise<QueryConditions> {

  return new Promise<QueryConditions>(( resolve, reject ) => {

    let conditions: QueryConditions = {};

    if ( filtrationCriteria.label ) {
      conditions[ "label" ] = filtrationCriteria.label;
    }
    
    if ( filtrationCriteria.images ) {
      conditions[ "images" ] = { $all: filtrationCriteria.images };
    }
    
    if ( filtrationCriteria.priceValues ) {
    
      if ( filtrationCriteria.priceValues.min ) {
        if ( filtrationCriteria.priceValues.min.shopId ) {
          conditions[ "priceValues.min.shopId" ] = mongoose.Types.ObjectId( filtrationCriteria.priceValues.min.shopId );
        }
        if ( filtrationCriteria.priceValues.min.price ) {
          conditions[ "priceValues.min.price" ] = {};
          if ( filtrationCriteria.priceValues.min.price.min ) {
            conditions[ "priceValues.min.price" ].$gte = filtrationCriteria.priceValues.min.price.min;
          }
          if ( filtrationCriteria.priceValues.min.price.max ) {
            conditions[ "priceValues.min.price" ].$lte = filtrationCriteria.priceValues.min.price.max;
          }
        }
      }
    
      if ( filtrationCriteria.priceValues.max ) {
        if ( filtrationCriteria.priceValues.max.shopId ) {
          conditions[ "priceValues.max.shopId" ] = mongoose.Types.ObjectId( filtrationCriteria.priceValues.max.shopId );
        }
        if ( filtrationCriteria.priceValues.max.price ) {
          conditions[ "priceValues.max.price" ] = {};
          if ( filtrationCriteria.priceValues.max.price.min ) {
            conditions[ "priceValues.max.price" ].$gte = filtrationCriteria.priceValues.max.price.min;
          }
          if ( filtrationCriteria.priceValues.max.price.max ) {
            conditions[ "priceValues.max.price" ].$lte = filtrationCriteria.priceValues.max.price.max;
          }
        }
      }
    
      if ( filtrationCriteria.priceValues.median ) {
        if ( filtrationCriteria.priceValues.median.shopId ) {
          conditions[ "priceValues.median.shopId" ] = mongoose.Types.ObjectId( filtrationCriteria.priceValues.median.shopId );
        }
        if ( filtrationCriteria.priceValues.median.price ) {
          conditions[ "priceValues.median.price" ] = {};
          if ( filtrationCriteria.priceValues.median.price.min ) {
            conditions[ "priceValues.median.price" ].$gte = filtrationCriteria.priceValues.median.price.min;
          }
          if ( filtrationCriteria.priceValues.median.price.max ) {
            conditions[ "priceValues.median.price" ].$lte = filtrationCriteria.priceValues.median.price.max;
          }
        }
      }
    
      if ( filtrationCriteria.priceValues.mean ) {
        if ( filtrationCriteria.priceValues.mean.shopId ) {
          conditions[ "priceValues.mean.shopId" ] = mongoose.Types.ObjectId( filtrationCriteria.priceValues.mean.shopId );
        }
        if ( filtrationCriteria.priceValues.mean.price ) {
          conditions[ "priceValues.mean.price" ] = {};
          if ( filtrationCriteria.priceValues.mean.price.min ) {
            conditions[ "priceValues.mean.price" ].$gte = filtrationCriteria.priceValues.mean.price.min;
          }
          if ( filtrationCriteria.priceValues.mean.price.max ) {
            conditions[ "priceValues.mean.price" ].$lte = filtrationCriteria.priceValues.mean.price.max;
          }
        }
      }
    
    }
    
    if ( filtrationCriteria.effectivePrice ) {
      if ( filtrationCriteria.effectivePrice.shopId ) {
        conditions[ "effectivePrice.shopId" ] = mongoose.Types.ObjectId( filtrationCriteria.effectivePrice.shopId );
      }
      if ( filtrationCriteria.effectivePrice.price ) {
        conditions[ "effectivePrice.price" ] = {};
        if ( filtrationCriteria.effectivePrice.price.min ) {
          conditions[ "effectivePrice.price" ].$gte = filtrationCriteria.effectivePrice.price.min;
        }
        if ( filtrationCriteria.effectivePrice.price.max ) {
          conditions[ "effectivePrice.price" ].$lte = filtrationCriteria.effectivePrice.price.max;
        }
      }
    }

    if ( filtrationCriteria.textSearch ) {
      conditions.$text = { $search: filtrationCriteria.textSearch };
    }

    resolve( conditions );

  } );

}

/******************************************************************************/

function makeSortCriteria ( sortCriteria: storage.grocRound.product.SortCriteria ): Promise<string> {

  return new Promise<string>(( resolve, reject ) => {
    let sortString;
    if ( sortCriteria.criteria === "effectivePrice" ) {
      sortString = "effectivePrice.price";
    } else {
      sortString = sortCriteria.criteria;
    }
    if ( sortCriteria.order === "Descending" ) {
      sortString = "-" + sortString;
    }
    resolve( sortString );
  } );

}

/******************************************************************************/

function generateAddDetails ( models: interfaces.AddDetails[] ): PartialModel[] {

  let returnDetails: PartialModel[] = [];

  models.forEach(( model ) => {

    let details: PartialModel = {
      label: model.label,
      priceValues: {},
      effectivePrice: {
        price: model.effectivePrice.price
      }
    };
    if ( model.effectivePrice.shopId ) {
      details.effectivePrice.shopId = mongoose.Types.ObjectId( model.effectivePrice.shopId );
    }
    if ( model.images ) {
      details.images = model.images;
    }
    if ( model.priceValues.min ) {
      details.priceValues.min = {
        shopId: mongoose.Types.ObjectId( model.priceValues.min.shopId ),
        price: model.priceValues.min.price
      };
    }
    if ( model.priceValues.max ) {
      details.priceValues.max = {
        shopId: mongoose.Types.ObjectId( model.priceValues.max.shopId ),
        price: model.priceValues.max.price
      };
    }
    if ( model.priceValues.median ) {
      details.priceValues.median = {
        shopId: mongoose.Types.ObjectId( model.priceValues.median.shopId ),
        price: model.priceValues.median.price
      };
    }
    if ( model.priceValues.mean ) {
      details.priceValues.mean = {
        shopId: mongoose.Types.ObjectId( model.priceValues.mean.shopId ),
        price: model.priceValues.mean.price
      };
    }
    
    returnDetails.push( details );

  } );

  return returnDetails;

}

/******************************************************************************/

function generateUpdateDetails ( document: Model, details: storage.grocRound.product.UpdateDetails ): Promise<Model> {

  return new Promise<Model>(( resolve, reject ) => {

    if ( details.label ) {
      document.label = details.label;
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
    
    if ( details.priceValues ) {
      if ( details.priceValues.min ) {
        document.priceValues.min.shopId = mongoose.Types.ObjectId( details.priceValues.min.shopId );
        document.priceValues.min.price = details.priceValues.min.price;
        document.priceValues.min.updatedAt = new Date();
      }
      if ( details.priceValues.max ) {
        document.priceValues.max.shopId = mongoose.Types.ObjectId( details.priceValues.max.shopId );
        document.priceValues.max.price = details.priceValues.max.price;
        document.priceValues.max.updatedAt = new Date();
      }
      if ( details.priceValues.median ) {
        document.priceValues.median.shopId = mongoose.Types.ObjectId( details.priceValues.median.shopId );
        document.priceValues.median.price = details.priceValues.median.price;
        document.priceValues.median.updatedAt = new Date();
      }
      if ( details.priceValues.mean ) {
        document.priceValues.mean.shopId = mongoose.Types.ObjectId( details.priceValues.mean.shopId );
        document.priceValues.mean.price = details.priceValues.mean.price;
        document.priceValues.mean.updatedAt = new Date();
      }
    }
    
    if ( details.effectivePrice ) {
      document.effectivePrice.shopId = mongoose.Types.ObjectId( details.effectivePrice.shopId ),
        document.effectivePrice.price = details.effectivePrice.price;
      document.effectivePrice.updatedAt = new Date();
    }

    resolve( document );

  } );

}

/******************************************************************************/

function convertToAbstract ( models: Model[], forceThrow = false ): Promise<dataModel.grocRound.product.Super[]> {

  return this.checkThrow( forceThrow )
    .then(( response: any ) => {

      return new Promise<dataModel.grocRound.product.Super[]>(( resolve, reject ) => {

        let returnModels: dataModel.grocRound.product.Super[] = [];

        models.forEach(( model ) => {

          let returnModel: dataModel.grocRound.product.Super = {
            id: ( <mongoose.Types.ObjectId>model._id ).toHexString(),
            label: model.label,
            priceValues: {
              id: ( <mongoose.Types.ObjectId>model.priceValues._id ).toHexString(),
              createdAt: model.priceValues.createdAt,
              updatedAt: model.priceValues.updatedAt
            },
            effectivePrice: {
              id: ( <mongoose.Types.ObjectId>model.effectivePrice._id ).toHexString(),
              price: model.effectivePrice.price,
              createdAt: model.effectivePrice.createdAt,
              updatedAt: model.effectivePrice.updatedAt                
            },
            createdAt: model.createdAt,
            updatedAt: model.updatedAt
          };
          if ( model.effectivePrice.shopId ) {
            returnModel.effectivePrice.shopId = ( model.effectivePrice.shopId as mongoose.Types.ObjectId ).toHexString();
          }
          if ( model.images ) {
            returnModel.images = model.images;
          }
          if ( model.priceValues.min ) {
            returnModel.priceValues.min = {
              id: ( model.priceValues.min._id as mongoose.Types.ObjectId ).toHexString(),
              shopId: ( model.priceValues.min.shopId as mongoose.Types.ObjectId ).toHexString(),
              price: model.priceValues.min.price,
              createdAt: model.priceValues.min.createdAt,
              updatedAt: model.priceValues.min.updatedAt
            };
          }
          if ( model.priceValues.max ) {
            returnModel.priceValues.max = {
              id: ( model.priceValues.max._id as mongoose.Types.ObjectId ).toHexString(),
              shopId: ( model.priceValues.max.shopId as mongoose.Types.ObjectId ).toHexString(),
              price: model.priceValues.max.price,
              createdAt: model.priceValues.max.createdAt,
              updatedAt: model.priceValues.max.updatedAt
            };
          }
          if ( model.priceValues.median ) {
            returnModel.priceValues.median = {
              id: ( model.priceValues.median._id as mongoose.Types.ObjectId ).toHexString(),
              shopId: ( model.priceValues.median.shopId as mongoose.Types.ObjectId ).toHexString(),
              price: model.priceValues.median.price,
              createdAt: model.priceValues.median.createdAt,
              updatedAt: model.priceValues.median.updatedAt
            };
          }
          if ( model.priceValues.mean ) {
            returnModel.priceValues.mean = {
              id: ( model.priceValues.mean._id as mongoose.Types.ObjectId ).toHexString(),
              shopId: ( model.priceValues.mean.shopId as mongoose.Types.ObjectId ).toHexString(),
              price: model.priceValues.mean.price,
              createdAt: model.priceValues.mean.createdAt,
              updatedAt: model.priceValues.mean.updatedAt
            };
          }
          
          returnModels.push( returnModel );

        } );

        resolve( returnModels );

      } );

    } );

}

/******************************************************************************/
