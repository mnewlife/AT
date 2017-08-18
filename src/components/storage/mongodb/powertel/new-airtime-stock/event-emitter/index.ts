/******************************************************************************/

import * as Promise from "bluebird";

import * as src from "../../../../../../src";
import * as newAirtimeStocks from "../../../../../../src/components/storage/powertel/new-airtime-stock/events";
import * as newAirtimeStockInterfaces from "../../../../../../src/components/storage/powertel/new-airtime-stock";
import * as newAirtimeStockManagerInterfaces from "../../../../../../src/setup-config/event-manager";

/******************************************************************************/

class NewAirtimeStockEvents implements newAirtimeStockInterfaces.Events {

  /*****************************************************************/

  constructor( private readonly emitNewAirtimeStock: newAirtimeStockManagerInterfaces.Emit ) { }

  /*****************************************************************/

  readonly got = ( data: newAirtimeStocks.GotData ) => {
    let newAirtimeStock: newAirtimeStocks.Got = {
      context: "Powertel|NewAirtimeStock",
      tags: [],
      identifier: "Got",
      data: {
        filtrationCriteria: data.filtrationCriteria,
        sortCriteria: data.sortCriteria,
        limit: data.limit,
        ids: data.ids
      }
    };
    this.emitNewAirtimeStock( newAirtimeStock );
    return newAirtimeStock;
  }

  /*****************************************************************/

  readonly getFailed = ( data: newAirtimeStocks.GetFailedData ) => {
    let newAirtimeStock: newAirtimeStocks.GetFailed = {
      context: "Powertel|NewAirtimeStock",
      tags: [],
      identifier: "GetFailed",
      data: {
        filtrationCriteria: data.filtrationCriteria,
        sortCriteria: data.sortCriteria,
        limit: data.limit,
        reason: data.reason
      }
    };
    this.emitNewAirtimeStock( newAirtimeStock );
    return newAirtimeStock;
  }

  /*****************************************************************/

  readonly gotById = ( data: newAirtimeStocks.GotByIdData ) => {
    let newAirtimeStock: newAirtimeStocks.GotById = {
      context: "Powertel|NewAirtimeStock",
      tags: [],
      identifier: "GotById",
      data: {
        id: data.id
      }
    };
    this.emitNewAirtimeStock( newAirtimeStock );
    return newAirtimeStock;
  }

  /*****************************************************************/

  readonly getByIdFailed = ( data: newAirtimeStocks.GetByIdFailedData ) => {
    let newAirtimeStock: newAirtimeStocks.GetByIdFailed = {
      context: "Powertel|NewAirtimeStock",
      tags: [],
      identifier: "GetByIdFailed",
      data: {
        id: data.id,
        reason: data.reason
      }
    };
    this.emitNewAirtimeStock( newAirtimeStock );
    return newAirtimeStock;
  }

  /*****************************************************************/

  readonly added = ( data: newAirtimeStocks.AddedData ) => {
    let newAirtimeStock: newAirtimeStocks.Added = {
      context: "Powertel|NewAirtimeStock",
      tags: [],
      identifier: "Added",
      data: {
        documents: data.documents
      }
    };
    this.emitNewAirtimeStock( newAirtimeStock );
    return newAirtimeStock;
  }

  /*****************************************************************/

  readonly addFailed = ( data: newAirtimeStocks.AddFailedData ) => {
    let newAirtimeStock: newAirtimeStocks.AddFailed = {
      context: "Powertel|NewAirtimeStock",
      tags: [],
      identifier: "AddFailed",
      data: {
        details: data.details,
        reason: data.reason
      }
    };
    this.emitNewAirtimeStock( newAirtimeStock );
    return newAirtimeStock;
  }

  /*****************************************************************/

  readonly updated = ( data: newAirtimeStocks.UpdatedData ) => {
    let newAirtimeStock: newAirtimeStocks.Updated = {
      context: "Powertel|NewAirtimeStock",
      tags: [],
      identifier: "Updated",
      data: {
        id: ( data.id ) ? data.id : null,
        conditions: ( data.conditions ) ? data.conditions : null,
        documents: data.documents
      }
    };
    this.emitNewAirtimeStock( newAirtimeStock );
    return newAirtimeStock;
  }

  /*****************************************************************/

  readonly updateFailed = ( data: newAirtimeStocks.UpdateFailedData ) => {
    let newAirtimeStock: newAirtimeStocks.UpdateFailed = {
      context: "Powertel|NewAirtimeStock",
      tags: [],
      identifier: "UpdateFailed",
      data: {
        id: ( data.id ) ? data.id : null,
        conditions: ( data.conditions ) ? data.conditions : null,
        updates: data.updates,
        reason: data.reason
      }
    };
    this.emitNewAirtimeStock( newAirtimeStock );
    return newAirtimeStock;
  }

  /*****************************************************************/

  readonly removed = ( data: newAirtimeStocks.RemovedData ) => {
    let newAirtimeStock: newAirtimeStocks.Removed = {
      context: "Powertel|NewAirtimeStock",
      tags: [],
      identifier: "Removed",
      data: {
        id: ( data.id ) ? data.id : null,
        conditions: ( data.conditions ) ? data.conditions : null,
      }
    };
    this.emitNewAirtimeStock( newAirtimeStock );
    return newAirtimeStock;
  }

  /*****************************************************************/

  readonly removeFailed = ( data: newAirtimeStocks.RemoveFailedData ) => {
    let newAirtimeStock: newAirtimeStocks.RemoveFailed = {
      context: "Powertel|NewAirtimeStock",
      tags: [],
      identifier: "RemoveFailed",
      data: {
        id: ( data.id ) ? data.id : null,
        conditions: ( data.conditions ) ? data.conditions : null,
        reason: data.reason
      }
    };
    this.emitNewAirtimeStock( newAirtimeStock );
    return newAirtimeStock;
  }

  /*****************************************************************/

}

/******************************************************************************/

export default ( emitNewAirtimeStock: newAirtimeStockManagerInterfaces.Emit ): newAirtimeStockInterfaces.Events => {
  return new NewAirtimeStockEvents( emitNewAirtimeStock );
}

/******************************************************************************/
