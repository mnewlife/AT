/******************************************************************************/

import * as Promise from "bluebird";

import * as src from "../../../../../../src";
import * as amountss from "../../../../../../src/components/storage/routers/amounts/events";
import * as amountsInterfaces from "../../../../../../src/components/storage/routers/amounts";
import * as amountsManagerInterfaces from "../../../../../../src/setup-config/event-manager";

/******************************************************************************/

class AmountsEvents implements amountsInterfaces.Events {

  /*****************************************************************/

  constructor( private readonly emitAmounts: amountsManagerInterfaces.Emit ) { }

  /*****************************************************************/

  readonly got = ( data: amountss.GotData ) => {
    let amounts: amountss.Got = {
      context: "Routers|Amounts",
      tags: [],
      identifier: "Got",
      data: {
        filtrationCriteria: data.filtrationCriteria,
        sortCriteria: data.sortCriteria,
        limit: data.limit,
        ids: data.ids
      }
    };
    this.emitAmounts( amounts );
    return amounts;
  }

  /*****************************************************************/

  readonly getFailed = ( data: amountss.GetFailedData ) => {
    let amounts: amountss.GetFailed = {
      context: "Routers|Amounts",
      tags: [],
      identifier: "GetFailed",
      data: {
        filtrationCriteria: data.filtrationCriteria,
        sortCriteria: data.sortCriteria,
        limit: data.limit,
        reason: data.reason
      }
    };
    this.emitAmounts( amounts );
    return amounts;
  }

  /*****************************************************************/

  readonly gotById = ( data: amountss.GotByIdData ) => {
    let amounts: amountss.GotById = {
      context: "Routers|Amounts",
      tags: [],
      identifier: "GotById",
      data: {
        id: data.id
      }
    };
    this.emitAmounts( amounts );
    return amounts;
  }

  /*****************************************************************/

  readonly getByIdFailed = ( data: amountss.GetByIdFailedData ) => {
    let amounts: amountss.GetByIdFailed = {
      context: "Routers|Amounts",
      tags: [],
      identifier: "GetByIdFailed",
      data: {
        id: data.id,
        reason: data.reason
      }
    };
    this.emitAmounts( amounts );
    return amounts;
  }

  /*****************************************************************/

  readonly added = ( data: amountss.AddedData ) => {
    let amounts: amountss.Added = {
      context: "Routers|Amounts",
      tags: [],
      identifier: "Added",
      data: {
        documents: data.documents
      }
    };
    this.emitAmounts( amounts );
    return amounts;
  }

  /*****************************************************************/

  readonly addFailed = ( data: amountss.AddFailedData ) => {
    let amounts: amountss.AddFailed = {
      context: "Routers|Amounts",
      tags: [],
      identifier: "AddFailed",
      data: {
        details: data.details,
        reason: data.reason
      }
    };
    this.emitAmounts( amounts );
    return amounts;
  }

  /*****************************************************************/

  readonly updated = ( data: amountss.UpdatedData ) => {
    let amounts: amountss.Updated = {
      context: "Routers|Amounts",
      tags: [],
      identifier: "Updated",
      data: {
        id: ( data.id ) ? data.id : null,
        conditions: ( data.conditions ) ? data.conditions : null,
        documents: data.documents
      }
    };
    this.emitAmounts( amounts );
    return amounts;
  }

  /*****************************************************************/

  readonly updateFailed = ( data: amountss.UpdateFailedData ) => {
    let amounts: amountss.UpdateFailed = {
      context: "Routers|Amounts",
      tags: [],
      identifier: "UpdateFailed",
      data: {
        id: ( data.id ) ? data.id : null,
        conditions: ( data.conditions ) ? data.conditions : null,
        updates: data.updates,
        reason: data.reason
      }
    };
    this.emitAmounts( amounts );
    return amounts;
  }

  /*****************************************************************/

  readonly removed = ( data: amountss.RemovedData ) => {
    let amounts: amountss.Removed = {
      context: "Routers|Amounts",
      tags: [],
      identifier: "Removed",
      data: {
        id: ( data.id ) ? data.id : null,
        conditions: ( data.conditions ) ? data.conditions : null,
      }
    };
    this.emitAmounts( amounts );
    return amounts;
  }

  /*****************************************************************/

  readonly removeFailed = ( data: amountss.RemoveFailedData ) => {
    let amounts: amountss.RemoveFailed = {
      context: "Routers|Amounts",
      tags: [],
      identifier: "RemoveFailed",
      data: {
        id: ( data.id ) ? data.id : null,
        conditions: ( data.conditions ) ? data.conditions : null,
        reason: data.reason
      }
    };
    this.emitAmounts( amounts );
    return amounts;
  }

  /*****************************************************************/

}

/******************************************************************************/

export default ( emitAmounts: amountsManagerInterfaces.Emit ): amountsInterfaces.Events => {
  return new AmountsEvents( emitAmounts );
}

/******************************************************************************/
