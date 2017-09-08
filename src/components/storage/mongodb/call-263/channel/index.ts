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
import * as interfaces from "../../../interfaces/call-263/channel";

import { Model, PartialModel, MongooseModel } from "./model";

/*******************************************************************************/

export default (
  emitEvent: eventListener.Emit,
  mapDetails: dataStructures.MapDetails,
  checkThrow: moders.CheckThrow
): interfaces.Instance => {

  let models = new Events<interfaces.Context, interfaces.FiltrationCriteria,
    interfaces.SortCriteria, interfaces.AddDetails, interfaces.UpdateDetails,
    dataModel.call263.channel.Super>( emitEvent, "Call263|Channel" );

  return new ModelController<interfaces.FiltrationCriteria, storage.BaseSortCriteria,
    interfaces.AddDetails, interfaces.UpdateDetails, QueryConditions, Model,
    dataModel.call263.channel.Super, interfaces.Events>(

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
  "allocated"?: boolean;
  "allocatedTo"?: mongoose.Types.ObjectId;
  "code"?: string;
  "phoneNumber"?: string;
  "password"?: string;
  $text?: { $search: string };
}

/******************************************************************************/

function makeConditions ( filtrationCriteria: storage.call263.channel.FiltrationCriteria ): Promise<QueryConditions> {

  return new Promise<QueryConditions>(( resolve, reject ) => {

    let conditions: QueryConditions = {};

    if ( filtrationCriteria.allocated ) {
      conditions[ "allocated" ] = filtrationCriteria.allocated;
    }
    
    if ( filtrationCriteria.allocatedTo ) {
      conditions[ "allocatedTo" ] = mongoose.Types.ObjectId( filtrationCriteria.allocatedTo );
    }
    
    if ( filtrationCriteria.code ) {
      conditions[ "code" ] = filtrationCriteria.code;
    }
    
    if ( filtrationCriteria.phoneNumber ) {
      conditions[ "phoneNumber" ] = filtrationCriteria.phoneNumber;
    }
    
    if ( filtrationCriteria.password ) {
      conditions[ "password" ] = filtrationCriteria.password;
    }

    if ( filtrationCriteria.textSearch ) {
      conditions.$text = { $search: filtrationCriteria.textSearch };
    }

    resolve( conditions );

  } );

}

/******************************************************************************/

function makeSortCriteria ( sortCriteria: storage.call263.channel.SortCriteria ): Promise<string> {

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

function generateAddDetails ( models: interfaces.AddDetails[] ): PartialModel[] {

  let returnDetails: PartialModel[] = [];

  models.forEach(( model ) => {

    let details: PartialModel = {
      allocated: model.allocated,
      allocatedTo: mongoose.Types.ObjectId( model.allocatedTo ),
      code: model.code,
      phoneNumber: model.phoneNumber,
      password: model.password
    };
    
    returnDetails.push( details );

  } );

  return returnDetails;

}

/******************************************************************************/

function generateUpdateDetails ( document: Model, details: storage.call263.channel.UpdateDetails ): Promise<Model> {

  return new Promise<Model>(( resolve, reject ) => {

    if ( details.allocated ) {
      document.allocated = details.allocated;
    }
    
    if ( details.allocatedTo ) {
      document.allocatedTo = mongoose.Types.ObjectId( details.allocatedTo );
    }
    
    if ( details.code ) {
      document.code = details.code;
    }
    
    if ( details.phoneNumber ) {
      document.phoneNumber = details.phoneNumber;
    }
    
    if ( details.password ) {
      document.password = details.password;
    }

    resolve( document );

  } );

}

/******************************************************************************/

function convertToAbstract ( models: Model[], forceThrow = false ): Promise<dataModel.call263.channel.Super[]> {

  return this.checkThrow( forceThrow )
    .then(( response: any ) => {

      return new Promise<dataModel.call263.channel.Super[]>(( resolve, reject ) => {

        let returnModels: dataModel.call263.channel.Super[] = [];

        models.forEach(( model ) => {

          let returnModel: dataModel.call263.channel.Super = {
            id: ( <mongoose.Types.ObjectId>model._id ).toHexString(),
            allocated: model.allocated,
            allocatedTo: ( model.allocatedTo as mongoose.Types.ObjectId ).toHexString(),
            code: model.code,
            phoneNumber: model.phoneNumber,
            password: model.password,
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
