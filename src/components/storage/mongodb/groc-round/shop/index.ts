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
import * as interfaces from "../../../interfaces/groc-round/shop";

import { Model, MongooseModel } from "./model";

/*******************************************************************************/

export default (
  emitEvent: eventListener.Emit,
  mapDetails: dataStructures.MapDetails,
  checkThrow: moders.CheckThrow
): interfaces.Instance => {

  let models = new Events<interfaces.Context, interfaces.FiltrationCriteria,
    interfaces.SortCriteria, interfaces.AddDetails, interfaces.UpdateDetails,
    dataModel.grocRound.shop.Super>( emitEvent, "GrocRound|Shop" );

  return new ModelController<interfaces.FiltrationCriteria, storage.BaseSortCriteria,
    interfaces.AddDetails, interfaces.UpdateDetails, QueryConditions, Model,
    dataModel.grocRound.shop.Super, interfaces.Events>(

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
  "shopName"?: string;
  "images"?: { $all: string[] };
  "numProducts"?: { $gte?: number; $lte?: number; };
  $text?: { $search: string };
}

/******************************************************************************/

function makeConditions ( filtrationCriteria: storage.grocRound.shop.FiltrationCriteria ): Promise<QueryConditions> {

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

/******************************************************************************/

function makeSortCriteria ( sortCriteria: storage.grocRound.shop.SortCriteria ): Promise<string> {

  return new Promise<string>(( resolve, reject ) => {
    let sortString;
    sortString = sortCriteria.criteria;
    if ( sortCriteria.order === "Descending" ) {
      sortString = "-" + sortString;
    }
    resolve( sortString );
  } );

}

/******************************************************************************/

function generateAddDetails ( models: interfaces.AddDetails[] ): Partial<Model>[] {

  let returnDetails: Partial<Model>[] = [];

  models.forEach(( model ) => {

    let details: Partial<Model> = {
      shopName: model.shopName,
      numProducts: model.numProducts
    };
    
    returnDetails.push( details );

  } );

  return returnDetails;

}

/******************************************************************************/

function generateUpdateDetails ( document: Model, details: storage.grocRound.shop.UpdateDetails ): Promise<Model> {

  return new Promise<Model>(( resolve, reject ) => {

    if ( details.shopName ) {
      document.shopName = details.shopName;
    }
    
    if ( details.images ) {
      document.images = [];
      details.images.forEach(( image ) => {
        document.images.push( image );
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

/******************************************************************************/

function convertToAbstract ( models: Model[], forceThrow = false ): Promise<dataModel.grocRound.shop.Super[]> {

  return this.checkThrow( forceThrow )
    .then(( response: any ) => {

      return new Promise<dataModel.grocRound.shop.Super[]>(( resolve, reject ) => {

        let returnModels: dataModel.grocRound.shop.Super[] = [];

        models.forEach(( model ) => {

          let returnModel: dataModel.grocRound.shop.Super = {
            id: ( <mongoose.Types.ObjectId>model._id ).toHexString(),
            shopName: model.shopName,
            numProducts: model.numProducts,
            createdAt: model.createdAt,
            updatedAt: model.updatedAt
          };

          
          returnModels.push( returnModel );

        } );

        resolve( returnModels );

      } );

    } );

}

/******************************************************************************/