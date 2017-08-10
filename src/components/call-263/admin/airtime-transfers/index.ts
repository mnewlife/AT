/******************************************************************************/

import * as express from "express";
import * as Promise from "bluebird";

import * as interfaces from "../../../../interfaces";
import * as eventManagerInterfaces from "../../../../interfaces/setup-config/event-manager";
import * as adminInterfaces from "../../../../interfaces/components/call-263/admin";
import * as storageManagerInterfaces from "../../../../interfaces/utilities/storage-manager";
import * as sharedLogicInterfaces from "../../../../interfaces/utilities/shared-logic";

import emitterFactory from "./event-emitter";

/******************************************************************************/

class AirtimeTransfers implements adminInterfaces.AirtimeTransfers {

  constructor(
    private readonly emitter: adminInterfaces.airtimeTransfers.Emitter,
    private readonly checkThrow: sharedLogicInterfaces.moders.CheckThrow,

    private readonly getAirtimeTransfers: storageManagerInterfaces.call263.airtimeTransfer.Get,
    private readonly getAirtimeTransferById: storageManagerInterfaces.call263.airtimeTransfer.GetById,
    private readonly addNewAirtimeTransfer: storageManagerInterfaces.call263.airtimeTransfer.Add,
    private readonly updateAirtimeTransferById: storageManagerInterfaces.call263.airtimeTransfer.UpdateById,
    private readonly removeAirtimeTransferById: storageManagerInterfaces.call263.airtimeTransfer.RemoveById
  ) { }

  get = ( filtrationCriteria: storageManagerInterfaces.call263.airtimeTransfer.FiltrationCriteria, sortCriteria: storageManagerInterfaces.call263.airtimeTransfer.SortCriteria, limit: number, forceThrow?: boolean ): Promise<interfaces.dataModel.call263.airtimeTransfer.Super[]> => {

  }

  getOne = ( airtimeTransferId: string, forceThrow?: boolean ): Promise<interfaces.dataModel.call263.airtimeTransfer.Super> => {
  };

  makeTransfer = ( airtimeTransferId: string, amount: number, forceThrow?: boolean ): Promise<interfaces.dataModel.call263.airtimeTransfer.Super> => {

  }

  recordTransfer = ( airtimeTransfer: storageManagerInterfaces.call263.airtimeTransfer.AddDetails, forceThrow?: boolean ): Promise<interfaces.dataModel.call263.airtimeTransfer.Super> => {

  }

  update = ( airtimeTransferId: string, updates: storageManagerInterfaces.call263.airtimeTransfer.UpdateDetails, forceThrow?: boolean ): Promise<interfaces.dataModel.call263.airtimeTransfer.Super[]> => {

  }

  remove = ( airtimeTransferId: string, forceThrow?: boolean ): Promise<void> => {}
  
}

/******************************************************************************/

export default ( params: {
  emitEvent: eventManagerInterfaces.Emit,
  checkThrow: sharedLogicInterfaces.moders.CheckThrow,

  getAirtimeTransfers: storageManagerInterfaces.call263.airtimeTransfer.Get,
  getAirtimeTransferById: storageManagerInterfaces.call263.airtimeTransfer.GetById,
  addNewAirtimeTransfer: storageManagerInterfaces.call263.airtimeTransfer.Add,
  updateAirtimeTransferById: storageManagerInterfaces.call263.airtimeTransfer.UpdateById,
  removeAirtimeTransferById: storageManagerInterfaces.call263.airtimeTransfer.RemoveById
} ): adminInterfaces.AirtimeTransfers => {
  return new AirtimeTransfers(
    emitterFactory( params.emitEvent ),
    params.checkThrow,

    params.getAirtimeTransfers,
    params.getAirtimeTransferById,
    params.addNewAirtimeTransfer,
    params.updateAirtimeTransferById,
    params.removeAirtimeTransferById
  );
}

/******************************************************************************/