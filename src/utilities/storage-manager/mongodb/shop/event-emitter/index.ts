/******************************************************************************/

import * as Promise from "bluebird";
import * as express from "express";

import * as interfaces from "../../../../../interfaces/index";
import * as events from "../../../../../interfaces/events/utilities/storage-manager/shop/index";
import * as shopInterfaces from "../../../../../interfaces/utilities/storage-manager/shop/index";
import * as eventManagerInterfaces from "../../../../../interfaces/setup-config/event-manager/index";

/******************************************************************************/

class StorageShopEmitter implements shopInterfaces.Emitter {

  /*****************************************************************/

  constructor ( readonly emitEvent : eventManagerInterfaces.Emit ) {}

  /*****************************************************************/

  readonly got = ( data : events.GotData ) => {

    let event : events.Got = {
      context : "StorageShop" ,
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
      context : "StorageShop" ,
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
      context : "StorageShop" ,
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
      context : "StorageShop" ,
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
      context : "StorageShop" ,
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
      context : "StorageShop" ,
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
      context : "StorageShop" ,
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
      context : "StorageShop" ,
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
      context : "StorageShop" ,
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
      context : "StorageShop" ,
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

export default ( emitEvent : eventManagerInterfaces.Emit ) : shopInterfaces.Emitter => {

  return new StorageShopEmitter( emitEvent );

}

/******************************************************************************/
