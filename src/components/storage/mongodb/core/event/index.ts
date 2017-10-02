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
import * as interfaces from "../../../interfaces/core/event";

import { Model, MongooseModel } from "./model";

/*******************************************************************************/

export default (
  emitEvent: eventListener.Emit,
  mapDetails: dataStructures.MapDetails,
  checkThrow: moders.CheckThrow
): interfaces.Instance => {

  let events = new Events<interfaces.Context, interfaces.FiltrationCriteria,
    interfaces.SortCriteria, interfaces.AddDetails, interfaces.UpdateDetails,
    dataModel.core.event.Super>( emitEvent, "Core|Event" );

  return new ModelController<interfaces.FiltrationCriteria, storage.BaseSortCriteria,
    interfaces.AddDetails, interfaces.UpdateDetails, QueryConditions, Model,
    dataModel.core.event.Super, interfaces.Events>(

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
  "context"?: string;
  "identifier"?: string;
  "tags"?: { $all: string[] };
  $text?: { $search: string };
}

/******************************************************************************/

function makeConditions ( filtrationCriteria: storage.core.event.FiltrationCriteria ): Promise<QueryConditions> {

  return new Promise<QueryConditions>( ( resolve, reject ) => {

    let conditions: QueryConditions = {};

    if ( filtrationCriteria.context ) {
      conditions[ "context" ] = filtrationCriteria.context;
    }

    if ( filtrationCriteria.identifier ) {
      conditions[ "identifier" ] = filtrationCriteria.identifier;
    }

    if ( filtrationCriteria.tags ) {
      conditions[ "tags" ] = { $all: filtrationCriteria.tags };
    }

    if ( filtrationCriteria.textSearch ) {
      conditions.$text = { $search: filtrationCriteria.textSearch };
    }

    resolve( conditions );

  } );

}

/******************************************************************************/

function makeSortCriteria ( sortCriteria: storage.core.event.SortCriteria ): Promise<string> {

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

function generateAddDetails ( events: interfaces.AddDetails[] ): Partial<Model>[] {

  let returnDetails: Partial<Model>[] = [];

  events.forEach( ( event ) => {

    let details: Partial<Model> = {
      context: event.context,
      identifier: event.identifier,
      tags: event.tags,
      data: event.data
    };

    returnDetails.push();

  } );

  return returnDetails;

}

/******************************************************************************/

function generateUpdateDetails ( document: Model, details: storage.core.event.UpdateDetails ): Promise<Model> {

  return new Promise<Model>( ( resolve, reject ) => {

    if ( details.context ) {
      document.context = details.context;
    }

    if ( details.identifier ) {
      document.identifier = details.identifier;
    }

    if ( details.tags ) {
      document.tags = [];
      details.tags.forEach( ( tag ) => {
        document.tags.push( tag );
      } );
    }

    if ( details.data ) {
      document.data = details.data;
    }

    resolve( document );

  } );

}

/******************************************************************************/

function convertToAbstract ( events: Model[], forceThrow = false ): Promise<dataModel.core.event.Super[]> {

  return this.checkThrow( forceThrow )
    .then( ( response: any ) => {

      return new Promise<dataModel.core.event.Super[]>( ( resolve, reject ) => {

        let returnEvents: dataModel.core.event.Super[] = [];

        events.forEach( ( event ) => {

          let returnEvent: dataModel.core.event.Super = {
            id: ( <mongoose.Types.ObjectId>event._id ).toHexString(),
            context: event.context,
            identifier: event.identifier,
            tags: event.tags,
            data: event.data,
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