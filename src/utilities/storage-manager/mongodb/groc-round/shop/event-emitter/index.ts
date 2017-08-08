/******************************************************************************/

import * as Promise from "bluebird";

import * as interfaces from "../../../../../../interfaces";
import * as shops from "../../../../../../interfaces/utilities/storage-manager/groc-round/shop/events";
import * as shopInterfaces from "../../../../../../interfaces/utilities/storage-manager/groc-round/shop";
import * as shopManagerInterfaces from "../../../../../../interfaces/setup-config/event-manager";

/******************************************************************************/

class ShopEmitter implements shopInterfaces.Emitter {

  /*****************************************************************/

  constructor( private readonly emitShop: shopManagerInterfaces.Emit ) { }

  /*****************************************************************/

  readonly got = ( data: shops.GotData ) => {
    let shop: shops.Got = {
      context: "GrocRound|Shop",
      tags: [],
      identifier: "Got",
      data: {
        filtrationCriteria: data.filtrationCriteria,
        sortCriteria: data.sortCriteria,
        limit: data.limit,
        ids: data.ids
      }
    };
    this.emitShop( shop );
    return shop;
  }

  /*****************************************************************/

  readonly getFailed = ( data: shops.GetFailedData ) => {
    let shop: shops.GetFailed = {
      context: "GrocRound|Shop",
      tags: [],
      identifier: "GetFailed",
      data: {
        filtrationCriteria: data.filtrationCriteria,
        sortCriteria: data.sortCriteria,
        limit: data.limit,
        reason: data.reason
      }
    };
    this.emitShop( shop );
    return shop;
  }

  /*****************************************************************/

  readonly gotById = ( data: shops.GotByIdData ) => {
    let shop: shops.GotById = {
      context: "GrocRound|Shop",
      tags: [],
      identifier: "GotById",
      data: {
        id: data.id
      }
    };
    this.emitShop( shop );
    return shop;
  }

  /*****************************************************************/

  readonly getByIdFailed = ( data: shops.GetByIdFailedData ) => {
    let shop: shops.GetByIdFailed = {
      context: "GrocRound|Shop",
      tags: [],
      identifier: "GetByIdFailed",
      data: {
        id: data.id,
        reason: data.reason
      }
    };
    this.emitShop( shop );
    return shop;
  }

  /*****************************************************************/

  readonly added = ( data: shops.AddedData ) => {
    let shop: shops.Added = {
      context: "GrocRound|Shop",
      tags: [],
      identifier: "Added",
      data: {
        documents: data.documents
      }
    };
    this.emitShop( shop );
    return shop;
  }

  /*****************************************************************/

  readonly addFailed = ( data: shops.AddFailedData ) => {
    let shop: shops.AddFailed = {
      context: "GrocRound|Shop",
      tags: [],
      identifier: "AddFailed",
      data: {
        details: data.details,
        reason: data.reason
      }
    };
    this.emitShop( shop );
    return shop;
  }

  /*****************************************************************/

  readonly updated = ( data: shops.UpdatedData ) => {
    let shop: shops.Updated = {
      context: "GrocRound|Shop",
      tags: [],
      identifier: "Updated",
      data: {
        id: ( data.id ) ? data.id : null,
        conditions: ( data.conditions ) ? data.conditions : null,
        documents: data.documents
      }
    };
    this.emitShop( shop );
    return shop;
  }

  /*****************************************************************/

  readonly updateFailed = ( data: shops.UpdateFailedData ) => {
    let shop: shops.UpdateFailed = {
      context: "GrocRound|Shop",
      tags: [],
      identifier: "UpdateFailed",
      data: {
        id: ( data.id ) ? data.id : null,
        conditions: ( data.conditions ) ? data.conditions : null,
        updates: data.updates,
        reason: data.reason
      }
    };
    this.emitShop( shop );
    return shop;
  }

  /*****************************************************************/

  readonly removed = ( data: shops.RemovedData ) => {
    let shop: shops.Removed = {
      context: "GrocRound|Shop",
      tags: [],
      identifier: "Removed",
      data: {
        id: ( data.id ) ? data.id : null,
        conditions: ( data.conditions ) ? data.conditions : null,
      }
    };
    this.emitShop( shop );
    return shop;
  }

  /*****************************************************************/

  readonly removeFailed = ( data: shops.RemoveFailedData ) => {
    let shop: shops.RemoveFailed = {
      context: "GrocRound|Shop",
      tags: [],
      identifier: "RemoveFailed",
      data: {
        id: ( data.id ) ? data.id : null,
        conditions: ( data.conditions ) ? data.conditions : null,
        reason: data.reason
      }
    };
    this.emitShop( shop );
    return shop;
  }

  /*****************************************************************/

}

/******************************************************************************/

export default ( emitShop: shopManagerInterfaces.Emit ): shopInterfaces.Emitter => {
  return new ShopEmitter( emitShop );
}

/******************************************************************************/
