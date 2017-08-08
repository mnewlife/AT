/******************************************************************************/

import * as Promise from "bluebird";

import * as interfaces from "../../../../../../interfaces";
import * as users from "../../../../../../interfaces/utilities/storage-manager/call-263/airtime-transfer/events";
import * as userInterfaces from "../../../../../../interfaces/utilities/storage-manager/call-263/airtime-transfer";
import * as userManagerInterfaces from "../../../../../../interfaces/setup-config/event-manager";

/******************************************************************************/

class AirtimeTransferEmitter implements userInterfaces.Emitter {

  /*****************************************************************/

  constructor( private readonly emitAirtimeTransfer: userManagerInterfaces.Emit ) { }

  /*****************************************************************/

  readonly got = ( data: users.GotData ) => {
    let user: users.Got = {
      context: "Call263|AirtimeTransfer",
      tags: [],
      identifier: "Got",
      data: {
        filtrationCriteria: data.filtrationCriteria,
        sortCriteria: data.sortCriteria,
        limit: data.limit,
        ids: data.ids
      }
    };
    this.emitAirtimeTransfer( user );
    return user;
  }

  /*****************************************************************/

  readonly getFailed = ( data: users.GetFailedData ) => {
    let user: users.GetFailed = {
      context: "Call263|AirtimeTransfer",
      tags: [],
      identifier: "GetFailed",
      data: {
        filtrationCriteria: data.filtrationCriteria,
        sortCriteria: data.sortCriteria,
        limit: data.limit,
        reason: data.reason
      }
    };
    this.emitAirtimeTransfer( user );
    return user;
  }

  /*****************************************************************/

  readonly gotById = ( data: users.GotByIdData ) => {
    let user: users.GotById = {
      context: "Call263|AirtimeTransfer",
      tags: [],
      identifier: "GotById",
      data: {
        id: data.id
      }
    };
    this.emitAirtimeTransfer( user );
    return user;
  }

  /*****************************************************************/

  readonly getByIdFailed = ( data: users.GetByIdFailedData ) => {
    let user: users.GetByIdFailed = {
      context: "Call263|AirtimeTransfer",
      tags: [],
      identifier: "GetByIdFailed",
      data: {
        id: data.id,
        reason: data.reason
      }
    };
    this.emitAirtimeTransfer( user );
    return user;
  }

  /*****************************************************************/

  readonly added = ( data: users.AddedData ) => {
    let user: users.Added = {
      context: "Call263|AirtimeTransfer",
      tags: [],
      identifier: "Added",
      data: {
        documents: data.documents
      }
    };
    this.emitAirtimeTransfer( user );
    return user;
  }

  /*****************************************************************/

  readonly addFailed = ( data: users.AddFailedData ) => {
    let user: users.AddFailed = {
      context: "Call263|AirtimeTransfer",
      tags: [],
      identifier: "AddFailed",
      data: {
        details: data.details,
        reason: data.reason
      }
    };
    this.emitAirtimeTransfer( user );
    return user;
  }

  /*****************************************************************/

  readonly updated = ( data: users.UpdatedData ) => {
    let user: users.Updated = {
      context: "Call263|AirtimeTransfer",
      tags: [],
      identifier: "Updated",
      data: {
        id: ( data.id ) ? data.id : null,
        conditions: ( data.conditions ) ? data.conditions : null,
        documents: data.documents
      }
    };
    this.emitAirtimeTransfer( user );
    return user;
  }

  /*****************************************************************/

  readonly updateFailed = ( data: users.UpdateFailedData ) => {
    let user: users.UpdateFailed = {
      context: "Call263|AirtimeTransfer",
      tags: [],
      identifier: "UpdateFailed",
      data: {
        id: ( data.id ) ? data.id : null,
        conditions: ( data.conditions ) ? data.conditions : null,
        updates: data.updates,
        reason: data.reason
      }
    };
    this.emitAirtimeTransfer( user );
    return user;
  }

  /*****************************************************************/

  readonly removed = ( data: users.RemovedData ) => {
    let user: users.Removed = {
      context: "Call263|AirtimeTransfer",
      tags: [],
      identifier: "Removed",
      data: {
        id: ( data.id ) ? data.id : null,
        conditions: ( data.conditions ) ? data.conditions : null,
      }
    };
    this.emitAirtimeTransfer( user );
    return user;
  }

  /*****************************************************************/

  readonly removeFailed = ( data: users.RemoveFailedData ) => {
    let user: users.RemoveFailed = {
      context: "Call263|AirtimeTransfer",
      tags: [],
      identifier: "RemoveFailed",
      data: {
        id: ( data.id ) ? data.id : null,
        conditions: ( data.conditions ) ? data.conditions : null,
        reason: data.reason
      }
    };
    this.emitAirtimeTransfer( user );
    return user;
  }

  /*****************************************************************/

}

/******************************************************************************/

export default ( emitAirtimeTransfer: userManagerInterfaces.Emit ): userInterfaces.Emitter => {
  return new AirtimeTransferEmitter( emitAirtimeTransfer );
}

/******************************************************************************/
