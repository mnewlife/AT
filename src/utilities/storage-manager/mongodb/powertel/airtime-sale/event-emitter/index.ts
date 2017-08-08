/******************************************************************************/

import * as Promise from "bluebird";

import * as interfaces from "../../../../../../interfaces";
import * as airtimeSales from "../../../../../../interfaces/utilities/storage-manager/powertel/airtime-sale/events";
import * as airtimeSaleInterfaces from "../../../../../../interfaces/utilities/storage-manager/powertel/airtime-sale";
import * as airtimeSaleManagerInterfaces from "../../../../../../interfaces/setup-config/event-manager";

/******************************************************************************/

class AirtimeSaleEmitter implements airtimeSaleInterfaces.Emitter {

  /*****************************************************************/

  constructor( private readonly emitAirtimeSale: airtimeSaleManagerInterfaces.Emit ) { }

  /*****************************************************************/

  readonly got = ( data: airtimeSales.GotData ) => {
    let airtimeSale: airtimeSales.Got = {
      context: "Powertel|AirtimeSale",
      tags: [],
      identifier: "Got",
      data: {
        filtrationCriteria: data.filtrationCriteria,
        sortCriteria: data.sortCriteria,
        limit: data.limit,
        ids: data.ids
      }
    };
    this.emitAirtimeSale( airtimeSale );
    return airtimeSale;
  }

  /*****************************************************************/

  readonly getFailed = ( data: airtimeSales.GetFailedData ) => {
    let airtimeSale: airtimeSales.GetFailed = {
      context: "Powertel|AirtimeSale",
      tags: [],
      identifier: "GetFailed",
      data: {
        filtrationCriteria: data.filtrationCriteria,
        sortCriteria: data.sortCriteria,
        limit: data.limit,
        reason: data.reason
      }
    };
    this.emitAirtimeSale( airtimeSale );
    return airtimeSale;
  }

  /*****************************************************************/

  readonly gotById = ( data: airtimeSales.GotByIdData ) => {
    let airtimeSale: airtimeSales.GotById = {
      context: "Powertel|AirtimeSale",
      tags: [],
      identifier: "GotById",
      data: {
        id: data.id
      }
    };
    this.emitAirtimeSale( airtimeSale );
    return airtimeSale;
  }

  /*****************************************************************/

  readonly getByIdFailed = ( data: airtimeSales.GetByIdFailedData ) => {
    let airtimeSale: airtimeSales.GetByIdFailed = {
      context: "Powertel|AirtimeSale",
      tags: [],
      identifier: "GetByIdFailed",
      data: {
        id: data.id,
        reason: data.reason
      }
    };
    this.emitAirtimeSale( airtimeSale );
    return airtimeSale;
  }

  /*****************************************************************/

  readonly added = ( data: airtimeSales.AddedData ) => {
    let airtimeSale: airtimeSales.Added = {
      context: "Powertel|AirtimeSale",
      tags: [],
      identifier: "Added",
      data: {
        documents: data.documents
      }
    };
    this.emitAirtimeSale( airtimeSale );
    return airtimeSale;
  }

  /*****************************************************************/

  readonly addFailed = ( data: airtimeSales.AddFailedData ) => {
    let airtimeSale: airtimeSales.AddFailed = {
      context: "Powertel|AirtimeSale",
      tags: [],
      identifier: "AddFailed",
      data: {
        details: data.details,
        reason: data.reason
      }
    };
    this.emitAirtimeSale( airtimeSale );
    return airtimeSale;
  }

  /*****************************************************************/

  readonly updated = ( data: airtimeSales.UpdatedData ) => {
    let airtimeSale: airtimeSales.Updated = {
      context: "Powertel|AirtimeSale",
      tags: [],
      identifier: "Updated",
      data: {
        id: ( data.id ) ? data.id : null,
        conditions: ( data.conditions ) ? data.conditions : null,
        documents: data.documents
      }
    };
    this.emitAirtimeSale( airtimeSale );
    return airtimeSale;
  }

  /*****************************************************************/

  readonly updateFailed = ( data: airtimeSales.UpdateFailedData ) => {
    let airtimeSale: airtimeSales.UpdateFailed = {
      context: "Powertel|AirtimeSale",
      tags: [],
      identifier: "UpdateFailed",
      data: {
        id: ( data.id ) ? data.id : null,
        conditions: ( data.conditions ) ? data.conditions : null,
        updates: data.updates,
        reason: data.reason
      }
    };
    this.emitAirtimeSale( airtimeSale );
    return airtimeSale;
  }

  /*****************************************************************/

  readonly removed = ( data: airtimeSales.RemovedData ) => {
    let airtimeSale: airtimeSales.Removed = {
      context: "Powertel|AirtimeSale",
      tags: [],
      identifier: "Removed",
      data: {
        id: ( data.id ) ? data.id : null,
        conditions: ( data.conditions ) ? data.conditions : null,
      }
    };
    this.emitAirtimeSale( airtimeSale );
    return airtimeSale;
  }

  /*****************************************************************/

  readonly removeFailed = ( data: airtimeSales.RemoveFailedData ) => {
    let airtimeSale: airtimeSales.RemoveFailed = {
      context: "Powertel|AirtimeSale",
      tags: [],
      identifier: "RemoveFailed",
      data: {
        id: ( data.id ) ? data.id : null,
        conditions: ( data.conditions ) ? data.conditions : null,
        reason: data.reason
      }
    };
    this.emitAirtimeSale( airtimeSale );
    return airtimeSale;
  }

  /*****************************************************************/

}

/******************************************************************************/

export default ( emitAirtimeSale: airtimeSaleManagerInterfaces.Emit ): airtimeSaleInterfaces.Emitter => {
  return new AirtimeSaleEmitter( emitAirtimeSale );
}

/******************************************************************************/
