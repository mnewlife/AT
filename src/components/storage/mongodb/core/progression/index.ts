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
import * as interfaces from "../../../interfaces/core/progression";

import { Model, MongooseModel } from "./model";

/*******************************************************************************/

export default (
  emitEvent: eventListener.Emit,
  mapDetails: dataStructures.MapDetails,
  checkThrow: moders.CheckThrow
): interfaces.Instance => {

  let events = new Events<interfaces.Context, interfaces.FiltrationCriteria,
    interfaces.SortCriteria, interfaces.AddDetails, interfaces.UpdateDetails,
    dataModel.core.progression.Super>( emitEvent, "Core|Progression" );

  return new ModelController<interfaces.FiltrationCriteria, storage.BaseSortCriteria,
    interfaces.AddDetails, interfaces.UpdateDetails, QueryConditions, Model,
    dataModel.core.progression.Super, interfaces.Events>(

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
  "type"?: string;
  "typeId"?: mongoose.Types.ObjectId;
  "subject"?: string;
  "timeMeasure"?: string;
  "amount"?: { $gte?: number; $lte?: number };
  $text?: { $search: string };
}

/******************************************************************************/

function makeConditions ( filtrationCriteria: storage.core.progression.FiltrationCriteria ): Promise<QueryConditions> {

  return new Promise<QueryConditions>( ( resolve, reject ) => {

    let conditions: QueryConditions = {};

    if ( filtrationCriteria.type ) {
      conditions[ "type" ] = filtrationCriteria.type;
    }

    if ( filtrationCriteria.typeId ) {
      conditions[ "typeId" ] = mongoose.Types.ObjectId( filtrationCriteria.typeId );
    }

    if ( filtrationCriteria.subject ) {
      conditions[ "subject" ] = filtrationCriteria.subject;
    }

    if ( filtrationCriteria.timeMeasure ) {
      conditions[ "timeMeasure" ] = filtrationCriteria.timeMeasure;
    }

    if ( filtrationCriteria.amount ) {

      conditions[ "amount" ] = {};

      if ( filtrationCriteria.amount.min ) {
        conditions[ "amount" ].$gte = filtrationCriteria.amount.min;
      }

      if ( filtrationCriteria.amount.max ) {
        conditions[ "amount" ].$lte = filtrationCriteria.amount.max;
      }

    }

    if ( filtrationCriteria.textSearch ) {
      conditions.$text = { $search: filtrationCriteria.textSearch };
    }

    resolve( conditions );

  } );

}

/******************************************************************************/

function makeSortCriteria ( sortCriteria: storage.core.progression.SortCriteria ): Promise<string> {

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

    let result: Partial<Model> = {
      type: event.type,
      typeId: mongoose.Types.ObjectId( event.typeId ),
      subject: event.subject,
      timeMeasure: event.timeMeasure,
      amount: event.amount
    };
    
    returnDetails.push( result );

  } );

  return returnDetails;

}

/******************************************************************************/

function generateUpdateDetails ( document: Model, details: storage.core.progression.UpdateDetails ): Promise<Model> {

  return new Promise<Model>( ( resolve, reject ) => {

    if ( details.type ) {
      document.type = details.type;
    }

    if ( details.typeId ) {
      document.typeId = mongoose.Types.ObjectId( details.typeId );
    }

    if ( details.subject ) {
      document.subject = details.subject;
    }

    if ( details.timeMeasure ) {
      document.timeMeasure = details.timeMeasure;
    }

    if ( details.amount ) {
      document.amount = details.amount;
    }

    resolve( document );

  } );

}

/******************************************************************************/

function convertToAbstract ( events: Model[], forceThrow = false ): Promise<dataModel.core.progression.Super[]> {

  return this.checkThrow( forceThrow )
    .then( ( response: any ) => {

      return new Promise<dataModel.core.progression.Super[]>( ( resolve, reject ) => {

        let returnEvents: dataModel.core.progression.Super[] = [];

        events.forEach( ( event ) => {

          let returnEvent: dataModel.core.progression.Super = {
            id: ( <mongoose.Types.ObjectId>event._id ).toHexString(),
            type: event.type,
            typeId: event.typeId.toHexString(),
            subject: event.subject,
            timeMeasure: event.timeMeasure,
            amount: event.amount,
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