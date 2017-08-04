/******************************************************************************/

import * as Promise from "bluebird";
import * as express from "express";

import * as interfaces from "../../../../../interfaces/index";
import * as events from "../../../../../interfaces/events/utilities/shared-logic/data-structures/index";
import * as sharedLogicInterfaces from "../../../../../interfaces/utilities/shared-logic/index";
import * as eventManagerInterfaces from "../../../../../interfaces/setup-config/event-manager/index";


/******************************************************************************/

class DataStructuresEmitter implements sharedLogicInterfaces.dataStructures.Emitter {

  /*****************************************************************/

  readonly findInArrayInvalidCriteria = ( data : events.FindInArrayInvalidCriteriaData ) => {

    let event : events.FindInArrayInvalidCriteria = {
      context : "DataStructures" ,
      tags : [] ,
      identifier : "FindInArrayInvalidCriteria" ,
      data : {
        arr : data.arr ,
        id : data.id ,
        criteria : data.criteria
      }
    };

    this.emitEvent( event );

    return event;

  }

  /*****************************************************************/

  readonly findInArrayFailed = ( data : events.FindInArrayFailedData ) => {

    let event : events.FindInArrayFailed = {
      context : "DataStructures" ,
      tags : [] ,
      identifier : "FindInArrayFailed" ,
      data : {
        arr : data.arr ,
        id : data.id ,
        criteria : data.criteria ,
        reason : data.reason
      }
    };

    this.emitEvent( event );

    return event;

  }

  /*****************************************************************/

  readonly removeFromArrayFailed = ( data : events.RemoveFromArrayFailedData ) => {

    let event : events.RemoveFromArrayFailed = {
      context : "DataStructures" ,
      tags : [] ,
      identifier : "RemoveFromArrayFailed" ,
      data : {
        arr : data.arr ,
        identifier : data.identifier ,
        reason : data.reason
      }
    };

    this.emitEvent( event );

    return event;

  }

  /*****************************************************************/

  readonly pushToArrayFailed = ( data : events.PushToArrayFailedData ) => {

    let event : events.PushToArrayFailed = {
      context : "DataStructures" ,
      tags : [] ,
      identifier : "PushToArrayFailed" ,
      data : {
        items : data.items ,
        destination : data.destination ,
        reason : data.reason
      }
    };

    this.emitEvent( event );

    return event;

  }

  /*****************************************************************/

  readonly mapDetailsFailed = ( data : events.MapDetailsFailedData ) => {

    let event : events.MapDetailsFailed = {
      context : "DataStructures" ,
      tags : [] ,
      identifier : "MapDetailsFailed" ,
      data : {
        details : data.details ,
        destination : data.destination ,
        reason : data.reason
      }
    };

    this.emitEvent( event );

    return event;

  }

  /*****************************************************************/

  readonly sortObjectArrayFailed = ( data : events.SortObjectArrayFailedData ) => {

    let event : events.SortObjectArrayFailed = {
      context : "DataStructures" ,
      tags : [] ,
      identifier : "SortObjectArrayFailed" ,
      data : {
        array : data.array ,
        criteria : data.criteria ,
        order : data.order ,
        reason : data.reason
      }
    };

    this.emitEvent( event );

    return event;

  }

  /*****************************************************************/

  constructor ( readonly emitEvent : eventManagerInterfaces.Emit ) {}

  /*****************************************************************/

}

/******************************************************************************/

export default ( emitEvent : eventManagerInterfaces.Emit ) : sharedLogicInterfaces.dataStructures.Emitter => {
  return new DataStructuresEmitter( emitEvent );
}

/******************************************************************************/
