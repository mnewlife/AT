/******************************************************************************/

import * as Promise from "bluebird";

import * as dataModel from "../../../data-model";
import * as eventListener from "../../../event-listener/interfaces";

import * as interfaces from "../interfaces";
import * as events from "../interfaces/events/generator";

/******************************************************************************/

export default class Events<Context extends string, FiltrationCriteria,
  SortCriteria extends interfaces.BaseSortCriteria, AddDetails, UpdateDetails, DataModel extends dataModel.DataModel>
  implements events.GenerateMethods<Context, FiltrationCriteria, SortCriteria, AddDetails, UpdateDetails, DataModel> {

  /*****************************************************************/

  constructor( private readonly emitEvent: eventListener.Emit, private readonly context: Context ) { }

  /*****************************************************************/

  readonly got = ( data: events.GotData<FiltrationCriteria, SortCriteria> ) => {
    let event: events.Got<Context, FiltrationCriteria, SortCriteria> = {
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

  readonly getFailed = ( data: events.GetFailedData<FiltrationCriteria, SortCriteria> ) => {
    let event: events.GetFailed<Context, FiltrationCriteria, SortCriteria> = {
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
    let event: events.GotById<Context> = {
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
    let event: events.GetByIdFailed<Context> = {
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

  readonly added = ( data: events.AddedData<DataModel> ) => {
    let event: events.Added<Context, DataModel> = {
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

  readonly addFailed = ( data: events.AddFailedData<AddDetails> ) => {
    let event: events.AddFailed<Context, AddDetails> = {
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

  readonly updated = ( data: events.UpdatedData<DataModel> ) => {
    let event: events.Updated<Context, DataModel> = {
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

  readonly updateFailed = ( data: events.UpdateFailedData<FiltrationCriteria, UpdateDetails> ) => {
    let event: events.UpdateFailed<Context, FiltrationCriteria, UpdateDetails> = {
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

  readonly removed = ( data: events.RemovedData<FiltrationCriteria> ) => {
    let event: events.Removed<Context, FiltrationCriteria> = {
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

  readonly removeFailed = ( data: events.RemoveFailedData<FiltrationCriteria> ) => {
    let event: events.RemoveFailed<Context, FiltrationCriteria> = {
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
