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
import * as interfaces from "../../../interfaces/groc-round/article";

import { Model, MongooseModel } from "./model";

/*******************************************************************************/

export default (
  emitEvent: eventListener.Emit,
  mapDetails: dataStructures.MapDetails,
  checkThrow: moders.CheckThrow
): interfaces.Instance => {

  let models = new Events<interfaces.Context, interfaces.FiltrationCriteria,
    interfaces.SortCriteria, interfaces.AddDetails, interfaces.UpdateDetails,
    dataModel.grocRound.article.Super>( emitEvent, "GrocRound|Article" );

  return new ModelController<interfaces.FiltrationCriteria, storage.BaseSortCriteria,
    interfaces.AddDetails, interfaces.UpdateDetails, QueryConditions, Model,
    dataModel.grocRound.article.Super, interfaces.Events>(

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
  "user.userId"?: mongoose.Types.ObjectId;
  "user.emailAddress"?: string;
  "user.fullName"?: string;
  "title"?: string;
  "images"?: { $all: string[] };
  "tags"?: { $all: string[] };
  "content"?: string;
  $text?: { $search: string };
}

/******************************************************************************/

function makeConditions ( filtrationCriteria: storage.grocRound.article.FiltrationCriteria ): Promise<QueryConditions> {

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

    if ( filtrationCriteria.title ) {
      conditions[ "title" ] = filtrationCriteria.title;
    }

    if ( filtrationCriteria.images ) {
      conditions[ "images" ] = { $all: filtrationCriteria.images };
    }

    if ( filtrationCriteria.tags ) {
      conditions[ "tags" ] = { $all: filtrationCriteria.tags };
    }

    if ( filtrationCriteria.content ) {
      conditions[ "content" ] = filtrationCriteria.content;
    }

    if ( filtrationCriteria.textSearch ) {
      conditions.$text = { $search: filtrationCriteria.textSearch };
    }

    resolve( conditions );

  } );

}

/******************************************************************************/

function makeSortCriteria ( sortCriteria: storage.grocRound.article.SortCriteria ): Promise<string> {

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
      user: {
        userId: mongoose.Types.ObjectId( model.user.userId ),
        emailAddress: model.user.emailAddress
      },
      title: model.title,
      images: model.images,
      tags: model.tags,
      content: model.content
    };

    if ( model.user.fullName ) {
      details.user.fullName = model.user.fullName;
    }

    returnDetails.push( details );

  } );

  return returnDetails;

}

/******************************************************************************/

function generateUpdateDetails ( document: Model, details: storage.grocRound.article.UpdateDetails ): Promise<Model> {

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

    if ( details.title ) {
      document.title = details.title;
    }

    if ( details.images ) {
      document.images = [];
      details.images.forEach( ( image ) => {
        document.images.push( image );
      } );
    }

    if ( details.tags ) {
      document.tags = [];
      details.tags.forEach( ( tag ) => {
        document.tags.push( tag );
      } );
    }

    resolve( document );

  } );

}

/******************************************************************************/

function convertToAbstract ( models: Model[], forceThrow = false ): Promise<dataModel.grocRound.article.Super[]> {

  return this.checkThrow( forceThrow )
    .then( ( response: any ) => {

      return new Promise<dataModel.grocRound.article.Super[]>( ( resolve, reject ) => {

        let returnModels: dataModel.grocRound.article.Super[] = [];

        models.forEach( ( model ) => {

          let returnModel: dataModel.grocRound.article.Super = {
            id: ( <mongoose.Types.ObjectId>model._id ).toHexString(),
            user: {
              userId: model.user.userId.toHexString(),
              emailAddress: model.user.emailAddress
            },
            title: model.title,
            images: model.images,
            tags: model.tags,
            content: model.content,
            createdAt: model.createdAt,
            updatedAt: model.updatedAt
          };

          if ( model.user.fullName ) {
            returnModel.user.fullName = model.user.fullName;
          }

          returnModels.push( returnModel );

        } );

        resolve( returnModels );

      } );

    } );

}

/******************************************************************************/