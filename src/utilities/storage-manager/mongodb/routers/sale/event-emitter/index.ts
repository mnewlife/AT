/******************************************************************************/

import * as Promise from "bluebird";

import * as interfaces from "../../../../../../interfaces";
import * as sales from "../../../../../../interfaces/utilities/storage-manager/routers/sale/events";
import * as saleInterfaces from "../../../../../../interfaces/utilities/storage-manager/routers/sale";
import * as saleManagerInterfaces from "../../../../../../interfaces/setup-config/event-manager";

/******************************************************************************/

class SaleEmitter implements saleInterfaces.Emitter {

  /*****************************************************************/

  constructor( private readonly emitSale: saleManagerInterfaces.Emit ) { }

  /*****************************************************************/

  readonly got = ( data: sales.GotData ) => {
    let sale: sales.Got = {
      context: "Routers|Sale",
      tags: [],
      identifier: "Got",
      data: {
        filtrationCriteria: data.filtrationCriteria,
        sortCriteria: data.sortCriteria,
        limit: data.limit,
        ids: data.ids
      }
    };
    this.emitSale( sale );
    return sale;
  }

  /*****************************************************************/

  readonly getFailed = ( data: sales.GetFailedData ) => {
    let sale: sales.GetFailed = {
      context: "Routers|Sale",
      tags: [],
      identifier: "GetFailed",
      data: {
        filtrationCriteria: data.filtrationCriteria,
        sortCriteria: data.sortCriteria,
        limit: data.limit,
        reason: data.reason
      }
    };
    this.emitSale( sale );
    return sale;
  }

  /*****************************************************************/

  readonly gotById = ( data: sales.GotByIdData ) => {
    let sale: sales.GotById = {
      context: "Routers|Sale",
      tags: [],
      identifier: "GotById",
      data: {
        id: data.id
      }
    };
    this.emitSale( sale );
    return sale;
  }

  /*****************************************************************/

  readonly getByIdFailed = ( data: sales.GetByIdFailedData ) => {
    let sale: sales.GetByIdFailed = {
      context: "Routers|Sale",
      tags: [],
      identifier: "GetByIdFailed",
      data: {
        id: data.id,
        reason: data.reason
      }
    };
    this.emitSale( sale );
    return sale;
  }

  /*****************************************************************/

  readonly added = ( data: sales.AddedData ) => {
    let sale: sales.Added = {
      context: "Routers|Sale",
      tags: [],
      identifier: "Added",
      data: {
        documents: data.documents
      }
    };
    this.emitSale( sale );
    return sale;
  }

  /*****************************************************************/

  readonly addFailed = ( data: sales.AddFailedData ) => {
    let sale: sales.AddFailed = {
      context: "Routers|Sale",
      tags: [],
      identifier: "AddFailed",
      data: {
        details: data.details,
        reason: data.reason
      }
    };
    this.emitSale( sale );
    return sale;
  }

  /*****************************************************************/

  readonly updated = ( data: sales.UpdatedData ) => {
    let sale: sales.Updated = {
      context: "Routers|Sale",
      tags: [],
      identifier: "Updated",
      data: {
        id: ( data.id ) ? data.id : null,
        conditions: ( data.conditions ) ? data.conditions : null,
        documents: data.documents
      }
    };
    this.emitSale( sale );
    return sale;
  }

  /*****************************************************************/

  readonly updateFailed = ( data: sales.UpdateFailedData ) => {
    let sale: sales.UpdateFailed = {
      context: "Routers|Sale",
      tags: [],
      identifier: "UpdateFailed",
      data: {
        id: ( data.id ) ? data.id : null,
        conditions: ( data.conditions ) ? data.conditions : null,
        updates: data.updates,
        reason: data.reason
      }
    };
    this.emitSale( sale );
    return sale;
  }

  /*****************************************************************/

  readonly removed = ( data: sales.RemovedData ) => {
    let sale: sales.Removed = {
      context: "Routers|Sale",
      tags: [],
      identifier: "Removed",
      data: {
        id: ( data.id ) ? data.id : null,
        conditions: ( data.conditions ) ? data.conditions : null,
      }
    };
    this.emitSale( sale );
    return sale;
  }

  /*****************************************************************/

  readonly removeFailed = ( data: sales.RemoveFailedData ) => {
    let sale: sales.RemoveFailed = {
      context: "Routers|Sale",
      tags: [],
      identifier: "RemoveFailed",
      data: {
        id: ( data.id ) ? data.id : null,
        conditions: ( data.conditions ) ? data.conditions : null,
        reason: data.reason
      }
    };
    this.emitSale( sale );
    return sale;
  }

  /*****************************************************************/

}

/******************************************************************************/

export default ( emitSale: saleManagerInterfaces.Emit ): saleInterfaces.Emitter => {
  return new SaleEmitter( emitSale );
}

/******************************************************************************/
