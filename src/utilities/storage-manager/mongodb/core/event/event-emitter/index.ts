/******************************************************************************/

import * as Promise from "bluebird";

import * as interfaces from "../../../../../interfaces";
import * as events from "../../../../../interfaces/utilities/storage-manager/event/events";
import * as eventInterfaces from "../../../../../interfaces/utilities/storage-manager/event";
import * as eventManagerInterfaces from "../../../../../interfaces/setup-config/event-manager";

/******************************************************************************/

class EventEmitter implements eventInterfaces.Emitter {

  /*****************************************************************/

  constructor( private readonly emitEvent: eventManagerInterfaces.Emit ) { }

  /*****************************************************************/

  readonly got = ( data: events.GotData ) => {
    let event: events.Got = {
      context: "Event",
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
      context: "Event",
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
      context: "Event",
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
      context: "Event",
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
      context: "Event",
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
      context: "Event",
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
      context: "Event",
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
      context: "Event",
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
      context: "Event",
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
      context: "Event",
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

export default ( emitEvent: eventManagerInterfaces.Emit ): eventInterfaces.Emitter => {
  return new EventEmitter( emitEvent );
}

/******************************************************************************/
