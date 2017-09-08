/******************************************************************************/

import * as express from "express";
import * as Promise from "bluebird";

import * as src from "../../../../src";
import * as eventListener from "../../../../src/event-listener";
import * as admin from "../../../../src/procedures/call-263/admin";
import * as storage from "../../../../src/components/storage";
import * as sharedLogic from "../../../../src/components/shared-logic";

import events from "./events";

/******************************************************************************/

class AirtimeTransfers implements admin.AirtimeTransfers {

  constructor(
    private readonly events: admin.airtimeTransfers.Events,
    private readonly checkThrow: sharedLogic.moders.CheckThrow,

    private readonly getAirtimeTransfers: storage.call263.airtimeTransfer.Get,
    private readonly getAirtimeTransferById: storage.call263.airtimeTransfer.GetById,
    private readonly addNewAirtimeTransfer: storage.call263.airtimeTransfer.Add,
    private readonly updateAirtimeTransferById: storage.call263.airtimeTransfer.UpdateById,
    private readonly removeAirtimeTransferById: storage.call263.airtimeTransfer.RemoveById
  ) { }

  get = ( filtrationCriteria: storage.call263.airtimeTransfer.FiltrationCriteria, sortCriteria: storage.call263.airtimeTransfer.SortCriteria, limit: number, forceThrow?: boolean ): Promise<dataModel.call263.airtimeTransfer.Super[]> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.getAirtimeTransfers( filtrationCriteria, sortCriteria, limit );

      } )
      .catch(( reason: any ) => {

        return Promise.reject( {
          identifier: "GetTransferFailed",
          data: {
            reason: reason
          }
        } );

      } );

  }

  getOne = ( airtimeTransferId: string, forceThrow?: boolean ): Promise<dataModel.call263.airtimeTransfer.Super> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.getAirtimeTransferById( airtimeTransferId );

      } )
      .catch(( reason: any ) => {

        return Promise.reject( {
          identifier: "GetTransferFailed",
          data: {
            reason: reason
          }
        } );

      } );

  };

  makeTransfer = ( airtimeTransferId: string, amount: number, forceThrow?: boolean ): Promise<any> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return Promise.resolve();

      } )
      .catch(( reason: any ) => {

        return Promise.reject( {
          identifier: "MakeTransferFailed",
          data: {
            reason: reason
          }
        } );

      } );

  }

  recordTransfer = ( airtimeTransfer: storage.call263.airtimeTransfer.AddDetails, forceThrow?: boolean ): Promise<dataModel.call263.airtimeTransfer.Super> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.addNewAirtimeTransfer( airtimeTransfer );

      } )
      .catch(( reason: any ) => {

        return Promise.reject( {
          identifier: "RecordTransferFailed",
          data: {
            reason: reason
          }
        } );

      } );

  }

  update = ( airtimeTransferId: string, updates: storage.call263.airtimeTransfer.UpdateDetails, forceThrow?: boolean ): Promise<dataModel.call263.airtimeTransfer.Super> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.updateAirtimeTransferById( airtimeTransferId, updates );

      } )
      .catch(( reason: any ) => {

        return Promise.reject( {
          identifier: "UpdateTransferFailed",
          data: {
            reason: reason
          }
        } );

      } );

  }

  remove = ( airtimeTransferId: string, forceThrow?: boolean ): Promise<void> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.removeAirtimeTransferById( airtimeTransferId );

      } )
      .catch(( reason: any ) => {

        return Promise.reject( {
          identifier: "RemoveTransferFailed",
          data: {
            reason: reason
          }
        } );

      } );

  }

}

/******************************************************************************/

export default ( params: {
  emitEvent: eventListener.Emit,
  checkThrow: sharedLogic.moders.CheckThrow,

  getAirtimeTransfers: storage.call263.airtimeTransfer.Get,
  getAirtimeTransferById: storage.call263.airtimeTransfer.GetById,
  addNewAirtimeTransfer: storage.call263.airtimeTransfer.Add,
  updateAirtimeTransferById: storage.call263.airtimeTransfer.UpdateById,
  removeAirtimeTransferById: storage.call263.airtimeTransfer.RemoveById
} ): admin.AirtimeTransfers => {
  return new AirtimeTransfers(
    eventsFactory( params.emitEvent ),
    params.checkThrow,

    params.getAirtimeTransfers,
    params.getAirtimeTransferById,
    params.addNewAirtimeTransfer,
    params.updateAirtimeTransferById,
    params.removeAirtimeTransferById
  );
}

/******************************************************************************/