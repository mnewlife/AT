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
import * as interfaces from "../../../interfaces/core/subscription";

import { Model, PartialModel, MongooseModel } from "./model";

/*******************************************************************************/

export default (
  emitEvent: eventListener.Emit,
  mapDetails: dataStructures.MapDetails,
  checkThrow: moders.CheckThrow
): interfaces.ClassInstance => {

  let events = new Events<interfaces.Context, interfaces.FiltrationCriteria,
    interfaces.SortCriteria, interfaces.AddDetails, interfaces.UpdateDetails,
    dataModel.core.subscription.Super>( emitEvent, "Core|Subscription" );

  return new ModelController<interfaces.FiltrationCriteria, storage.BaseSortCriteria,
    interfaces.AddDetails, interfaces.UpdateDetails, QueryConditions, Model,
    dataModel.core.subscription.Super, interfaces.Events>(

    events,
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
  "userId"?: mongoose.Types.ObjectId;
  "subscription"?: string;
  $text?: { $search: string };
}

/******************************************************************************/

function makeConditions ( filtrationCriteria: storage.core.subscription.FiltrationCriteria ): Promise<QueryConditions> {

  return new Promise<QueryConditions>(( resolve, reject ) => {

    let conditions: QueryConditions = {};

    if ( filtrationCriteria.userId ) {
      conditions[ "userId" ] = mongoose.Types.ObjectId( filtrationCriteria.userId );
    }

    if ( filtrationCriteria.subscription ) {
      conditions[ "subscription" ] = filtrationCriteria.subscription;
    }

    if ( filtrationCriteria.textSearch ) {
      conditions.$text = { $search: filtrationCriteria.textSearch };
    }

    resolve( conditions );

  } );

}

/******************************************************************************/

function makeSortCriteria ( sortCriteria: storage.core.subscription.SortCriteria ): Promise<string> {

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

function generateAddDetails ( details: interfaces.AddDetails[] ): PartialModel[] {

  let returnDetails: PartialModel[] = [];

  details.forEach(( detail ) => {

    returnDetails.push( {
      userId: mongoose.Types.ObjectId( detail.userId ),
      subscription: detail.subscription
    } as PartialModel );

  } );

  return returnDetails;

}

/******************************************************************************/

function generateUpdateDetails ( document: Model, details: storage.core.subscription.UpdateDetails ): Promise<Model> {

  return new Promise<Model>(( resolve, reject ) => {

    if ( details.userId ) {
      document.userId = mongoose.Types.ObjectId( details.userId );
    }

    if ( details.subscription ) {
      document.subscription = details.subscription;
    }

    resolve( document );

  } );

}

/******************************************************************************/

function convertToAbstract ( events: Model[], forceThrow = false ): Promise<dataModel.core.subscription.Super[]> {

  return this.checkThrow( forceThrow )
    .then(( response: any ) => {

      return new Promise<dataModel.core.subscription.Super[]>(( resolve, reject ) => {

        let returnEvents: dataModel.core.subscription.Super[] = [];

        events.forEach(( event ) => {

          let returnEvent: dataModel.core.subscription.Super = {
            id: ( <mongoose.Types.ObjectId>event._id ).toHexString(),
            userId: ( event._id as mongoose.Types.ObjectId ).toHexString(),
            subscription: event.subscription,
            createdAt: event.createdAt,
            updatedAt: event.updatedAt
          };

          returnEvents.push( returnEvent );

        } );

        resolve( returnEvents );

      } );

    } );

}

/******************************************************************************/