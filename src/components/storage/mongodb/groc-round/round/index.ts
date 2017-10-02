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
import * as interfaces from "../../../interfaces/groc-round/round";

import { Model, MongooseModel } from "./model";

/*******************************************************************************/

export default (
  emitEvent: eventListener.Emit,
  mapDetails: dataStructures.MapDetails,
  checkThrow: moders.CheckThrow
): interfaces.Instance => {

  let models = new Events<interfaces.Context, interfaces.FiltrationCriteria,
    interfaces.SortCriteria, interfaces.AddDetails, interfaces.UpdateDetails,
    dataModel.grocRound.round.Super>( emitEvent, "GrocRound|Round" );

  return new ModelController<interfaces.FiltrationCriteria, storage.BaseSortCriteria,
    interfaces.AddDetails, interfaces.UpdateDetails, QueryConditions, Model,
    dataModel.grocRound.round.Super, interfaces.Events>(

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
  "roundName"?: string;
  "inProgress"?: boolean;

  "duration.start"?: { $gte?: Date; $lte?: Date; };
  "duration.end"?: { $gte?: Date; $lte?: Date; };
  "duration.months"?: { $gte?: number; $lte?: number; };

  "deliveries.fee"?: { $gte?: number; $lte?: number; };
  "deliveries.numPayments"?: { $gte?: number; $lte?: number; };
  "deliveries.valuePayments"?: { $gte?: number; $lte?: number; };

  "contributions.num"?: { $gte?: number; $lte?: number; };
  "contributions.value"?: { $gte?: number; $lte?: number; };

  "numTracks"?: { $gte?: number; $lte?: number; };
  "valueCartProducts"?: { $gte?: number; $lte?: number; };

  $text?: { $search: string };
}

/******************************************************************************/

function makeConditions ( filtrationCriteria: storage.grocRound.round.FiltrationCriteria ): Promise<QueryConditions> {

  return new Promise<QueryConditions>( ( resolve, reject ) => {

    let conditions: QueryConditions = {};

    if ( filtrationCriteria.roundName ) {
      conditions[ "roundName" ] = filtrationCriteria.roundName;
    }

    if ( filtrationCriteria.inProgress ) {
      conditions[ "inProgress" ] = filtrationCriteria.inProgress;
    }

    if ( filtrationCriteria.duration ) {

      if ( filtrationCriteria.duration.start ) {
        conditions[ "duration.start" ] = {};
        if ( filtrationCriteria.duration.start.min ) {
          conditions[ "duration.start" ].$gte = filtrationCriteria.duration.start.min;
        }
        if ( filtrationCriteria.duration.start.max ) {
          conditions[ "duration.start" ].$lte = filtrationCriteria.duration.start.max;
        }
      }

      if ( filtrationCriteria.duration.end ) {
        conditions[ "duration.end" ] = {};
        if ( filtrationCriteria.duration.end.min ) {
          conditions[ "duration.end" ].$gte = filtrationCriteria.duration.end.min;
        }
        if ( filtrationCriteria.duration.end.max ) {
          conditions[ "duration.end" ].$lte = filtrationCriteria.duration.end.max;
        }
      }

      if ( filtrationCriteria.duration.months ) {
        conditions[ "duration.months" ] = {};
        if ( filtrationCriteria.duration.months.min ) {
          conditions[ "duration.months" ].$gte = filtrationCriteria.duration.months.min;
        }
        if ( filtrationCriteria.duration.months.max ) {
          conditions[ "duration.months" ].$lte = filtrationCriteria.duration.months.max;
        }
      }

    }

    if ( filtrationCriteria.deliveries ) {

      if ( filtrationCriteria.deliveries.fee ) {
        conditions[ "deliveries.fee" ] = {};
        if ( filtrationCriteria.deliveries.fee.min ) {
          conditions[ "deliveries.fee" ].$gte = filtrationCriteria.deliveries.fee.min;
        }
        if ( filtrationCriteria.deliveries.fee.max ) {
          conditions[ "deliveries.fee" ].$lte = filtrationCriteria.deliveries.fee.max;
        }
      }

      if ( filtrationCriteria.deliveries.numPayments ) {
        conditions[ "deliveries.numPayments" ] = {};
        if ( filtrationCriteria.deliveries.numPayments.min ) {
          conditions[ "deliveries.numPayments" ].$gte = filtrationCriteria.deliveries.numPayments.min;
        }
        if ( filtrationCriteria.deliveries.numPayments.max ) {
          conditions[ "deliveries.numPayments" ].$lte = filtrationCriteria.deliveries.numPayments.max;
        }
      }

      if ( filtrationCriteria.deliveries.valuePayments ) {
        conditions[ "deliveries.valuePayments" ] = {};
        if ( filtrationCriteria.deliveries.valuePayments.min ) {
          conditions[ "deliveries.valuePayments" ].$gte = filtrationCriteria.deliveries.valuePayments.min;
        }
        if ( filtrationCriteria.deliveries.valuePayments.max ) {
          conditions[ "deliveries.valuePayments" ].$lte = filtrationCriteria.deliveries.valuePayments.max;
        }
      }

    }

    if ( filtrationCriteria.contributions ) {

      if ( filtrationCriteria.contributions.num ) {
        conditions[ "contributions.num" ] = {};
        if ( filtrationCriteria.contributions.num.min ) {
          conditions[ "contributions.num" ].$gte = filtrationCriteria.contributions.num.min;
        }
        if ( filtrationCriteria.contributions.num.max ) {
          conditions[ "contributions.num" ].$lte = filtrationCriteria.contributions.num.max;
        }
      }

      if ( filtrationCriteria.contributions.value ) {
        conditions[ "contributions.value" ] = {};
        if ( filtrationCriteria.contributions.value.min ) {
          conditions[ "contributions.value" ].$gte = filtrationCriteria.contributions.value.min;
        }
        if ( filtrationCriteria.contributions.value.max ) {
          conditions[ "contributions.value" ].$lte = filtrationCriteria.contributions.value.max;
        }
      }

    }

    if ( filtrationCriteria.numTracks ) {
      conditions[ "numTracks" ] = {};
      if ( filtrationCriteria.numTracks.min ) {
        conditions[ "numTracks" ].$gte = filtrationCriteria.numTracks.min;
      }
      if ( filtrationCriteria.numTracks.max ) {
        conditions[ "numTracks" ].$lte = filtrationCriteria.numTracks.max;
      }
    }

    if ( filtrationCriteria.valueCartProducts ) {
      conditions[ "valueCartProducts" ] = {};
      if ( filtrationCriteria.valueCartProducts.min ) {
        conditions[ "valueCartProducts" ].$gte = filtrationCriteria.valueCartProducts.min;
      }
      if ( filtrationCriteria.valueCartProducts.max ) {
        conditions[ "valueCartProducts" ].$lte = filtrationCriteria.valueCartProducts.max;
      }
    }

    if ( filtrationCriteria.textSearch ) {
      conditions.$text = { $search: filtrationCriteria.textSearch };
    }

    resolve( conditions );

  } );

}

/******************************************************************************/

function makeSortCriteria ( sortCriteria: storage.grocRound.round.SortCriteria ): Promise<string> {

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
      roundName: model.roundName,
      inProgress: model.inProgress,
      duration: {
        start: model.duration.start,
        end: model.duration.end,
        months: model.duration.months
      },
      deliveries: {
        fee: model.deliveries.fee,
        numPayments: model.deliveries.numPayments,
        valuePayments: model.deliveries.valuePayments
      },
      contributions: {
        num: model.contributions.num,
        value: model.contributions.value
      },
      numTracks: model.numTracks,
      valueCartProducts: model.valueCartProducts
    };

    returnDetails.push( details );

  } );

  return returnDetails;

}

/******************************************************************************/

function generateUpdateDetails ( document: Model, details: storage.grocRound.round.UpdateDetails ): Promise<Model> {

  return new Promise<Model>( ( resolve, reject ) => {

    if ( details.roundName ) {
      document.roundName = details.roundName;
    }

    if ( details.inProgress ) {
      document.inProgress = details.inProgress;
    }

    if ( details.duration ) {

      if ( details.duration.start ) {
        document.duration.start = details.duration.start;
      }

      if ( details.duration.end ) {
        document.duration.end = details.duration.end;
      }

      if ( details.duration.months ) {
        document.duration.months = details.duration.months;
      }

    }

    if ( details.deliveries ) {

      if ( details.deliveries.fee ) {
        document.deliveries.fee = details.deliveries.fee;
      }

      if ( details.deliveries.numPayments ) {
        document.deliveries.numPayments = details.deliveries.numPayments;
      }

      if ( details.deliveries.valuePayments ) {
        document.deliveries.valuePayments = details.deliveries.valuePayments;
      }

    }

    if ( details.contributions ) {

      if ( details.contributions.num ) {
        document.contributions.num = details.contributions.num;
      }

      if ( details.contributions.value ) {
        document.contributions.value = details.contributions.value;
      }

    }

    if ( details.numTracks ) {
      document.numTracks = details.numTracks;
    }

    if ( details.valueCartProducts ) {
      document.valueCartProducts = details.valueCartProducts;
    }

    resolve( document );

  } );

}

/******************************************************************************/

function convertToAbstract ( models: Model[], forceThrow = false ): Promise<dataModel.grocRound.round.Super[]> {

  return this.checkThrow( forceThrow )
    .then( ( response: any ) => {

      return new Promise<dataModel.grocRound.round.Super[]>( ( resolve, reject ) => {

        let returnModels: dataModel.grocRound.round.Super[] = [];

        models.forEach( ( model ) => {

          let returnModel: dataModel.grocRound.round.Super = {
            id: ( <mongoose.Types.ObjectId>model._id ).toHexString(),
            roundName: model.roundName,
            inProgress: model.inProgress,
            duration: {
              start: model.duration.start,
              end: model.duration.end,
              months: model.duration.months
            },
            deliveries: {
              fee: model.deliveries.fee,
              numPayments: model.deliveries.numPayments,
              valuePayments: model.deliveries.valuePayments
            },
            contributions: {
              num: model.contributions.num,
              value: model.contributions.value
            },
            numTracks: model.numTracks,
            valueCartProducts: model.valueCartProducts,
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