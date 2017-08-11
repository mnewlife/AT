/******************************************************************************/

import * as express from "express";
import * as Promise from "bluebird";

import * as interfaces from "../../../../interfaces";
import * as eventManagerInterfaces from "../../../../interfaces/setup-config/event-manager";
import * as adminInterfaces from "../../../../interfaces/tasks/call-263/admin";
import * as storageInterfaces from "../../../../interfaces/components/storage";
import * as sharedLogicInterfaces from "../../../../interfaces/components/shared-logic";

import emitterFactory from "./event-emitter";

/******************************************************************************/

class AirtimePayments implements adminInterfaces.AirtimePayments {

  constructor(
    private readonly emitter: adminInterfaces.airtimePayments.Emitter,
    private readonly checkThrow: sharedLogicInterfaces.moders.CheckThrow,

    private readonly getAirtimePayments: storageInterfaces.call263.airtimePayment.Get,
    private readonly getAirtimePaymentById: storageInterfaces.call263.airtimePayment.GetById,
    private readonly addNewAirtimePayment: storageInterfaces.call263.airtimePayment.Add,
    private readonly updateAirtimePaymentById: storageInterfaces.call263.airtimePayment.UpdateById,
    private readonly removeAirtimePaymentById: storageInterfaces.call263.airtimePayment.RemoveById
  ) { }

  get = ( filtrationCriteria: storageInterfaces.call263.airtimePayment.FiltrationCriteria, sortCriteria: storageInterfaces.call263.airtimePayment.SortCriteria, limit: number, forceThrow?: boolean ): Promise<interfaces.dataModel.call263.airtimePayment.Super[]> => {

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

  add = ( airtimePayment: storageInterfaces.call263.airtimePayment.AddDetails, forceThrow?: boolean ): Promise<interfaces.dataModel.call263.airtimePayment.Super> => {

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

  update = ( airtimePaymentId: string, updates: storageInterfaces.call263.airtimePayment.UpdateDetails, forceThrow?: boolean ): Promise<interfaces.dataModel.call263.airtimePayment.Super> => {

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

  getAirtimePayments: storageInterfaces.call263.airtimePayment.Get,
  getAirtimePaymentById: storageInterfaces.call263.airtimePayment.GetById,
  addNewAirtimePayments: storageInterfaces.call263.airtimePayment.AddBatch,
  addNewAirtimePayment: storageInterfaces.call263.airtimePayment.Add,
  updateAirtimePaymentById: storageInterfaces.call263.airtimePayment.UpdateById,
  removeAirtimePaymentById: storageInterfaces.call263.airtimePayment.RemoveById
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