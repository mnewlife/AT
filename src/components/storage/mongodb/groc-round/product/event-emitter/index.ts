/******************************************************************************/

import * as Promise from "bluebird";

import * as interfaces from "../../../../../../interfaces";
import * as products from "../../../../../../interfaces/components/storage/groc-round/product/events";
import * as productInterfaces from "../../../../../../interfaces/components/storage/groc-round/product";
import * as productManagerInterfaces from "../../../../../../interfaces/setup-config/event-manager";

/******************************************************************************/

class ProductEmitter implements productInterfaces.Emitter {

  /*****************************************************************/

  constructor( private readonly emitProduct: productManagerInterfaces.Emit ) { }

  /*****************************************************************/

  readonly got = ( data: products.GotData ) => {
    let product: products.Got = {
      context: "GrocRound|Product",
      tags: [],
      identifier: "Got",
      data: {
        filtrationCriteria: data.filtrationCriteria,
        sortCriteria: data.sortCriteria,
        limit: data.limit,
        ids: data.ids
      }
    };
    this.emitProduct( product );
    return product;
  }

  /*****************************************************************/

  readonly getFailed = ( data: products.GetFailedData ) => {
    let product: products.GetFailed = {
      context: "GrocRound|Product",
      tags: [],
      identifier: "GetFailed",
      data: {
        filtrationCriteria: data.filtrationCriteria,
        sortCriteria: data.sortCriteria,
        limit: data.limit,
        reason: data.reason
      }
    };
    this.emitProduct( product );
    return product;
  }

  /*****************************************************************/

  readonly gotById = ( data: products.GotByIdData ) => {
    let product: products.GotById = {
      context: "GrocRound|Product",
      tags: [],
      identifier: "GotById",
      data: {
        id: data.id
      }
    };
    this.emitProduct( product );
    return product;
  }

  /*****************************************************************/

  readonly getByIdFailed = ( data: products.GetByIdFailedData ) => {
    let product: products.GetByIdFailed = {
      context: "GrocRound|Product",
      tags: [],
      identifier: "GetByIdFailed",
      data: {
        id: data.id,
        reason: data.reason
      }
    };
    this.emitProduct( product );
    return product;
  }

  /*****************************************************************/

  readonly added = ( data: products.AddedData ) => {
    let product: products.Added = {
      context: "GrocRound|Product",
      tags: [],
      identifier: "Added",
      data: {
        documents: data.documents
      }
    };
    this.emitProduct( product );
    return product;
  }

  /*****************************************************************/

  readonly addFailed = ( data: products.AddFailedData ) => {
    let product: products.AddFailed = {
      context: "GrocRound|Product",
      tags: [],
      identifier: "AddFailed",
      data: {
        details: data.details,
        reason: data.reason
      }
    };
    this.emitProduct( product );
    return product;
  }

  /*****************************************************************/

  readonly updated = ( data: products.UpdatedData ) => {
    let product: products.Updated = {
      context: "GrocRound|Product",
      tags: [],
      identifier: "Updated",
      data: {
        id: ( data.id ) ? data.id : null,
        conditions: ( data.conditions ) ? data.conditions : null,
        documents: data.documents
      }
    };
    this.emitProduct( product );
    return product;
  }

  /*****************************************************************/

  readonly updateFailed = ( data: products.UpdateFailedData ) => {
    let product: products.UpdateFailed = {
      context: "GrocRound|Product",
      tags: [],
      identifier: "UpdateFailed",
      data: {
        id: ( data.id ) ? data.id : null,
        conditions: ( data.conditions ) ? data.conditions : null,
        updates: data.updates,
        reason: data.reason
      }
    };
    this.emitProduct( product );
    return product;
  }

  /*****************************************************************/

  readonly removed = ( data: products.RemovedData ) => {
    let product: products.Removed = {
      context: "GrocRound|Product",
      tags: [],
      identifier: "Removed",
      data: {
        id: ( data.id ) ? data.id : null,
        conditions: ( data.conditions ) ? data.conditions : null,
      }
    };
    this.emitProduct( product );
    return product;
  }

  /*****************************************************************/

  readonly removeFailed = ( data: products.RemoveFailedData ) => {
    let product: products.RemoveFailed = {
      context: "GrocRound|Product",
      tags: [],
      identifier: "RemoveFailed",
      data: {
        id: ( data.id ) ? data.id : null,
        conditions: ( data.conditions ) ? data.conditions : null,
        reason: data.reason
      }
    };
    this.emitProduct( product );
    return product;
  }

  /*****************************************************************/

}

/******************************************************************************/

export default ( emitProduct: productManagerInterfaces.Emit ): productInterfaces.Emitter => {
  return new ProductEmitter( emitProduct );
}

/******************************************************************************/
