/******************************************************************************/

import * as Promise from "bluebird";

import * as interfaces from "../../../../../../interfaces";
import * as cardSales from "../../../../../../interfaces/components/storage/powertel/card-sale/events";
import * as cardSaleInterfaces from "../../../../../../interfaces/components/storage/powertel/card-sale";
import * as cardSaleManagerInterfaces from "../../../../../../interfaces/setup-config/event-manager";

/******************************************************************************/

class CardSaleEmitter implements cardSaleInterfaces.Emitter {

  /*****************************************************************/

  constructor( private readonly emitCardSale: cardSaleManagerInterfaces.Emit ) { }

  /*****************************************************************/

  readonly got = ( data: cardSales.GotData ) => {
    let cardSale: cardSales.Got = {
      context: "Powertel|CardSale",
      tags: [],
      identifier: "Got",
      data: {
        filtrationCriteria: data.filtrationCriteria,
        sortCriteria: data.sortCriteria,
        limit: data.limit,
        ids: data.ids
      }
    };
    this.emitCardSale( cardSale );
    return cardSale;
  }

  /*****************************************************************/

  readonly getFailed = ( data: cardSales.GetFailedData ) => {
    let cardSale: cardSales.GetFailed = {
      context: "Powertel|CardSale",
      tags: [],
      identifier: "GetFailed",
      data: {
        filtrationCriteria: data.filtrationCriteria,
        sortCriteria: data.sortCriteria,
        limit: data.limit,
        reason: data.reason
      }
    };
    this.emitCardSale( cardSale );
    return cardSale;
  }

  /*****************************************************************/

  readonly gotById = ( data: cardSales.GotByIdData ) => {
    let cardSale: cardSales.GotById = {
      context: "Powertel|CardSale",
      tags: [],
      identifier: "GotById",
      data: {
        id: data.id
      }
    };
    this.emitCardSale( cardSale );
    return cardSale;
  }

  /*****************************************************************/

  readonly getByIdFailed = ( data: cardSales.GetByIdFailedData ) => {
    let cardSale: cardSales.GetByIdFailed = {
      context: "Powertel|CardSale",
      tags: [],
      identifier: "GetByIdFailed",
      data: {
        id: data.id,
        reason: data.reason
      }
    };
    this.emitCardSale( cardSale );
    return cardSale;
  }

  /*****************************************************************/

  readonly added = ( data: cardSales.AddedData ) => {
    let cardSale: cardSales.Added = {
      context: "Powertel|CardSale",
      tags: [],
      identifier: "Added",
      data: {
        documents: data.documents
      }
    };
    this.emitCardSale( cardSale );
    return cardSale;
  }

  /*****************************************************************/

  readonly addFailed = ( data: cardSales.AddFailedData ) => {
    let cardSale: cardSales.AddFailed = {
      context: "Powertel|CardSale",
      tags: [],
      identifier: "AddFailed",
      data: {
        details: data.details,
        reason: data.reason
      }
    };
    this.emitCardSale( cardSale );
    return cardSale;
  }

  /*****************************************************************/

  readonly updated = ( data: cardSales.UpdatedData ) => {
    let cardSale: cardSales.Updated = {
      context: "Powertel|CardSale",
      tags: [],
      identifier: "Updated",
      data: {
        id: ( data.id ) ? data.id : null,
        conditions: ( data.conditions ) ? data.conditions : null,
        documents: data.documents
      }
    };
    this.emitCardSale( cardSale );
    return cardSale;
  }

  /*****************************************************************/

  readonly updateFailed = ( data: cardSales.UpdateFailedData ) => {
    let cardSale: cardSales.UpdateFailed = {
      context: "Powertel|CardSale",
      tags: [],
      identifier: "UpdateFailed",
      data: {
        id: ( data.id ) ? data.id : null,
        conditions: ( data.conditions ) ? data.conditions : null,
        updates: data.updates,
        reason: data.reason
      }
    };
    this.emitCardSale( cardSale );
    return cardSale;
  }

  /*****************************************************************/

  readonly removed = ( data: cardSales.RemovedData ) => {
    let cardSale: cardSales.Removed = {
      context: "Powertel|CardSale",
      tags: [],
      identifier: "Removed",
      data: {
        id: ( data.id ) ? data.id : null,
        conditions: ( data.conditions ) ? data.conditions : null,
      }
    };
    this.emitCardSale( cardSale );
    return cardSale;
  }

  /*****************************************************************/

  readonly removeFailed = ( data: cardSales.RemoveFailedData ) => {
    let cardSale: cardSales.RemoveFailed = {
      context: "Powertel|CardSale",
      tags: [],
      identifier: "RemoveFailed",
      data: {
        id: ( data.id ) ? data.id : null,
        conditions: ( data.conditions ) ? data.conditions : null,
        reason: data.reason
      }
    };
    this.emitCardSale( cardSale );
    return cardSale;
  }

  /*****************************************************************/

}

/******************************************************************************/

export default ( emitCardSale: cardSaleManagerInterfaces.Emit ): cardSaleInterfaces.Emitter => {
  return new CardSaleEmitter( emitCardSale );
}

/******************************************************************************/
