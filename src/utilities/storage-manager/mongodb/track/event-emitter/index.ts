/******************************************************************************/

import * as Promise from "bluebird";
import * as express from "express";

import * as interfaces from "../../../../../interfaces/index";

/******************************************************************************/

class StorageTrackEmitter implements interfaces.utilities.storageManager.track.Emitter {

  /*****************************************************************/

  constructor ( readonly emitEvent : interfaces.setupConfig.eventManager.Emit ) {}

  /*****************************************************************/

  readonly got = ( params : any ) => {

    let event : interfaces.events.utilities.storageManager.track.Got = {
      context : "StorageTrack" ,
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

    let event : interfaces.events.utilities.storageManager.track.GetFailed = {
      context : "StorageTrack" ,
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

    let event : interfaces.events.utilities.storageManager.track.GotById = {
      context : "StorageTrack" ,
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

    let event : interfaces.events.utilities.storageManager.track.GetByIdFailed = {
      context : "StorageTrack" ,
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

    let event : interfaces.events.utilities.storageManager.track.Added = {
      context : "StorageTrack" ,
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

    let event : interfaces.events.utilities.storageManager.track.AddFailed = {
      context : "StorageTrack" ,
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

    let event : interfaces.events.utilities.storageManager.track.Updated = {
      context : "StorageTrack" ,
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

    let event : interfaces.events.utilities.storageManager.track.UpdateFailed = {
      context : "StorageTrack" ,
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

    let event : interfaces.events.utilities.storageManager.track.Removed = {
      context : "StorageTrack" ,
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

    let event : interfaces.events.utilities.storageManager.track.RemoveFailed = {
      context : "StorageTrack" ,
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

export default ( emitEvent : interfaces.setupConfig.eventManager.Emit ) : interfaces.utilities.storageManager.track.Emitter => {

  return new StorageTrackEmitter( emitEvent );

}

/******************************************************************************/
