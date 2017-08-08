/******************************************************************************/

import * as Promise from "bluebird";

import * as interfaces from "../../../../../../interfaces";
import * as cards from "../../../../../../interfaces/utilities/storage-manager/powertel/card/events";
import * as cardInterfaces from "../../../../../../interfaces/utilities/storage-manager/powertel/card";
import * as cardManagerInterfaces from "../../../../../../interfaces/setup-config/event-manager";

/******************************************************************************/

class CardEmitter implements cardInterfaces.Emitter {

  /*****************************************************************/

  constructor( private readonly emitCard: cardManagerInterfaces.Emit ) { }

  /*****************************************************************/

  readonly got = ( data: cards.GotData ) => {
    let card: cards.Got = {
      context: "Powertel|Card",
      tags: [],
      identifier: "Got",
      data: {
        filtrationCriteria: data.filtrationCriteria,
        sortCriteria: data.sortCriteria,
        limit: data.limit,
        ids: data.ids
      }
    };
    this.emitCard( card );
    return card;
  }

  /*****************************************************************/

  readonly getFailed = ( data: cards.GetFailedData ) => {
    let card: cards.GetFailed = {
      context: "Powertel|Card",
      tags: [],
      identifier: "GetFailed",
      data: {
        filtrationCriteria: data.filtrationCriteria,
        sortCriteria: data.sortCriteria,
        limit: data.limit,
        reason: data.reason
      }
    };
    this.emitCard( card );
    return card;
  }

  /*****************************************************************/

  readonly gotById = ( data: cards.GotByIdData ) => {
    let card: cards.GotById = {
      context: "Powertel|Card",
      tags: [],
      identifier: "GotById",
      data: {
        id: data.id
      }
    };
    this.emitCard( card );
    return card;
  }

  /*****************************************************************/

  readonly getByIdFailed = ( data: cards.GetByIdFailedData ) => {
    let card: cards.GetByIdFailed = {
      context: "Powertel|Card",
      tags: [],
      identifier: "GetByIdFailed",
      data: {
        id: data.id,
        reason: data.reason
      }
    };
    this.emitCard( card );
    return card;
  }

  /*****************************************************************/

  readonly added = ( data: cards.AddedData ) => {
    let card: cards.Added = {
      context: "Powertel|Card",
      tags: [],
      identifier: "Added",
      data: {
        documents: data.documents
      }
    };
    this.emitCard( card );
    return card;
  }

  /*****************************************************************/

  readonly addFailed = ( data: cards.AddFailedData ) => {
    let card: cards.AddFailed = {
      context: "Powertel|Card",
      tags: [],
      identifier: "AddFailed",
      data: {
        details: data.details,
        reason: data.reason
      }
    };
    this.emitCard( card );
    return card;
  }

  /*****************************************************************/

  readonly updated = ( data: cards.UpdatedData ) => {
    let card: cards.Updated = {
      context: "Powertel|Card",
      tags: [],
      identifier: "Updated",
      data: {
        id: ( data.id ) ? data.id : null,
        conditions: ( data.conditions ) ? data.conditions : null,
        documents: data.documents
      }
    };
    this.emitCard( card );
    return card;
  }

  /*****************************************************************/

  readonly updateFailed = ( data: cards.UpdateFailedData ) => {
    let card: cards.UpdateFailed = {
      context: "Powertel|Card",
      tags: [],
      identifier: "UpdateFailed",
      data: {
        id: ( data.id ) ? data.id : null,
        conditions: ( data.conditions ) ? data.conditions : null,
        updates: data.updates,
        reason: data.reason
      }
    };
    this.emitCard( card );
    return card;
  }

  /*****************************************************************/

  readonly removed = ( data: cards.RemovedData ) => {
    let card: cards.Removed = {
      context: "Powertel|Card",
      tags: [],
      identifier: "Removed",
      data: {
        id: ( data.id ) ? data.id : null,
        conditions: ( data.conditions ) ? data.conditions : null,
      }
    };
    this.emitCard( card );
    return card;
  }

  /*****************************************************************/

  readonly removeFailed = ( data: cards.RemoveFailedData ) => {
    let card: cards.RemoveFailed = {
      context: "Powertel|Card",
      tags: [],
      identifier: "RemoveFailed",
      data: {
        id: ( data.id ) ? data.id : null,
        conditions: ( data.conditions ) ? data.conditions : null,
        reason: data.reason
      }
    };
    this.emitCard( card );
    return card;
  }

  /*****************************************************************/

}

/******************************************************************************/

export default ( emitCard: cardManagerInterfaces.Emit ): cardInterfaces.Emitter => {
  return new CardEmitter( emitCard );
}

/******************************************************************************/
