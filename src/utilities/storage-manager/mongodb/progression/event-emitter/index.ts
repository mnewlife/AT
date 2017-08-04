/******************************************************************************/

import * as Promise from "bluebird";
import * as express from "express";

import * as interfaces from "../../../../../interfaces/index";

/******************************************************************************/

class StorageProgressionEmitter implements interfaces.utilities.storageManager.progression.Emitter {

  /*****************************************************************/

  constructor ( readonly emitEvent : interfaces.setupConfig.eventManager.Emit ) {}

  /*****************************************************************/

  readonly got = ( params : any ) => {

    let event : interfaces.events.utilities.storageManager.progression.Got = {
      context : "StorageProgression" ,
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

    let event : interfaces.events.utilities.storageManager.progression.GetFailed = {
      context : "StorageProgression" ,
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

    let event : interfaces.events.utilities.storageManager.progression.GotById = {
      context : "StorageProgression" ,
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

    let event : interfaces.events.utilities.storageManager.progression.GetByIdFailed = {
      context : "StorageProgression" ,
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

    let event : interfaces.events.utilities.storageManager.progression.Added = {
      context : "StorageProgression" ,
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

    let event : interfaces.events.utilities.storageManager.progression.AddFailed = {
      context : "StorageProgression" ,
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

    let event : interfaces.events.utilities.storageManager.progression.Updated = {
      context : "StorageProgression" ,
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

    let event : interfaces.events.utilities.storageManager.progression.UpdateFailed = {
      context : "StorageProgression" ,
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

    let event : interfaces.events.utilities.storageManager.progression.Removed = {
      context : "StorageProgression" ,
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

    let event : interfaces.events.utilities.storageManager.progression.RemoveFailed = {
      context : "StorageProgression" ,
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

export default ( emitEvent : interfaces.setupConfig.eventManager.Emit ) : interfaces.utilities.storageManager.progression.Emitter => {

  return new StorageProgressionEmitter( emitEvent );

}

/******************************************************************************/
