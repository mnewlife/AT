/******************************************************************************/

import * as Promise from "bluebird";

import * as src from "../../../../../../src";
import * as users from "../../../../../../src/components/storage/core/user/events";
import * as userInterfaces from "../../../../../../src/components/storage/core/user";
import * as userManagerInterfaces from "../../../../../../src/setup-config/event-manager";

/******************************************************************************/

class UserEvents implements userInterfaces.Events {

  /*****************************************************************/

  constructor( private readonly emitUser: userManagerInterfaces.Emit ) { }

  /*****************************************************************/

  readonly got = ( data: users.GotData ) => {
    let user: users.Got = {
      context: "Core|User",
      tags: [],
      identifier: "Got",
      data: {
        filtrationCriteria: data.filtrationCriteria,
        sortCriteria: data.sortCriteria,
        limit: data.limit,
        ids: data.ids
      }
    };
    this.emitUser( user );
    return user;
  }

  /*****************************************************************/

  readonly getFailed = ( data: users.GetFailedData ) => {
    let user: users.GetFailed = {
      context: "Core|User",
      tags: [],
      identifier: "GetFailed",
      data: {
        filtrationCriteria: data.filtrationCriteria,
        sortCriteria: data.sortCriteria,
        limit: data.limit,
        reason: data.reason
      }
    };
    this.emitUser( user );
    return user;
  }

  /*****************************************************************/

  readonly gotById = ( data: users.GotByIdData ) => {
    let user: users.GotById = {
      context: "Core|User",
      tags: [],
      identifier: "GotById",
      data: {
        id: data.id
      }
    };
    this.emitUser( user );
    return user;
  }

  /*****************************************************************/

  readonly getByIdFailed = ( data: users.GetByIdFailedData ) => {
    let user: users.GetByIdFailed = {
      context: "Core|User",
      tags: [],
      identifier: "GetByIdFailed",
      data: {
        id: data.id,
        reason: data.reason
      }
    };
    this.emitUser( user );
    return user;
  }

  /*****************************************************************/

  readonly added = ( data: users.AddedData ) => {
    let user: users.Added = {
      context: "Core|User",
      tags: [],
      identifier: "Added",
      data: {
        documents: data.documents
      }
    };
    this.emitUser( user );
    return user;
  }

  /*****************************************************************/

  readonly addFailed = ( data: users.AddFailedData ) => {
    let user: users.AddFailed = {
      context: "Core|User",
      tags: [],
      identifier: "AddFailed",
      data: {
        details: data.details,
        reason: data.reason
      }
    };
    this.emitUser( user );
    return user;
  }

  /*****************************************************************/

  readonly updated = ( data: users.UpdatedData ) => {
    let user: users.Updated = {
      context: "Core|User",
      tags: [],
      identifier: "Updated",
      data: {
        id: ( data.id ) ? data.id : null,
        conditions: ( data.conditions ) ? data.conditions : null,
        documents: data.documents
      }
    };
    this.emitUser( user );
    return user;
  }

  /*****************************************************************/

  readonly updateFailed = ( data: users.UpdateFailedData ) => {
    let user: users.UpdateFailed = {
      context: "Core|User",
      tags: [],
      identifier: "UpdateFailed",
      data: {
        id: ( data.id ) ? data.id : null,
        conditions: ( data.conditions ) ? data.conditions : null,
        updates: data.updates,
        reason: data.reason
      }
    };
    this.emitUser( user );
    return user;
  }

  /*****************************************************************/

  readonly removed = ( data: users.RemovedData ) => {
    let user: users.Removed = {
      context: "Core|User",
      tags: [],
      identifier: "Removed",
      data: {
        id: ( data.id ) ? data.id : null,
        conditions: ( data.conditions ) ? data.conditions : null,
      }
    };
    this.emitUser( user );
    return user;
  }

  /*****************************************************************/

  readonly removeFailed = ( data: users.RemoveFailedData ) => {
    let user: users.RemoveFailed = {
      context: "Core|User",
      tags: [],
      identifier: "RemoveFailed",
      data: {
        id: ( data.id ) ? data.id : null,
        conditions: ( data.conditions ) ? data.conditions : null,
        reason: data.reason
      }
    };
    this.emitUser( user );
    return user;
  }

  /*****************************************************************/

}

/******************************************************************************/

export default ( emitUser: userManagerInterfaces.Emit ): userInterfaces.Events => {
  return new UserEvents( emitUser );
}

/******************************************************************************/
