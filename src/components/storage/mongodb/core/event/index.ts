/******************************************************************************/

import * as Promise from "bluebird";
import * as mongoose from "mongoose";

import ModelController from "../../generic-model-class";

import { Model, Model_Partial, EventMongooseModel } from "./model";

import * as interfaces from "../../../interfaces/core/event";

/******************************************************************************/

/*
FC extends any, SC extends interfaces.BaseSortCriteria,
AD extends any, UD extends any,
QC extends any, Document extends mongoose.Document,
DM extends dataModel.ModelRange, DMA extends dataModel.ModelArrayRange,
E extends events.BaseMethods>*/
let avfv: interfaces.FiltrationCriteria

let a = new ModelController<
interfaces.FiltrationCriteria, string,
string, string,
string, string,
string, string
any>(
  events,
  Model,
  mapDetails,
  checkThrow,
  makeConditions,
  makeSortCriteria,
  convertAddDetails,
  generateUpdateDetails,
  convertToAbstract
);

/*

let eventDetails: Model_Partial = {
  context: event.context,
  identifier: event.identifier,
  tags: event.tags,
  data: event.data
};

private readonly makeConditions = ( filtrationCriteria: storage.core.event.FiltrationCriteria ): Promise<QueryConditions> => {

  return new Promise<QueryConditions>(( resolve, reject ) => {

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
    private readonly makeSortCriteria = ( sortCriteria: storage.core.event.SortCriteria ): Promise<string> => {

  return new Promise<string>(( resolve, reject ) => {
    let sortString;
    sortString = sortCriteria.criteria;
    if ( sortCriteria.order === "Descending" ) {
      sortString = "-" + sortString;
    }
    resolve( sortString );
  } );

}
    private readonly generateUpdateDetails = ( document: Model, details: storage.core.event.UpdateDetails ): Promise<Model> => {

  return new Promise<Model>(( resolve, reject ) => {

    if ( details.context ) {
      document.context = details.context;
    }

    if ( details.identifier ) {
      document.identifier = details.identifier;
    }

    if ( details.tagsToAdd ) {
      details.tagsToAdd.forEach(( tag ) => {
        document.tags.push( tag );
      } );
    }

    if ( details.tagsToRemove ) {
      details.tagsToRemove.forEach(( tag ) => {
        let matches = document.tags.filter(( subject ) => {
          return ( subject == tag );
        } );
        if ( matches.length ) {
          matches.forEach(( match ) => {
            document.tags.splice( document.tags.indexOf( match ) );
          } );
        }
      } );
    }

    if ( details.data ) {
      document.data = details.data;
    }

    resolve( document );

  } );

}

    /*****************************************************************
  
    private readonly convertToAbstract = ( events: Model[], forceThrow = false ): Promise<dataModel.core.event.Super[]> => {

  return this.checkThrow( forceThrow )
    .then(( response: any ) => {

      return new Promise<dataModel.core.event.Super[]>(( resolve, reject ) => {

        let returnEvents: dataModel.core.event.Super[] = [];

        events.forEach(( event ) => {

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

/******************************************************************************

interface QueryConditions {
  "context"?: string;
  "identifier"?: string;
  "tags"?: { $all: string[] };
  $text?: { $search: string };
}

/******************************************************************************

export default ( params: {
  emitEvent: src.setupConfig.eventManager.Emit;
  mapDetails: sharedLogic.dataStructures.MapDetails;
  checkThrow: sharedLogic.moders.CheckThrow;
} ): storage.core.Event => {
  return new MongoEvent( {
    events: eventsFactory( params.emitEvent ),
    Model: EventMongooseModel,
    mapDetails: params.mapDetails,
    checkThrow: params.checkThrow
  } );
}

/******************************************************************************/