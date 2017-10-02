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
import * as interfaces from "../../../interfaces/core/invitation";

import { Model, MongooseModel, Invitee } from "./model";

/*******************************************************************************/

export default (
  emitEvent: eventListener.Emit,
  mapDetails: dataStructures.MapDetails,
  checkThrow: moders.CheckThrow
): interfaces.Instance => {

  let events = new Events<interfaces.Context, interfaces.FiltrationCriteria,
    interfaces.SortCriteria, interfaces.AddDetails, interfaces.UpdateDetails,
    dataModel.core.invitation.Super>( emitEvent, "Core|Invitation" );

  return new ModelController<interfaces.FiltrationCriteria, storage.BaseSortCriteria,
    interfaces.AddDetails, interfaces.UpdateDetails, QueryConditions, Model,
    dataModel.core.invitation.Super, interfaces.Events>(

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
  "app"?: string;
  $text?: { $search: string };
}

/******************************************************************************/

function makeConditions ( filtrationCriteria: storage.core.invitation.FiltrationCriteria ): Promise<QueryConditions> {

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

    if ( filtrationCriteria.app ) {
      conditions[ "app" ] = filtrationCriteria.app;
    }

    if ( filtrationCriteria.textSearch ) {
      conditions.$text = { $search: filtrationCriteria.textSearch };
    }

    resolve( conditions );

  } );

}

/******************************************************************************/

function makeSortCriteria ( sortCriteria: storage.core.invitation.SortCriteria ): Promise<string> {

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

function generateAddDetails ( details: interfaces.AddDetails[] ): Partial<Model>[] {

  let returnDetails: Partial<Model>[] = [];

  details.forEach( ( detail ) => {

    let result: Partial<Model> = {
      user: {
        userId: mongoose.Types.ObjectId( detail.user.userId ),
        emailAddress: detail.user.emailAddress
      },
      app: detail.app,
      invitees: []
    };

    if ( detail.user.fullName ) {
      result.user.fullName = detail.user.fullName;
    }

    if ( detail.invitees.length ) {

      detail.invitees.forEach( ( i ) => {
        let temp: Invitee = {
          emailAddress: i.emailAddress,
          converted: i.converted
        }
        if ( i.userId ) temp.userId = mongoose.Types.ObjectId( i.userId );
        if ( i.fullName ) temp.fullName = i.fullName;
        result.invitees.push( temp );
      } );

    }

    returnDetails.push( result );

  } );

  return returnDetails;

}

/******************************************************************************/

function generateUpdateDetails ( document: Model, details: storage.core.invitation.UpdateDetails ): Promise<Model> {

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

    if ( details.app ) {
      document.app = details.app;
    }

    if ( details.invitees ) {

      document.invitees = [];
      details.invitees.forEach( ( i ) => {

        let temp: Invitee = {
          emailAddress: i.emailAddress,
          converted: i.converted
        }
        if ( i.userId ) temp.userId = mongoose.Types.ObjectId( i.userId );
        if ( i.fullName ) temp.fullName = i.fullName;
        document.invitees.push( temp );

      } );

    }

    resolve( document );

  } );

}

/******************************************************************************/

function convertToAbstract ( events: Model[], forceThrow = false ): Promise<dataModel.core.invitation.Super[]> {

  return this.checkThrow( forceThrow )
    .then( ( response: any ) => {

      return new Promise<dataModel.core.invitation.Super[]>( ( resolve, reject ) => {

        let returnEvents: dataModel.core.invitation.Super[] = [];

        events.forEach( ( inv ) => {

          let returnEvent: dataModel.core.invitation.Super = {
            id: ( <mongoose.Types.ObjectId>inv._id ).toHexString(),
            user: {
              userId: inv.user.userId.toHexString(),
              emailAddress: inv.user.emailAddress
            },
            app: inv.app,
            invitees: [],
            createdAt: inv.createdAt,
            updatedAt: inv.updatedAt
          };

          if ( inv.user.fullName ) {
            returnEvent.user.fullName = inv.user.fullName;
          }

          if ( inv.invitees.length ) {
            inv.invitees.forEach( ( i ) => {
              let temp: dataModel.core.invitation.Invitee = {
                emailAddress: i.emailAddress,
                converted: i.converted
              }
              if ( i.userId ) temp.userId = i.userId.toHexString();
              if ( i.fullName ) temp.fullName = i.fullName;
              returnEvent.invitees.push( temp );
            } );
          }

          returnEvents.push( returnEvent );

        } );

        resolve( returnEvents );

      } );

    } );

}

/******************************************************************************/