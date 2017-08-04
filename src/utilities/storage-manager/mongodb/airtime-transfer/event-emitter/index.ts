/******************************************************************************/

import * as Promise from "bluebird";
import * as express from "express";

import * as interfaces from "../../../../../interfaces/index";

/******************************************************************************/

class StorageAirtimeTransferEmitter implements interfaces.utilities.storageManager.airtimeTransfer.Emitter {

  /*****************************************************************/

  constructor ( readonly emitEvent : interfaces.setupConfig.eventManager.Emit ) {}

  /*****************************************************************/

  readonly got = ( params : any ) => {

    let event : interfaces.events.utilities.storageManager.airtimeTransfer.Got = {
      context : "StorageAirtimeTransfer" ,
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

    let event : interfaces.events.utilities.storageManager.airtimeTransfer.GetFailed = {
      context : "StorageAirtimeTransfer" ,
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

    let event : interfaces.events.utilities.storageManager.airtimeTransfer.GotById = {
      context : "StorageAirtimeTransfer" ,
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

    let event : interfaces.events.utilities.storageManager.airtimeTransfer.GetByIdFailed = {
      context : "StorageAirtimeTransfer" ,
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

    let event : interfaces.events.utilities.storageManager.airtimeTransfer.Added = {
      context : "StorageAirtimeTransfer" ,
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

    let event : interfaces.events.utilities.storageManager.airtimeTransfer.AddFailed = {
      context : "StorageAirtimeTransfer" ,
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

    let event : interfaces.events.utilities.storageManager.airtimeTransfer.Updated = {
      context : "StorageAirtimeTransfer" ,
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

    let event : interfaces.events.utilities.storageManager.airtimeTransfer.UpdateFailed = {
      context : "StorageAirtimeTransfer" ,
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

    let event : interfaces.events.utilities.storageManager.airtimeTransfer.Removed = {
      context : "StorageAirtimeTransfer" ,
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

    let event : interfaces.events.utilities.storageManager.airtimeTransfer.RemoveFailed = {
      context : "StorageAirtimeTransfer" ,
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

export default ( emitEvent : interfaces.setupConfig.eventManager.Emit ) : interfaces.utilities.storageManager.airtimeTransfer.Emitter => {

  return new StorageAirtimeTransferEmitter( emitEvent );

}

/******************************************************************************/
