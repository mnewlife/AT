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
import * as interfaces from "../../../interfaces/groc-round/track-product";

import { Model, MongooseModel } from "./model";

/*******************************************************************************/

export default (
  emitEvent: eventListener.Emit,
  mapDetails: dataStructures.MapDetails,
  checkThrow: moders.CheckThrow
): interfaces.Instance => {

  let models = new Events<interfaces.Context, interfaces.FiltrationCriteria,
    interfaces.SortCriteria, interfaces.AddDetails, interfaces.UpdateDetails,
    dataModel.grocRound.trackProduct.Super>( emitEvent, "GrocRound|TrackProduct" );

  return new ModelController<interfaces.FiltrationCriteria, storage.BaseSortCriteria,
    interfaces.AddDetails, interfaces.UpdateDetails, QueryConditions, Model,
    dataModel.grocRound.trackProduct.Super, interfaces.Events>(

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
  "track.trackId"?: mongoose.Types.ObjectId;
  "track.trackName"?: string;

  "product.productId"?: mongoose.Types.ObjectId;
  "product.label"?: string;

  "quantity"?: { $gte?: number; $lte?: number; };
  "value"?: { $gte?: number; $lte?: number; };

  $text?: { $search: string };
}

/******************************************************************************/

function makeConditions ( filtrationCriteria: storage.grocRound.trackProduct.FiltrationCriteria ): Promise<QueryConditions> {

  return new Promise<QueryConditions>( ( resolve, reject ) => {

    let conditions: QueryConditions = {};

    if ( filtrationCriteria.track ) {

      if ( filtrationCriteria.track.trackId ) {
        conditions[ "track.trackId" ] = mongoose.Types.ObjectId( filtrationCriteria.track.trackId );
      }

      if ( filtrationCriteria.track.trackName ) {
        conditions[ "track.trackName" ] = filtrationCriteria.track.trackName;
      }

    }

    if ( filtrationCriteria.product ) {

      if ( filtrationCriteria.product.productId ) {
        conditions[ "product.productId" ] = mongoose.Types.ObjectId( filtrationCriteria.product.productId );
      }

      if ( filtrationCriteria.product.label ) {
        conditions[ "product.label" ] = filtrationCriteria.product.label;
      }

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

    if ( filtrationCriteria.value ) {
      conditions[ "value" ] = {};
      if ( filtrationCriteria.value.min ) {
        conditions[ "value" ].$gte = filtrationCriteria.value.min;
      }
      if ( filtrationCriteria.value.max ) {
        conditions[ "value" ].$lte = filtrationCriteria.value.max;
      }
    }

    if ( filtrationCriteria.textSearch ) {
      conditions.$text = { $search: filtrationCriteria.textSearch };
    }

    resolve( conditions );

  } );

}

/******************************************************************************/

function makeSortCriteria ( sortCriteria: storage.grocRound.trackProduct.SortCriteria ): Promise<string> {

  return new Promise<string>( ( resolve, reject ) => {
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

  models.forEach( ( model ) => {

    let details: Partial<Model> = {
      track: {
        trackId: mongoose.Types.ObjectId( model.track.trackId ),
        trackName: model.track.trackName
      },
      product: {
        productId: mongoose.Types.ObjectId( model.product.productId ),
        label: model.product.label
      },
      quantity: model.quantity,
      value: model.value
    };

    returnDetails.push( details );

  } );

  return returnDetails;

}

/******************************************************************************/

function generateUpdateDetails ( document: Model, details: storage.grocRound.trackProduct.UpdateDetails ): Promise<Model> {

  return new Promise<Model>( ( resolve, reject ) => {

    if ( details.track ) {

      if ( details.track.trackId ) {
        document.track.trackId = mongoose.Types.ObjectId( details.track.trackId );
      }

      if ( details.track.trackName ) {
        document.track.trackName = details.track.trackName;
      }

    }

    if ( details.product ) {

      if ( details.product.productId ) {
        document.product.productId = mongoose.Types.ObjectId( details.product.productId );
      }

      if ( details.product.label ) {
        document.product.label = details.product.label;
      }

    }

    if ( details.quantity ) {
      document.quantity = details.quantity;
    }

    if ( details.value ) {
      document.value = details.value;
    }

    resolve( document );

  } );

}

/******************************************************************************/

function convertToAbstract ( models: Model[], forceThrow = false ): Promise<dataModel.grocRound.trackProduct.Super[]> {

  return this.checkThrow( forceThrow )
    .then( ( response: any ) => {

      return new Promise<dataModel.grocRound.trackProduct.Super[]>( ( resolve, reject ) => {

        let returnModels: dataModel.grocRound.trackProduct.Super[] = [];

        models.forEach( ( model ) => {

          let returnModel: dataModel.grocRound.trackProduct.Super = {
            id: ( <mongoose.Types.ObjectId>model._id ).toHexString(),
            track: {
              trackId: model.track.trackId.toHexString(),
              trackName: model.track.trackName
            },
            product: {
              productId: model.product.productId.toHexString(),
              label: model.product.label
            },
            quantity: model.quantity,
            value: model.value,
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