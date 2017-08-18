/******************************************************************************/

import * as Promise from "bluebird";

import * as src from "../../../../../../src";
import * as prices from "../../../../../../src/components/storage/groc-round/price/events";
import * as priceInterfaces from "../../../../../../src/components/storage/groc-round/price";
import * as priceManagerInterfaces from "../../../../../../src/setup-config/event-manager";

/******************************************************************************/

class PriceEvents implements priceInterfaces.Events {

  /*****************************************************************/

  constructor( private readonly emitPrice: priceManagerInterfaces.Emit ) { }

  /*****************************************************************/

  readonly got = ( data: prices.GotData ) => {
    let price: prices.Got = {
      context: "GrocRound|Price",
      tags: [],
      identifier: "Got",
      data: {
        filtrationCriteria: data.filtrationCriteria,
        sortCriteria: data.sortCriteria,
        limit: data.limit,
        ids: data.ids
      }
    };
    this.emitPrice( price );
    return price;
  }

  /*****************************************************************/

  readonly getFailed = ( data: prices.GetFailedData ) => {
    let price: prices.GetFailed = {
      context: "GrocRound|Price",
      tags: [],
      identifier: "GetFailed",
      data: {
        filtrationCriteria: data.filtrationCriteria,
        sortCriteria: data.sortCriteria,
        limit: data.limit,
        reason: data.reason
      }
    };
    this.emitPrice( price );
    return price;
  }

  /*****************************************************************/

  readonly gotById = ( data: prices.GotByIdData ) => {
    let price: prices.GotById = {
      context: "GrocRound|Price",
      tags: [],
      identifier: "GotById",
      data: {
        id: data.id
      }
    };
    this.emitPrice( price );
    return price;
  }

  /*****************************************************************/

  readonly getByIdFailed = ( data: prices.GetByIdFailedData ) => {
    let price: prices.GetByIdFailed = {
      context: "GrocRound|Price",
      tags: [],
      identifier: "GetByIdFailed",
      data: {
        id: data.id,
        reason: data.reason
      }
    };
    this.emitPrice( price );
    return price;
  }

  /*****************************************************************/

  readonly added = ( data: prices.AddedData ) => {
    let price: prices.Added = {
      context: "GrocRound|Price",
      tags: [],
      identifier: "Added",
      data: {
        documents: data.documents
      }
    };
    this.emitPrice( price );
    return price;
  }

  /*****************************************************************/

  readonly addFailed = ( data: prices.AddFailedData ) => {
    let price: prices.AddFailed = {
      context: "GrocRound|Price",
      tags: [],
      identifier: "AddFailed",
      data: {
        details: data.details,
        reason: data.reason
      }
    };
    this.emitPrice( price );
    return price;
  }

  /*****************************************************************/

  readonly updated = ( data: prices.UpdatedData ) => {
    let price: prices.Updated = {
      context: "GrocRound|Price",
      tags: [],
      identifier: "Updated",
      data: {
        id: ( data.id ) ? data.id : null,
        conditions: ( data.conditions ) ? data.conditions : null,
        documents: data.documents
      }
    };
    this.emitPrice( price );
    return price;
  }

  /*****************************************************************/

  readonly updateFailed = ( data: prices.UpdateFailedData ) => {
    let price: prices.UpdateFailed = {
      context: "GrocRound|Price",
      tags: [],
      identifier: "UpdateFailed",
      data: {
        id: ( data.id ) ? data.id : null,
        conditions: ( data.conditions ) ? data.conditions : null,
        updates: data.updates,
        reason: data.reason
      }
    };
    this.emitPrice( price );
    return price;
  }

  /*****************************************************************/

  readonly removed = ( data: prices.RemovedData ) => {
    let price: prices.Removed = {
      context: "GrocRound|Price",
      tags: [],
      identifier: "Removed",
      data: {
        id: ( data.id ) ? data.id : null,
        conditions: ( data.conditions ) ? data.conditions : null,
      }
    };
    this.emitPrice( price );
    return price;
  }

  /*****************************************************************/

  readonly removeFailed = ( data: prices.RemoveFailedData ) => {
    let price: prices.RemoveFailed = {
      context: "GrocRound|Price",
      tags: [],
      identifier: "RemoveFailed",
      data: {
        id: ( data.id ) ? data.id : null,
        conditions: ( data.conditions ) ? data.conditions : null,
        reason: data.reason
      }
    };
    this.emitPrice( price );
    return price;
  }

  /*****************************************************************/

}

/******************************************************************************/

export default ( emitPrice: priceManagerInterfaces.Emit ): priceInterfaces.Events => {
  return new PriceEvents( emitPrice );
}

/******************************************************************************/
