/******************************************************************************/

import * as Promise from "bluebird";

import * as interfaces from "../../../../../../interfaces";
import * as airtimes from "../../../../../../interfaces/utilities/storage-manager/powertel/airtime/events";
import * as airtimeInterfaces from "../../../../../../interfaces/utilities/storage-manager/powertel/airtime";
import * as airtimeManagerInterfaces from "../../../../../../interfaces/setup-config/event-manager";

/******************************************************************************/

class AirtimeEmitter implements airtimeInterfaces.Emitter {

  /*****************************************************************/

  constructor( private readonly emitAirtime: airtimeManagerInterfaces.Emit ) { }

  /*****************************************************************/

  readonly got = ( data: airtimes.GotData ) => {
    let airtime: airtimes.Got = {
      context: "Powertel|Airtime",
      tags: [],
      identifier: "Got",
      data: {
        filtrationCriteria: data.filtrationCriteria,
        sortCriteria: data.sortCriteria,
        limit: data.limit,
        ids: data.ids
      }
    };
    this.emitAirtime( airtime );
    return airtime;
  }

  /*****************************************************************/

  readonly getFailed = ( data: airtimes.GetFailedData ) => {
    let airtime: airtimes.GetFailed = {
      context: "Powertel|Airtime",
      tags: [],
      identifier: "GetFailed",
      data: {
        filtrationCriteria: data.filtrationCriteria,
        sortCriteria: data.sortCriteria,
        limit: data.limit,
        reason: data.reason
      }
    };
    this.emitAirtime( airtime );
    return airtime;
  }

  /*****************************************************************/

  readonly gotById = ( data: airtimes.GotByIdData ) => {
    let airtime: airtimes.GotById = {
      context: "Powertel|Airtime",
      tags: [],
      identifier: "GotById",
      data: {
        id: data.id
      }
    };
    this.emitAirtime( airtime );
    return airtime;
  }

  /*****************************************************************/

  readonly getByIdFailed = ( data: airtimes.GetByIdFailedData ) => {
    let airtime: airtimes.GetByIdFailed = {
      context: "Powertel|Airtime",
      tags: [],
      identifier: "GetByIdFailed",
      data: {
        id: data.id,
        reason: data.reason
      }
    };
    this.emitAirtime( airtime );
    return airtime;
  }

  /*****************************************************************/

  readonly added = ( data: airtimes.AddedData ) => {
    let airtime: airtimes.Added = {
      context: "Powertel|Airtime",
      tags: [],
      identifier: "Added",
      data: {
        documents: data.documents
      }
    };
    this.emitAirtime( airtime );
    return airtime;
  }

  /*****************************************************************/

  readonly addFailed = ( data: airtimes.AddFailedData ) => {
    let airtime: airtimes.AddFailed = {
      context: "Powertel|Airtime",
      tags: [],
      identifier: "AddFailed",
      data: {
        details: data.details,
        reason: data.reason
      }
    };
    this.emitAirtime( airtime );
    return airtime;
  }

  /*****************************************************************/

  readonly updated = ( data: airtimes.UpdatedData ) => {
    let airtime: airtimes.Updated = {
      context: "Powertel|Airtime",
      tags: [],
      identifier: "Updated",
      data: {
        id: ( data.id ) ? data.id : null,
        conditions: ( data.conditions ) ? data.conditions : null,
        documents: data.documents
      }
    };
    this.emitAirtime( airtime );
    return airtime;
  }

  /*****************************************************************/

  readonly updateFailed = ( data: airtimes.UpdateFailedData ) => {
    let airtime: airtimes.UpdateFailed = {
      context: "Powertel|Airtime",
      tags: [],
      identifier: "UpdateFailed",
      data: {
        id: ( data.id ) ? data.id : null,
        conditions: ( data.conditions ) ? data.conditions : null,
        updates: data.updates,
        reason: data.reason
      }
    };
    this.emitAirtime( airtime );
    return airtime;
  }

  /*****************************************************************/

  readonly removed = ( data: airtimes.RemovedData ) => {
    let airtime: airtimes.Removed = {
      context: "Powertel|Airtime",
      tags: [],
      identifier: "Removed",
      data: {
        id: ( data.id ) ? data.id : null,
        conditions: ( data.conditions ) ? data.conditions : null,
      }
    };
    this.emitAirtime( airtime );
    return airtime;
  }

  /*****************************************************************/

  readonly removeFailed = ( data: airtimes.RemoveFailedData ) => {
    let airtime: airtimes.RemoveFailed = {
      context: "Powertel|Airtime",
      tags: [],
      identifier: "RemoveFailed",
      data: {
        id: ( data.id ) ? data.id : null,
        conditions: ( data.conditions ) ? data.conditions : null,
        reason: data.reason
      }
    };
    this.emitAirtime( airtime );
    return airtime;
  }

  /*****************************************************************/

}

/******************************************************************************/

export default ( emitAirtime: airtimeManagerInterfaces.Emit ): airtimeInterfaces.Emitter => {
  return new AirtimeEmitter( emitAirtime );
}

/******************************************************************************/
