/******************************************************************************/

import * as Promise from "bluebird";
import * as express from "express";

import * as interfaces from "../../../../../interfaces/index";
import * as events from "../../../../../interfaces/events/utilities/storage-manager/user/index";
import * as userInterfaces from "../../../../../interfaces/utilities/storage-manager/user/index";
import * as eventManagerInterfaces from "../../../../../interfaces/setup-config/event-manager/index";

/******************************************************************************/

class StorageUserEmitter implements userInterfaces.Emitter {

  /*****************************************************************/

  constructor ( private readonly emitEvent : eventManagerInterfaces.Emit ) {}

  /*****************************************************************/

  readonly got = ( data : events.GotData ) => {

    let event : events.Got = {
      context : "StorageUser" ,
      tags : [] ,
      identifier : "Got" ,
      data : {
        filtrationCriteria : data.filtrationCriteria ,
        sortCriteria : data.sortCriteria ,
        limit : data.limit ,
        numDocuments : data.numDocuments
      }
    };

    this.emitEvent( event );

    return event;

  }

  /*****************************************************************/

  readonly getFailed = ( data : events.GetFailedData ) => {

    let event : events.GetFailed = {
      context : "StorageUser" ,
      tags : [] ,
      identifier : "GetFailed" ,
      data : {
        filtrationCriteria : data.filtrationCriteria ,
        sortCriteria : data.sortCriteria ,
        limit : data.limit ,
        reason : data.reason
      }
    };

    this.emitEvent( event );

    return event;

  }

  /*****************************************************************/

  readonly gotById = ( data : events.GotByIdData ) => {

    let event : events.GotById = {
      context : "StorageUser" ,
      tags : [] ,
      identifier : "GotById" ,
      data : {
        id : data.id
      }
    };

    this.emitEvent( event );

    return event;

  }

  /*****************************************************************/

  readonly getByIdFailed = ( data : events.GetByIdFailedData ) => {

    let event : events.GetByIdFailed = {
      context : "StorageUser" ,
      tags : [] ,
      identifier : "GetByIdFailed" ,
      data : {
        id : data.id ,
        reason : data.reason
      }
    };

    this.emitEvent( event );

    return event;

  }

  /*****************************************************************/

  readonly added = ( data : events.AddedData ) => {

    let event : events.Added = {
      context : "StorageUser" ,
      tags : [] ,
      identifier : "Added" ,
      data : {
        document : data.document
      }
    };

    this.emitEvent( event );

    return event;

  }

  /*****************************************************************/

  readonly addFailed = ( data : events.AddFailedData ) => {

    let event : events.AddFailed = {
      context : "StorageUser" ,
      tags : [] ,
      identifier : "AddFailed" ,
      data : {
        details : data.details ,
        reason : data.reason
      }
    };

    this.emitEvent( event );

    return event;

  }

  /*****************************************************************/

  readonly updated = ( data : events.UpdatedData ) => {

    let event : events.Updated = {
      context : "StorageUser" ,
      tags : [] ,
      identifier : "Updated" ,
      data : {
        id : ( data.id ) ? data.id : null ,
        conditions : ( data.conditions ) ? data.conditions : null ,
        document : data.document
      }
    };

    this.emitEvent( event );

    return event;

  }

  /*****************************************************************/

  readonly updateFailed = ( data : events.UpdateFailedData ) => {

    let event : events.UpdateFailed = {
      context : "StorageUser" ,
      tags : [] ,
      identifier : "UpdateFailed" ,
      data : {
        id : ( data.id ) ? data.id : null ,
        conditions : ( data.conditions ) ? data.conditions : null ,
        details : data.details ,
        reason : data.reason
      }
    };

    this.emitEvent( event );

    return event;

  }

  /*****************************************************************/

  readonly removed = ( data : events.RemovedData ) => {

    let event : events.Removed = {
      context : "StorageUser" ,
      tags : [] ,
      identifier : "Removed" ,
      data : {
        id : ( data.id ) ? data.id : null ,
        conditions : ( data.conditions ) ? data.conditions : null ,
      }
    };

    this.emitEvent( event );

    return event;

  }

  /*****************************************************************/

  readonly removeFailed = ( data : events.RemoveFailedData ) => {

    let event : events.RemoveFailed = {
      context : "StorageUser" ,
      tags : [] ,
      identifier : "RemoveFailed" ,
      data : {
        id : ( data.id ) ? data.id : null ,
        conditions : ( data.conditions ) ? data.conditions : null ,
        reason : data.reason
      }
    };

    this.emitEvent( event );

    return event;

  }

  /*****************************************************************/

}

/******************************************************************************/

export default ( emitEvent : eventManagerInterfaces.Emit ) : userInterfaces.Emitter => {

  return new StorageUserEmitter( emitEvent );

}

/******************************************************************************/
