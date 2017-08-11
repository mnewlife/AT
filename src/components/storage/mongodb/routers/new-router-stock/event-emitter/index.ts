/******************************************************************************/

import * as Promise from "bluebird";

import * as interfaces from "../../../../../../interfaces";
import * as newRouterStocks from "../../../../../../interfaces/components/storage/routers/new-router-stock/events";
import * as newRouterStockInterfaces from "../../../../../../interfaces/components/storage/routers/new-router-stock";
import * as newRouterStockManagerInterfaces from "../../../../../../interfaces/setup-config/event-manager";

/******************************************************************************/

class NewRouterStockEmitter implements newRouterStockInterfaces.Emitter {

  /*****************************************************************/

  constructor( private readonly emitNewRouterStock: newRouterStockManagerInterfaces.Emit ) { }

  /*****************************************************************/

  readonly got = ( data: newRouterStocks.GotData ) => {
    let newRouterStock: newRouterStocks.Got = {
      context: "Routers|NewRouterStock",
      tags: [],
      identifier: "Got",
      data: {
        filtrationCriteria: data.filtrationCriteria,
        sortCriteria: data.sortCriteria,
        limit: data.limit,
        ids: data.ids
      }
    };
    this.emitNewRouterStock( newRouterStock );
    return newRouterStock;
  }

  /*****************************************************************/

  readonly getFailed = ( data: newRouterStocks.GetFailedData ) => {
    let newRouterStock: newRouterStocks.GetFailed = {
      context: "Routers|NewRouterStock",
      tags: [],
      identifier: "GetFailed",
      data: {
        filtrationCriteria: data.filtrationCriteria,
        sortCriteria: data.sortCriteria,
        limit: data.limit,
        reason: data.reason
      }
    };
    this.emitNewRouterStock( newRouterStock );
    return newRouterStock;
  }

  /*****************************************************************/

  readonly gotById = ( data: newRouterStocks.GotByIdData ) => {
    let newRouterStock: newRouterStocks.GotById = {
      context: "Routers|NewRouterStock",
      tags: [],
      identifier: "GotById",
      data: {
        id: data.id
      }
    };
    this.emitNewRouterStock( newRouterStock );
    return newRouterStock;
  }

  /*****************************************************************/

  readonly getByIdFailed = ( data: newRouterStocks.GetByIdFailedData ) => {
    let newRouterStock: newRouterStocks.GetByIdFailed = {
      context: "Routers|NewRouterStock",
      tags: [],
      identifier: "GetByIdFailed",
      data: {
        id: data.id,
        reason: data.reason
      }
    };
    this.emitNewRouterStock( newRouterStock );
    return newRouterStock;
  }

  /*****************************************************************/

  readonly added = ( data: newRouterStocks.AddedData ) => {
    let newRouterStock: newRouterStocks.Added = {
      context: "Routers|NewRouterStock",
      tags: [],
      identifier: "Added",
      data: {
        documents: data.documents
      }
    };
    this.emitNewRouterStock( newRouterStock );
    return newRouterStock;
  }

  /*****************************************************************/

  readonly addFailed = ( data: newRouterStocks.AddFailedData ) => {
    let newRouterStock: newRouterStocks.AddFailed = {
      context: "Routers|NewRouterStock",
      tags: [],
      identifier: "AddFailed",
      data: {
        details: data.details,
        reason: data.reason
      }
    };
    this.emitNewRouterStock( newRouterStock );
    return newRouterStock;
  }

  /*****************************************************************/

  readonly updated = ( data: newRouterStocks.UpdatedData ) => {
    let newRouterStock: newRouterStocks.Updated = {
      context: "Routers|NewRouterStock",
      tags: [],
      identifier: "Updated",
      data: {
        id: ( data.id ) ? data.id : null,
        conditions: ( data.conditions ) ? data.conditions : null,
        documents: data.documents
      }
    };
    this.emitNewRouterStock( newRouterStock );
    return newRouterStock;
  }

  /*****************************************************************/

  readonly updateFailed = ( data: newRouterStocks.UpdateFailedData ) => {
    let newRouterStock: newRouterStocks.UpdateFailed = {
      context: "Routers|NewRouterStock",
      tags: [],
      identifier: "UpdateFailed",
      data: {
        id: ( data.id ) ? data.id : null,
        conditions: ( data.conditions ) ? data.conditions : null,
        updates: data.updates,
        reason: data.reason
      }
    };
    this.emitNewRouterStock( newRouterStock );
    return newRouterStock;
  }

  /*****************************************************************/

  readonly removed = ( data: newRouterStocks.RemovedData ) => {
    let newRouterStock: newRouterStocks.Removed = {
      context: "Routers|NewRouterStock",
      tags: [],
      identifier: "Removed",
      data: {
        id: ( data.id ) ? data.id : null,
        conditions: ( data.conditions ) ? data.conditions : null,
      }
    };
    this.emitNewRouterStock( newRouterStock );
    return newRouterStock;
  }

  /*****************************************************************/

  readonly removeFailed = ( data: newRouterStocks.RemoveFailedData ) => {
    let newRouterStock: newRouterStocks.RemoveFailed = {
      context: "Routers|NewRouterStock",
      tags: [],
      identifier: "RemoveFailed",
      data: {
        id: ( data.id ) ? data.id : null,
        conditions: ( data.conditions ) ? data.conditions : null,
        reason: data.reason
      }
    };
    this.emitNewRouterStock( newRouterStock );
    return newRouterStock;
  }

  /*****************************************************************/

}

/******************************************************************************/

export default ( emitNewRouterStock: newRouterStockManagerInterfaces.Emit ): newRouterStockInterfaces.Emitter => {
  return new NewRouterStockEmitter( emitNewRouterStock );
}

/******************************************************************************/
