/******************************************************************************/

import * as express from "express";
import * as Promise from "bluebird";

import * as src from "../../../../src";
import * as eventManagerInterfaces from "../../../../src/setup-config/event-manager";
import * as adminInterfaces from "../../../../src/procedures/call-263/admin";
import * as storageInterfaces from "../../../../src/components/storage";
import * as sharedLogicInterfaces from "../../../../src/components/shared-logic";

import eventsFactory from "./events";

/******************************************************************************/

class AirtimeTransfers implements adminInterfaces.AirtimeTransfers {

  constructor(
    private readonly events: adminInterfaces.airtimeTransfers.Events,
    private readonly checkThrow: sharedLogicInterfaces.moders.CheckThrow,

    private readonly getAirtimeTransfers: storageInterfaces.call263.airtimeTransfer.Get,
    private readonly getAirtimeTransferById: storageInterfaces.call263.airtimeTransfer.GetById,
    private readonly addNewAirtimeTransfer: storageInterfaces.call263.airtimeTransfer.Add,
    private readonly updateAirtimeTransferById: storageInterfaces.call263.airtimeTransfer.UpdateById,
    private readonly removeAirtimeTransferById: storageInterfaces.call263.airtimeTransfer.RemoveById
  ) { }

  get = ( filtrationCriteria: storageInterfaces.call263.airtimeTransfer.FiltrationCriteria, sortCriteria: storageInterfaces.call263.airtimeTransfer.SortCriteria, limit: number, forceThrow?: boolean ): Promise<dataModel.call263.airtimeTransfer.Super[]> => {

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

  recordTransfer = ( airtimeTransfer: storageInterfaces.call263.airtimeTransfer.AddDetails, forceThrow?: boolean ): Promise<dataModel.call263.airtimeTransfer.Super> => {

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

  update = ( airtimeTransferId: string, updates: storageInterfaces.call263.airtimeTransfer.UpdateDetails, forceThrow?: boolean ): Promise<dataModel.call263.airtimeTransfer.Super> => {

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
  emitEvent: eventManagerInterfaces.Emit,
  checkThrow: sharedLogicInterfaces.moders.CheckThrow,

  getAirtimeTransfers: storageInterfaces.call263.airtimeTransfer.Get,
  getAirtimeTransferById: storageInterfaces.call263.airtimeTransfer.GetById,
  addNewAirtimeTransfer: storageInterfaces.call263.airtimeTransfer.Add,
  updateAirtimeTransferById: storageInterfaces.call263.airtimeTransfer.UpdateById,
  removeAirtimeTransferById: storageInterfaces.call263.airtimeTransfer.RemoveById
} ): adminInterfaces.AirtimeTransfers => {
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