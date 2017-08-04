/******************************************************************************/

import * as Promise from "bluebird";
import * as express from "express";

import * as interfaces from "../../../../../interfaces/index";

/******************************************************************************/

class StorageNotificationEmitter implements interfaces.utilities.storageManager.notification.Emitter {

  /*****************************************************************/

  constructor ( readonly emitEvent : interfaces.setupConfig.eventManager.Emit ) {}

  /*****************************************************************/

  readonly got = ( params : any ) => {

    let event : interfaces.events.utilities.storageManager.notification.Got = {
      context : "StorageNotification" ,
      tags : [] ,
      identifier : "Got" ,
      data : {
        filtrationCriteria : params.filtrationCriteria ,
        sortCriteria : params.sortCriteria ,
        limit : params.limit ,
        numDocuments : params.numDocuments
      }
    };

    this.emitEvent( event );

    return event;

  }

  /*****************************************************************/

  readonly getFailed = ( params : any ) => {

    let event : interfaces.events.utilities.storageManager.notification.GetFailed = {
      context : "StorageNotification" ,
      tags : [] ,
      identifier : "GetFailed" ,
      data : {
        filtrationCriteria : params.filtrationCriteria ,
        sortCriteria : params.sortCriteria ,
        limit : params.limit ,
        reason : params.reason
      }
    };

    this.emitEvent( event );

    return event;

  }

  /*****************************************************************/

  readonly gotById = ( params : any ) => {

    let event : interfaces.events.utilities.storageManager.notification.GotById = {
      context : "StorageNotification" ,
      tags : [] ,
      identifier : "GotById" ,
      data : {
        id : params.id
      }
    };

    this.emitEvent( event );

    return event;

  }

  /*****************************************************************/

  readonly getByIdFailed = ( params : any ) => {

    let event : interfaces.events.utilities.storageManager.notification.GetByIdFailed = {
      context : "StorageNotification" ,
      tags : [] ,
      identifier : "GetByIdFailed" ,
      data : {
        id : params.id ,
        reason : params.reason
      }
    };

    this.emitEvent( event );

    return event;

  }

  /*****************************************************************/

  readonly added = ( params : any ) => {

    let event : interfaces.events.utilities.storageManager.notification.Added = {
      context : "StorageNotification" ,
      tags : [] ,
      identifier : "Added" ,
      data : {
        document : params.document
      }
    };

    this.emitEvent( event );

    return event;

  }

  /*****************************************************************/

  readonly addFailed = ( params : any ) => {

    let event : interfaces.events.utilities.storageManager.notification.AddFailed = {
      context : "StorageNotification" ,
      tags : [] ,
      identifier : "AddFailed" ,
      data : {
        details : params.details ,
        reason : params.reason
      }
    };

    this.emitEvent( event );

    return event;

  }

  /*****************************************************************/

  readonly updated = ( params : any ) => {

    let event : interfaces.events.utilities.storageManager.notification.Updated = {
      context : "StorageNotification" ,
      tags : [] ,
      identifier : "Updated" ,
      data : {
        id : ( params.id ) ? params.id : "" ,
        conditions : ( params.conditions ) ? params.conditions : "" ,
        document : params.document
      }
    };

    this.emitEvent( event );

    return event;

  }

  /*****************************************************************/

  readonly updateFailed = ( params : any ) => {

    let event : interfaces.events.utilities.storageManager.notification.UpdateFailed = {
      context : "StorageNotification" ,
      tags : [] ,
      identifier : "UpdateFailed" ,
      data : {
        id : ( params.id ) ? params.id : "" ,
        conditions : ( params.conditions ) ? params.conditions : "" ,
        details : params.details ,
        reason : params.reason
      }
    };

    this.emitEvent( event );

    return event;

  }

  /*****************************************************************/

  readonly removed = ( params : any ) => {

    let event : interfaces.events.utilities.storageManager.notification.Removed = {
      context : "StorageNotification" ,
      tags : [] ,
      identifier : "Removed" ,
      data : {
        id : ( params.id ) ? params.id : "" ,
        conditions : ( params.conditions ) ? params.conditions : "" ,
      }
    };

    this.emitEvent( event );

    return event;

  }

  /*****************************************************************/

  readonly removeFailed = ( params : any ) => {

    let event : interfaces.events.utilities.storageManager.notification.RemoveFailed = {
      context : "StorageNotification" ,
      tags : [] ,
      identifier : "RemoveFailed" ,
      data : {
        id : ( params.id ) ? params.id : "" ,
        conditions : ( params.conditions ) ? params.conditions : "" ,
        reason : params.reason
      }
    };

    this.emitEvent( event );

    return event;

  }

  /*****************************************************************/

}

/******************************************************************************/

export default ( emitEvent : interfaces.setupConfig.eventManager.Emit ) : interfaces.utilities.storageManager.notification.Emitter => {

  return new StorageNotificationEmitter( emitEvent );

}

/******************************************************************************/
