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

class AirtimePayments implements adminInterfaces.AirtimePayments {

  constructor(
    private readonly emitter: adminInterfaces.airtimePayments.Emitter,
    private readonly checkThrow: sharedLogicInterfaces.moders.CheckThrow,

    private readonly getAirtimePayments: storageManagerInterfaces.call263.airtimePayment.Get,
    private readonly getAirtimePaymentById: storageManagerInterfaces.call263.airtimePayment.GetById,
    private readonly addNewAirtimePayment: storageManagerInterfaces.call263.airtimePayment.Add,
    private readonly updateAirtimePaymentById: storageManagerInterfaces.call263.airtimePayment.UpdateById,
    private readonly removeAirtimePaymentById: storageManagerInterfaces.call263.airtimePayment.RemoveById
  ) { }

  get = ( filtrationCriteria: storageManagerInterfaces.call263.airtimePayment.FiltrationCriteria, sortCriteria: storageManagerInterfaces.call263.airtimePayment.SortCriteria, limit: number, forceThrow?: boolean ): Promise<interfaces.dataModel.call263.airtimePayment.Super[]> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.getAirtimePayments( filtrationCriteria, sortCriteria, limit );

      } )
      .catch(( reason: any ) => {

        return Promise.reject( {
          identifier: "GetPaymentsFailed",
          data: {
            reason: reason
          }
        } );

      } );

  }

  getOne = ( airtimePaymentId: string, forceThrow?: boolean ): Promise<interfaces.dataModel.call263.airtimePayment.Super> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.getAirtimePaymentById( airtimePaymentId );

      } )
      .catch(( reason: any ) => {

        return Promise.reject( {
          identifier: "GetPaymentFailed",
          data: {
            reason: reason
          }
        } );

      } );

  };

  add = ( airtimePayment: storageManagerInterfaces.call263.airtimePayment.AddDetails, forceThrow?: boolean ): Promise<interfaces.dataModel.call263.airtimePayment.Super> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.add( airtimePayment );

      } )
      .catch(( reason: any ) => {

        return Promise.reject( {
          identifier: "GetPaymentFailed",
          data: {
            reason: reason
          }
        } );

      } );

  }

  update = ( airtimePaymentId: string, updates: storageManagerInterfaces.call263.airtimePayment.UpdateDetails, forceThrow?: boolean ): Promise<interfaces.dataModel.call263.airtimePayment.Super> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.updateAirtimePaymentById( airtimePaymentId, updates );

      } )
      .catch(( reason: any ) => {

        return Promise.reject( {
          identifier: "GetPaymentFailed",
          data: {
            reason: reason
          }
        } );

      } );

  }

  remove = ( airtimePaymentId: string, forceThrow?: boolean ): Promise<void> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.removeAirtimePaymentById( airtimePaymentId );

      } )
      .catch(( reason: any ) => {

        return Promise.reject( {
          identifier: "GetPaymentFailed",
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

  getAirtimePayments: storageManagerInterfaces.call263.airtimePayment.Get,
  getAirtimePaymentById: storageManagerInterfaces.call263.airtimePayment.GetById,
  addNewAirtimePayments: storageManagerInterfaces.call263.airtimePayment.AddBatch,
  addNewAirtimePayment: storageManagerInterfaces.call263.airtimePayment.Add,
  updateAirtimePaymentById: storageManagerInterfaces.call263.airtimePayment.UpdateById,
  removeAirtimePaymentById: storageManagerInterfaces.call263.airtimePayment.RemoveById
} ): adminInterfaces.AirtimePayments => {
  return new AirtimePayments(
    emitterFactory( params.emitEvent ),
    params.checkThrow,

    params.getAirtimePayments,
    params.getAirtimePaymentById,
    params.addNewAirtimePayment,
    params.updateAirtimePaymentById,
    params.removeAirtimePaymentById
  );
}

/******************************************************************************/