/******************************************************************************/

import * as Promise from "bluebird";

import * as interfaces from "../../../../../../interfaces";
import * as newCardStocks from "../../../../../../interfaces/components/storage/powertel/new-card-stock/events";
import * as newCardStockInterfaces from "../../../../../../interfaces/components/storage/powertel/new-card-stock";
import * as newCardStockManagerInterfaces from "../../../../../../interfaces/setup-config/event-manager";

/******************************************************************************/

class NewCardStockEmitter implements newCardStockInterfaces.Emitter {

  /*****************************************************************/

  constructor( private readonly emitNewCardStock: newCardStockManagerInterfaces.Emit ) { }

  /*****************************************************************/

  readonly got = ( data: newCardStocks.GotData ) => {
    let newCardStock: newCardStocks.Got = {
      context: "Powertel|NewCardStock",
      tags: [],
      identifier: "Got",
      data: {
        filtrationCriteria: data.filtrationCriteria,
        sortCriteria: data.sortCriteria,
        limit: data.limit,
        ids: data.ids
      }
    };
    this.emitNewCardStock( newCardStock );
    return newCardStock;
  }

  /*****************************************************************/

  readonly getFailed = ( data: newCardStocks.GetFailedData ) => {
    let newCardStock: newCardStocks.GetFailed = {
      context: "Powertel|NewCardStock",
      tags: [],
      identifier: "GetFailed",
      data: {
        filtrationCriteria: data.filtrationCriteria,
        sortCriteria: data.sortCriteria,
        limit: data.limit,
        reason: data.reason
      }
    };
    this.emitNewCardStock( newCardStock );
    return newCardStock;
  }

  /*****************************************************************/

  readonly gotById = ( data: newCardStocks.GotByIdData ) => {
    let newCardStock: newCardStocks.GotById = {
      context: "Powertel|NewCardStock",
      tags: [],
      identifier: "GotById",
      data: {
        id: data.id
      }
    };
    this.emitNewCardStock( newCardStock );
    return newCardStock;
  }

  /*****************************************************************/

  readonly getByIdFailed = ( data: newCardStocks.GetByIdFailedData ) => {
    let newCardStock: newCardStocks.GetByIdFailed = {
      context: "Powertel|NewCardStock",
      tags: [],
      identifier: "GetByIdFailed",
      data: {
        id: data.id,
        reason: data.reason
      }
    };
    this.emitNewCardStock( newCardStock );
    return newCardStock;
  }

  /*****************************************************************/

  readonly added = ( data: newCardStocks.AddedData ) => {
    let newCardStock: newCardStocks.Added = {
      context: "Powertel|NewCardStock",
      tags: [],
      identifier: "Added",
      data: {
        documents: data.documents
      }
    };
    this.emitNewCardStock( newCardStock );
    return newCardStock;
  }

  /*****************************************************************/

  readonly addFailed = ( data: newCardStocks.AddFailedData ) => {
    let newCardStock: newCardStocks.AddFailed = {
      context: "Powertel|NewCardStock",
      tags: [],
      identifier: "AddFailed",
      data: {
        details: data.details,
        reason: data.reason
      }
    };
    this.emitNewCardStock( newCardStock );
    return newCardStock;
  }

  /*****************************************************************/

  readonly updated = ( data: newCardStocks.UpdatedData ) => {
    let newCardStock: newCardStocks.Updated = {
      context: "Powertel|NewCardStock",
      tags: [],
      identifier: "Updated",
      data: {
        id: ( data.id ) ? data.id : null,
        conditions: ( data.conditions ) ? data.conditions : null,
        documents: data.documents
      }
    };
    this.emitNewCardStock( newCardStock );
    return newCardStock;
  }

  /*****************************************************************/

  readonly updateFailed = ( data: newCardStocks.UpdateFailedData ) => {
    let newCardStock: newCardStocks.UpdateFailed = {
      context: "Powertel|NewCardStock",
      tags: [],
      identifier: "UpdateFailed",
      data: {
        id: ( data.id ) ? data.id : null,
        conditions: ( data.conditions ) ? data.conditions : null,
        updates: data.updates,
        reason: data.reason
      }
    };
    this.emitNewCardStock( newCardStock );
    return newCardStock;
  }

  /*****************************************************************/

  readonly removed = ( data: newCardStocks.RemovedData ) => {
    let newCardStock: newCardStocks.Removed = {
      context: "Powertel|NewCardStock",
      tags: [],
      identifier: "Removed",
      data: {
        id: ( data.id ) ? data.id : null,
        conditions: ( data.conditions ) ? data.conditions : null,
      }
    };
    this.emitNewCardStock( newCardStock );
    return newCardStock;
  }

  /*****************************************************************/

  readonly removeFailed = ( data: newCardStocks.RemoveFailedData ) => {
    let newCardStock: newCardStocks.RemoveFailed = {
      context: "Powertel|NewCardStock",
      tags: [],
      identifier: "RemoveFailed",
      data: {
        id: ( data.id ) ? data.id : null,
        conditions: ( data.conditions ) ? data.conditions : null,
        reason: data.reason
      }
    };
    this.emitNewCardStock( newCardStock );
    return newCardStock;
  }

  /*****************************************************************/

}

/******************************************************************************/

export default ( emitNewCardStock: newCardStockManagerInterfaces.Emit ): newCardStockInterfaces.Emitter => {
  return new NewCardStockEmitter( emitNewCardStock );
}

/******************************************************************************/
