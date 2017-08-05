/******************************************************************************/

import * as Promise from "bluebird";

import * as interfaces from "../../../../../interfaces";
import * as events from "../../../../../interfaces/utilities/storage-manager/user/events";
import * as userInterfaces from "../../../../../interfaces/utilities/storage-manager/user";
import * as eventManagerInterfaces from "../../../../../interfaces/setup-config/event-manager";

/******************************************************************************/

class UserEmitter implements userInterfaces.Emitter {

  /*****************************************************************/

  constructor( private readonly emitEvent: eventManagerInterfaces.Emit ) { }

  /*****************************************************************/

  readonly got = ( data: events.GotData ) => {
    let event: events.Got = {
      context: "User",
      tags: [],
      identifier: "Got",
      data: {
        filtrationCriteria: data.filtrationCriteria,
        sortCriteria: data.sortCriteria,
        limit: data.limit,
        ids: data.ids
      }
    };
    this.emitEvent( event );
    return event;
  }

  /*****************************************************************/

  readonly getFailed = ( data: events.GetFailedData ) => {
    let event: events.GetFailed = {
      context: "User",
      tags: [],
      identifier: "GetFailed",
      data: {
        filtrationCriteria: data.filtrationCriteria,
        sortCriteria: data.sortCriteria,
        limit: data.limit,
        reason: data.reason
      }
    };
    this.emitEvent( event );
    return event;
  }

  /*****************************************************************/

  readonly gotById = ( data: events.GotByIdData ) => {
    let event: events.GotById = {
      context: "User",
      tags: [],
      identifier: "GotById",
      data: {
        id: data.id
      }
    };
    this.emitEvent( event );
    return event;
  }

  /*****************************************************************/

  readonly getByIdFailed = ( data: events.GetByIdFailedData ) => {
    let event: events.GetByIdFailed = {
      context: "User",
      tags: [],
      identifier: "GetByIdFailed",
      data: {
        id: data.id,
        reason: data.reason
      }
    };
    this.emitEvent( event );
    return event;
  }

  /*****************************************************************/

  readonly added = ( data: events.AddedData ) => {
    let event: events.Added = {
      context: "User",
      tags: [],
      identifier: "Added",
      data: {
        documents: data.documents
      }
    };
    this.emitEvent( event );
    return event;
  }

  /*****************************************************************/

  readonly addFailed = ( data: events.AddFailedData ) => {
    let event: events.AddFailed = {
      context: "User",
      tags: [],
      identifier: "AddFailed",
      data: {
        details: data.details,
        reason: data.reason
      }
    };
    this.emitEvent( event );
    return event;
  }

  /*****************************************************************/

  readonly updated = ( data: events.UpdatedData ) => {
    let event: events.Updated = {
      context: "User",
      tags: [],
      identifier: "Updated",
      data: {
        id: ( data.id ) ? data.id : null,
        conditions: ( data.conditions ) ? data.conditions : null,
        documents: data.documents
      }
    };
    this.emitEvent( event );
    return event;
  }

  /*****************************************************************/

  readonly updateFailed = ( data: events.UpdateFailedData ) => {
    let event: events.UpdateFailed = {
      context: "User",
      tags: [],
      identifier: "UpdateFailed",
      data: {
        id: ( data.id ) ? data.id : null,
        conditions: ( data.conditions ) ? data.conditions : null,
        updates: data.updates,
        reason: data.reason
      }
    };
    this.emitEvent( event );
    return event;
  }

  /*****************************************************************/

  readonly removed = ( data: events.RemovedData ) => {
    let event: events.Removed = {
      context: "User",
      tags: [],
      identifier: "Removed",
      data: {
        id: ( data.id ) ? data.id : null,
        conditions: ( data.conditions ) ? data.conditions : null,
      }
    };
    this.emitEvent( event );
    return event;
  }

  /*****************************************************************/

  readonly removeFailed = ( data: events.RemoveFailedData ) => {
    let event: events.RemoveFailed = {
      context: "User",
      tags: [],
      identifier: "RemoveFailed",
      data: {
        id: ( data.id ) ? data.id : null,
        conditions: ( data.conditions ) ? data.conditions : null,
        reason: data.reason
      }
    };
    this.emitEvent( event );
    return event;
  }

  /*****************************************************************/

}

/******************************************************************************/

export default ( emitEvent: eventManagerInterfaces.Emit ): userInterfaces.Emitter => {
  return new UserEmitter( emitEvent );
}

/******************************************************************************/
