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
import * as interfaces from "../../../interfaces/core/notification";

import { Model, MongooseModel } from "./model";

/*******************************************************************************/

export default (
  emitEvent: eventListener.Emit,
  mapDetails: dataStructures.MapDetails,
  checkThrow: moders.CheckThrow
): interfaces.Instance => {

  let events = new Events<interfaces.Context, interfaces.FiltrationCriteria,
    interfaces.SortCriteria, interfaces.AddDetails, interfaces.UpdateDetails,
    dataModel.core.notification.Super>( emitEvent, "Core|Notification" );

  return new ModelController<interfaces.FiltrationCriteria, storage.BaseSortCriteria,
    interfaces.AddDetails, interfaces.UpdateDetails, QueryConditions, Model,
    dataModel.core.notification.Super, interfaces.Events>(

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
  "user.userId"?: mongoose.Types.ObjectId;
  "user.emailAddress"?: string;
  "user.fullName"?: string;
  "type"?: string;
  "app"?: string;
  "label"?: string;
  "seen"?: boolean;
  "cleared"?: boolean;
  $text?: { $search: string };
}

/******************************************************************************/

function makeConditions ( filtrationCriteria: storage.core.notification.FiltrationCriteria ): Promise<QueryConditions> {

  return new Promise<QueryConditions>( ( resolve, reject ) => {

    let conditions: QueryConditions = {};

    if ( filtrationCriteria.user ) {

      if ( filtrationCriteria.user.userId ) {
        conditions[ "user.userId" ] = mongoose.Types.ObjectId( filtrationCriteria.user.userId );
      }

      if ( filtrationCriteria.user.emailAddress ) {
        conditions[ "user.emailAddress" ] = filtrationCriteria.user.emailAddress;
      }

      if ( filtrationCriteria.user.fullName ) {
        conditions[ "user.fullName" ] = filtrationCriteria.user.fullName;
      }

    }

    if ( filtrationCriteria.type ) {
      conditions[ "type" ] = filtrationCriteria.type;
    }

    if ( filtrationCriteria.app ) {
      conditions[ "app" ] = filtrationCriteria.app;
    }

    if ( filtrationCriteria.label ) {
      conditions[ "label" ] = filtrationCriteria.label;
    }

    if ( filtrationCriteria.seen ) {
      conditions[ "seen" ] = filtrationCriteria.seen;
    }

    if ( filtrationCriteria.cleared ) {
      conditions[ "cleared" ] = filtrationCriteria.cleared;
    }

    if ( filtrationCriteria.textSearch ) {
      conditions.$text = { $search: filtrationCriteria.textSearch };
    }

    resolve( conditions );

  } );

}

/******************************************************************************/

function makeSortCriteria ( sortCriteria: storage.core.notification.SortCriteria ): Promise<string> {

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

  events.forEach( ( n ) => {

    let result: Partial<Model> = {
      user: {
        userId: mongoose.Types.ObjectId( n.user.userId ),
        emailAddress: n.user.emailAddress
      },
      type: n.type,
      app: n.app,
      label: n.label,
      seen: n.seen,
      cleared: n.cleared
    };

    if ( n.user.fullName ) {
      result.user.fullName = n.user.fullName;
    }

    returnDetails.push();

  } );

  return returnDetails;

}

/******************************************************************************/

function generateUpdateDetails ( document: Model, details: storage.core.notification.UpdateDetails ): Promise<Model> {

  return new Promise<Model>( ( resolve, reject ) => {

    if ( details.user ) {

      if ( details.user.userId ) {
        document.user.userId = mongoose.Types.ObjectId( details.user.userId );
      }

      if ( details.user.emailAddress ) {
        document.user.emailAddress = details.user.emailAddress;
      }

      if ( details.user.fullName ) {
        document.user.fullName = details.user.fullName;
      }

    }

    if ( details.type ) {
      document.type = details.type;
    }

    if ( details.app ) {
      document.app = details.app;
    }

    if ( details.label ) {
      document.label = details.label;
    }

    if ( details.seen ) {
      document.seen = details.seen;
    }

    if ( details.cleared ) {
      document.cleared = details.cleared;
    }

    resolve( document );

  } );

}

/******************************************************************************/

function convertToAbstract ( events: Model[], forceThrow = false ): Promise<dataModel.core.notification.Super[]> {

  return this.checkThrow( forceThrow )
    .then( ( response: any ) => {

      return new Promise<dataModel.core.notification.Super[]>( ( resolve, reject ) => {

        let returnEvents: dataModel.core.notification.Super[] = [];

        events.forEach( ( n ) => {

          let returnEvent: dataModel.core.notification.Super = {
            id: ( <mongoose.Types.ObjectId>n._id ).toHexString(),
            user: {
              userId: n.user.userId.toHexString(),
              emailAddress: n.user.emailAddress
            },
            type: n.type,
            app: n.app,
            label: n.label,
            seen: n.seen,
            cleared: n.cleared,
            createdAt: n.createdAt,
            updatedAt: n.updatedAt
          };

          if ( n.user.fullName ) {
            returnEvent.user.fullName = n.user.fullName;
          }

          returnEvents.push( returnEvent );

        } );

        resolve( returnEvents );

      } );

    } );

}

/******************************************************************************/