/******************************************************************************/

import * as Promise from "bluebird";

import * as src from "../../../../../../src";
import * as channels from "../../../../../../src/components/storage/call-263/channel/events";
import * as channelInterfaces from "../../../../../../src/components/storage/call-263/channel";
import * as channelManagerInterfaces from "../../../../../../src/setup-config/event-manager";

/******************************************************************************/

class ChannelEvents implements channelInterfaces.Events {

  /*****************************************************************/

  constructor( private readonly emitChannel: channelManagerInterfaces.Emit ) { }

  /*****************************************************************/

  readonly got = ( data: channels.GotData ) => {
    let channel: channels.Got = {
      context: "Call263|Channel",
      tags: [],
      identifier: "Got",
      data: {
        filtrationCriteria: data.filtrationCriteria,
        sortCriteria: data.sortCriteria,
        limit: data.limit,
        ids: data.ids
      }
    };
    this.emitChannel( channel );
    return channel;
  }

  /*****************************************************************/

  readonly getFailed = ( data: channels.GetFailedData ) => {
    let channel: channels.GetFailed = {
      context: "Call263|Channel",
      tags: [],
      identifier: "GetFailed",
      data: {
        filtrationCriteria: data.filtrationCriteria,
        sortCriteria: data.sortCriteria,
        limit: data.limit,
        reason: data.reason
      }
    };
    this.emitChannel( channel );
    return channel;
  }

  /*****************************************************************/

  readonly gotById = ( data: channels.GotByIdData ) => {
    let channel: channels.GotById = {
      context: "Call263|Channel",
      tags: [],
      identifier: "GotById",
      data: {
        id: data.id
      }
    };
    this.emitChannel( channel );
    return channel;
  }

  /*****************************************************************/

  readonly getByIdFailed = ( data: channels.GetByIdFailedData ) => {
    let channel: channels.GetByIdFailed = {
      context: "Call263|Channel",
      tags: [],
      identifier: "GetByIdFailed",
      data: {
        id: data.id,
        reason: data.reason
      }
    };
    this.emitChannel( channel );
    return channel;
  }

  /*****************************************************************/

  readonly added = ( data: channels.AddedData ) => {
    let channel: channels.Added = {
      context: "Call263|Channel",
      tags: [],
      identifier: "Added",
      data: {
        documents: data.documents
      }
    };
    this.emitChannel( channel );
    return channel;
  }

  /*****************************************************************/

  readonly addFailed = ( data: channels.AddFailedData ) => {
    let channel: channels.AddFailed = {
      context: "Call263|Channel",
      tags: [],
      identifier: "AddFailed",
      data: {
        details: data.details,
        reason: data.reason
      }
    };
    this.emitChannel( channel );
    return channel;
  }

  /*****************************************************************/

  readonly updated = ( data: channels.UpdatedData ) => {
    let channel: channels.Updated = {
      context: "Call263|Channel",
      tags: [],
      identifier: "Updated",
      data: {
        id: ( data.id ) ? data.id : null,
        conditions: ( data.conditions ) ? data.conditions : null,
        documents: data.documents
      }
    };
    this.emitChannel( channel );
    return channel;
  }

  /*****************************************************************/

  readonly updateFailed = ( data: channels.UpdateFailedData ) => {
    let channel: channels.UpdateFailed = {
      context: "Call263|Channel",
      tags: [],
      identifier: "UpdateFailed",
      data: {
        id: ( data.id ) ? data.id : null,
        conditions: ( data.conditions ) ? data.conditions : null,
        updates: data.updates,
        reason: data.reason
      }
    };
    this.emitChannel( channel );
    return channel;
  }

  /*****************************************************************/

  readonly removed = ( data: channels.RemovedData ) => {
    let channel: channels.Removed = {
      context: "Call263|Channel",
      tags: [],
      identifier: "Removed",
      data: {
        id: ( data.id ) ? data.id : null,
        conditions: ( data.conditions ) ? data.conditions : null,
      }
    };
    this.emitChannel( channel );
    return channel;
  }

  /*****************************************************************/

  readonly removeFailed = ( data: channels.RemoveFailedData ) => {
    let channel: channels.RemoveFailed = {
      context: "Call263|Channel",
      tags: [],
      identifier: "RemoveFailed",
      data: {
        id: ( data.id ) ? data.id : null,
        conditions: ( data.conditions ) ? data.conditions : null,
        reason: data.reason
      }
    };
    this.emitChannel( channel );
    return channel;
  }

  /*****************************************************************/

}

/******************************************************************************/

export default ( emitChannel: channelManagerInterfaces.Emit ): channelInterfaces.Events => {
  return new ChannelEvents( emitChannel );
}

/******************************************************************************/
