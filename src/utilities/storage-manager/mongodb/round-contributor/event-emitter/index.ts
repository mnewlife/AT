/******************************************************************************/

import * as Promise from "bluebird";
import * as express from "express";

import * as interfaces from "../../../../../interfaces/index";

/******************************************************************************/

class StorageRoundContributorEmitter implements interfaces.utilities.storageManager.roundContributor.Emitter {

  /*****************************************************************/

  constructor ( readonly emitEvent : interfaces.setupConfig.eventManager.Emit ) {}

  /*****************************************************************/

  readonly got = ( params : any ) => {

    let event : interfaces.events.utilities.storageManager.roundContributor.Got = {
      context : "StorageRoundContributor" ,
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

    let event : interfaces.events.utilities.storageManager.roundContributor.GetFailed = {
      context : "StorageRoundContributor" ,
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

    let event : interfaces.events.utilities.storageManager.roundContributor.GotById = {
      context : "StorageRoundContributor" ,
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

    let event : interfaces.events.utilities.storageManager.roundContributor.GetByIdFailed = {
      context : "StorageRoundContributor" ,
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

    let event : interfaces.events.utilities.storageManager.roundContributor.Added = {
      context : "StorageRoundContributor" ,
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

    let event : interfaces.events.utilities.storageManager.roundContributor.AddFailed = {
      context : "StorageRoundContributor" ,
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

    let event : interfaces.events.utilities.storageManager.roundContributor.Updated = {
      context : "StorageRoundContributor" ,
      tags : [] ,
      identifier : "Updated" ,
      data : {
        id : params.id ,
        document : params.document
      }
    };

    this.emitEvent( event );

    return event;

  }

  /*****************************************************************/

  readonly updateFailed = ( params : any ) => {

    let event : interfaces.events.utilities.storageManager.roundContributor.UpdateFailed = {
      context : "StorageRoundContributor" ,
      tags : [] ,
      identifier : "UpdateFailed" ,
      data : {
        id : params.id ,
        details : params.details ,
        reason : params.reason
      }
    };

    this.emitEvent( event );

    return event;

  }

  /*****************************************************************/

  readonly removed = ( params : any ) => {

    let event : interfaces.events.utilities.storageManager.roundContributor.Removed = {
      context : "StorageRoundContributor" ,
      tags : [] ,
      identifier : "Removed" ,
      data : {
        id : params.id
      }
    };

    this.emitEvent( event );

    return event;

  }

  /*****************************************************************/

  readonly removeFailed = ( params : any ) => {

    let event : interfaces.events.utilities.storageManager.roundContributor.RemoveFailed = {
      context : "StorageRoundContributor" ,
      tags : [] ,
      identifier : "RemoveFailed" ,
      data : {
        id : params.id ,
        reason : params.reason
      }
    };

    this.emitEvent( event );

    return event;

  }

  /*****************************************************************/

}

/******************************************************************************/

export default ( emitEvent : interfaces.setupConfig.eventManager.Emit ) : interfaces.utilities.storageManager.roundContributor.Emitter => {

  return new StorageRoundContributorEmitter( emitEvent );

}

/******************************************************************************/
