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
import * as interfaces from "../../../interfaces/groc-round/track";

import { Model, MongooseModel } from "./model";

/*******************************************************************************/

export default (
  emitEvent: eventListener.Emit,
  mapDetails: dataStructures.MapDetails,
  checkThrow: moders.CheckThrow
): interfaces.Instance => {

  let models = new Events<interfaces.Context, interfaces.FiltrationCriteria,
    interfaces.SortCriteria, interfaces.AddDetails, interfaces.UpdateDetails,
    dataModel.grocRound.track.Super>( emitEvent, "GrocRound|Track" );

  return new ModelController<interfaces.FiltrationCriteria, storage.BaseSortCriteria,
    interfaces.AddDetails, interfaces.UpdateDetails, QueryConditions, Model,
    dataModel.grocRound.track.Super, interfaces.Events>(

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
  "round.roundId"?: mongoose.Types.ObjectId;
  "round.roundName"?: string;

  "trackName"?: string;

  "contributions.installmentValue"?: { $gte?: number; $lte?: number; };
  "contributions.totalValue"?: { $gte?: number; $lte?: number; };

  "adminFeePercentage"?: { $gte?: number; $lte?: number; };

  "products.num"?: { $gte?: number; $lte?: number; };
  "products.value"?: { $gte?: number; $lte?: number; };

  $text?: { $search: string };
}

/******************************************************************************/

function makeConditions ( filtrationCriteria: storage.grocRound.track.FiltrationCriteria ): Promise<QueryConditions> {

  return new Promise<QueryConditions>( ( resolve, reject ) => {

    let conditions: QueryConditions = {};

    if ( filtrationCriteria.round ) {

      if ( filtrationCriteria.round.roundId ) {
        conditions[ "round.roundId" ] = mongoose.Types.ObjectId( filtrationCriteria.round.roundId );
      }

      if ( filtrationCriteria.round.roundName ) {
        conditions[ "round.roundName" ] = filtrationCriteria.round.roundName;
      }

    }

    if ( filtrationCriteria.trackName ) {
      conditions[ "trackName" ] = filtrationCriteria.trackName;
    }

    if ( filtrationCriteria.contributions ) {

      if ( filtrationCriteria.contributions.installmentValue ) {
        conditions[ "contributions.installmentValue" ] = {};
        if ( filtrationCriteria.contributions.installmentValue.min ) {
          conditions[ "contributions.installmentValue" ].$gte = filtrationCriteria.contributions.installmentValue.min;
        }
        if ( filtrationCriteria.contributions.installmentValue.max ) {
          conditions[ "contributions.installmentValue" ].$lte = filtrationCriteria.contributions.installmentValue.max;
        }
      }

      if ( filtrationCriteria.contributions.totalValue ) {
        conditions[ "contributions.totalValue" ] = {};
        if ( filtrationCriteria.contributions.totalValue.min ) {
          conditions[ "contributions.totalValue" ].$gte = filtrationCriteria.contributions.totalValue.min;
        }
        if ( filtrationCriteria.contributions.totalValue.max ) {
          conditions[ "contributions.totalValue" ].$lte = filtrationCriteria.contributions.totalValue.max;
        }
      }

    }

    if ( filtrationCriteria.adminFeePercentage ) {
      conditions[ "adminFeePercentage" ] = {};
      if ( filtrationCriteria.adminFeePercentage.min ) {
        conditions[ "adminFeePercentage" ].$gte = filtrationCriteria.adminFeePercentage.min;
      }
      if ( filtrationCriteria.adminFeePercentage.max ) {
        conditions[ "adminFeePercentage" ].$lte = filtrationCriteria.adminFeePercentage.max;
      }
    }

    if ( filtrationCriteria.products ) {

      if ( filtrationCriteria.products.num ) {
        conditions[ "products.num" ] = {};
        if ( filtrationCriteria.products.num.min ) {
          conditions[ "products.num" ].$gte = filtrationCriteria.products.num.min;
        }
        if ( filtrationCriteria.products.num.max ) {
          conditions[ "products.num" ].$lte = filtrationCriteria.products.num.max;
        }
      }

      if ( filtrationCriteria.products.value ) {
        conditions[ "products.value" ] = {};
        if ( filtrationCriteria.products.value.min ) {
          conditions[ "products.value" ].$gte = filtrationCriteria.products.value.min;
        }
        if ( filtrationCriteria.products.value.max ) {
          conditions[ "products.value" ].$lte = filtrationCriteria.products.value.max;
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

function makeSortCriteria ( sortCriteria: storage.grocRound.track.SortCriteria ): Promise<string> {

  return new Promise<string>( ( resolve, reject ) => {
    let sortString;

    sortString = sortCriteria.criteria;

    if ( sortCriteria.criteria == "installmentValue" ) sortString = "contributions.installmentValue";
    if ( sortCriteria.criteria == "contributionsValue" ) sortString = "contributions.totalValue";
    if ( sortCriteria.criteria == "numProducts" ) sortString = "products.num";
    if ( sortCriteria.criteria == "valueProducts" ) sortString = "products.value";

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
      round: {
        roundId: mongoose.Types.ObjectId( model.round.roundId ),
        roundName: model.round.roundName
      },
      trackName: model.trackName,
      contributions: {
        installmentValue: model.contributions.installmentValue,
        totalValue: model.contributions.totalValue
      },
      adminFeePercentage: model.adminFeePercentage,
      products: {
        num: model.products.num,
        value: model.products.value
      }
    };

    returnDetails.push( details );

  } );

  return returnDetails;

}

/******************************************************************************/

function generateUpdateDetails ( document: Model, details: storage.grocRound.track.UpdateDetails ): Promise<Model> {

  return new Promise<Model>( ( resolve, reject ) => {

    if ( details.round ) {

      if ( details.round.roundId ) {
        document.round.roundId = mongoose.Types.ObjectId( details.round.roundId );
      }

      if ( details.round.roundName ) {
        document.round.roundName = details.round.roundName;
      }

    }

    if ( details.trackName ) {
      document.trackName = details.trackName;
    }

    if ( details.contributions ) {

      if ( details.contributions.installmentValue ) {
        document.contributions.installmentValue = details.contributions.installmentValue;
      }

      if ( details.contributions.totalValue ) {
        document.contributions.totalValue = details.contributions.totalValue;
      }

    }

    if ( details.adminFeePercentage ) {
      document.adminFeePercentage = details.adminFeePercentage;
    }

    if ( details.products ) {

      if ( details.products.num ) {
        document.products.num = details.products.num;
      }

      if ( details.products.value ) {
        document.products.value = details.products.value;
      }

    }

    resolve( document );

  } );

}

/******************************************************************************/

function convertToAbstract ( models: Model[], forceThrow = false ): Promise<dataModel.grocRound.track.Super[]> {

  return this.checkThrow( forceThrow )
    .then( ( response: any ) => {

      return new Promise<dataModel.grocRound.track.Super[]>( ( resolve, reject ) => {

        let returnModels: dataModel.grocRound.track.Super[] = [];

        models.forEach( ( model ) => {

          let returnModel: dataModel.grocRound.track.Super = {
            id: ( <mongoose.Types.ObjectId>model._id ).toHexString(),
            round: {
              roundId: model.round.roundId.toHexString(),
              roundName: model.round.roundName
            },
            trackName: model.trackName,
            contributions: {
              installmentValue: model.contributions.installmentValue,
              totalValue: model.contributions.totalValue
            },
            adminFeePercentage: model.adminFeePercentage,
            products: {
              num: model.products.num,
              value: model.products.value
            },
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