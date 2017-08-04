/******************************************************************************/

import * as Promise from "bluebird";
import * as express from "express";

import * as interfaces from "../../../../../interfaces/index";

/******************************************************************************/

class StorageTrackProductEmitter implements interfaces.utilities.storageManager.trackProduct.Emitter {

  /*****************************************************************/

  constructor ( readonly emitEvent : interfaces.setupConfig.eventManager.Emit ) {}

  /*****************************************************************/

  readonly got = ( params : any ) => {

    let event : interfaces.events.utilities.storageManager.trackProduct.Got = {
      context : "StorageTrackProduct" ,
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

    let event : interfaces.events.utilities.storageManager.trackProduct.GetFailed = {
      context : "StorageTrackProduct" ,
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

    let event : interfaces.events.utilities.storageManager.trackProduct.GotById = {
      context : "StorageTrackProduct" ,
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

    let event : interfaces.events.utilities.storageManager.trackProduct.GetByIdFailed = {
      context : "StorageTrackProduct" ,
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

    let event : interfaces.events.utilities.storageManager.trackProduct.Added = {
      context : "StorageTrackProduct" ,
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

    let event : interfaces.events.utilities.storageManager.trackProduct.AddFailed = {
      context : "StorageTrackProduct" ,
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

    let event : interfaces.events.utilities.storageManager.trackProduct.Updated = {
      context : "StorageTrackProduct" ,
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

    let event : interfaces.events.utilities.storageManager.trackProduct.UpdateFailed = {
      context : "StorageTrackProduct" ,
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

    let event : interfaces.events.utilities.storageManager.trackProduct.Removed = {
      context : "StorageTrackProduct" ,
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

    let event : interfaces.events.utilities.storageManager.trackProduct.RemoveFailed = {
      context : "StorageTrackProduct" ,
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

export default ( emitEvent : interfaces.setupConfig.eventManager.Emit ) : interfaces.utilities.storageManager.trackProduct.Emitter => {

  return new StorageTrackProductEmitter( emitEvent );

}

/******************************************************************************/
