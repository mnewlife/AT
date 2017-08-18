/******************************************************************************/

import * as Promise from "bluebird";

import * as dataModel from "../../../data-model";
import * as eventListener from "../../../event-listener/interfaces";

import * as interfaces from "../interfaces";
import * as events from "../interfaces/events/generator";

/******************************************************************************/

export default class Events<C extends string, FC,
  SC extends interfaces.BaseSortCriteria, AD, UD,
  DMA extends dataModel.ModelArrayRange>
  implements events.GenerateMethods<C, FC, SC, AD, UD, DMA> {

  /*****************************************************************/

  constructor( private readonly emitEvent: eventListener.Emit, private readonly context: C ) { }

  /*****************************************************************/

  readonly got = ( data: events.GotData<FC, SC> ) => {
    let event: events.Got<C, FC, SC> = {
      context: this.context,
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

  readonly getFailed = ( data: events.GetFailedData<FC, SC> ) => {
    let event: events.GetFailed<C, FC, SC> = {
      context: this.context,
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
    let event: events.GotById<C> = {
      context: this.context,
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
    let event: events.GetByIdFailed<C> = {
      context: this.context,
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

  readonly added = ( data: events.AddedData<DMA> ) => {
    let event: events.Added<C, DMA> = {
      context: this.context,
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

  readonly addFailed = ( data: events.AddFailedData<AD> ) => {
    let event: events.AddFailed<C, AD> = {
      context: this.context,
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

  readonly updated = ( data: events.UpdatedData<DMA> ) => {
    let event: events.Updated<C, DMA> = {
      context: this.context,
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

  readonly updateFailed = ( data: events.UpdateFailedData<FC, UD> ) => {
    let event: events.UpdateFailed<C, FC, UD> = {
      context: this.context,
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

  readonly removed = ( data: events.RemovedData<FC> ) => {
    let event: events.Removed<C, FC> = {
      context: this.context,
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

  readonly removeFailed = ( data: events.RemoveFailedData<FC> ) => {
    let event: events.RemoveFailed<C, FC> = {
      context: this.context,
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
