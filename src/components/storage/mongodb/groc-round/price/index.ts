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
import * as interfaces from "../../../interfaces/groc-round/price";

import { Model, PartialModel, MongooseModel } from "./model";

/*******************************************************************************/

export default (
  emitEvent: eventListener.Emit,
  mapDetails: dataStructures.MapDetails,
  checkThrow: moders.CheckThrow
): interfaces.Instance => {

  let models = new Events<interfaces.Context, interfaces.FiltrationCriteria,
    interfaces.SortCriteria, interfaces.AddDetails, interfaces.UpdateDetails,
    dataModel.grocRound.price.Super>( emitEvent, "GrocRound|Price" );

  return new ModelController<interfaces.FiltrationCriteria, storage.BaseSortCriteria,
    interfaces.AddDetails, interfaces.UpdateDetails, QueryConditions, Model,
    dataModel.grocRound.price.Super, interfaces.Events>(

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
  "productId"?: mongoose.Types.ObjectId;
  "shopId"?: mongoose.Types.ObjectId;
  "quantity"?: { $gte?: number; $lte?: number; };
  "price"?: { $gte?: number; $lte?: number; };
  $text?: { $search: string };
}

/******************************************************************************/

function makeConditions ( filtrationCriteria: storage.grocRound.price.FiltrationCriteria ): Promise<QueryConditions> {

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

/******************************************************************************/

function makeSortCriteria ( sortCriteria: storage.grocRound.price.SortCriteria ): Promise<string> {

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

function generateAddDetails ( models: interfaces.AddDetails[] ): PartialModel[] {

  let returnDetails: PartialModel[] = [];

  models.forEach(( model ) => {

    let details: PartialModel = {
      productId: mongoose.Types.ObjectId( model.productId ),
      shopId: mongoose.Types.ObjectId( model.shopId ),
      quantity: model.quantity,
      price: model.price
    };
    
    returnDetails.push( details );

  } );

  return returnDetails;

}

/******************************************************************************/

function generateUpdateDetails ( document: Model, details: storage.grocRound.price.UpdateDetails ): Promise<Model> {

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

/******************************************************************************/

function convertToAbstract ( models: Model[], forceThrow = false ): Promise<dataModel.grocRound.price.Super[]> {

  return this.checkThrow( forceThrow )
    .then(( response: any ) => {

      return new Promise<dataModel.grocRound.price.Super[]>(( resolve, reject ) => {

        let returnModels: dataModel.grocRound.price.Super[] = [];

        models.forEach(( model ) => {

          let returnModel: dataModel.grocRound.price.Super = {
            id: ( <mongoose.Types.ObjectId>model._id ).toHexString(),
            productId: ( model.productId as mongoose.Types.ObjectId ).toHexString(),
            shopId: ( model.shopId as mongoose.Types.ObjectId ).toHexString(),
            quantity: model.quantity,
            price: model.price,
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
