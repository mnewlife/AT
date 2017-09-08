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

class AirtimePayments implements admin.AirtimePayments {

  constructor(
    private readonly events: admin.airtimePayments.Events,
    private readonly checkThrow: sharedLogic.moders.CheckThrow,

    private readonly getAirtimePayments: storage.call263.airtimePayment.Get,
    private readonly getAirtimePaymentById: storage.call263.airtimePayment.GetById,
    private readonly addNewAirtimePayment: storage.call263.airtimePayment.Add,
    private readonly updateAirtimePaymentById: storage.call263.airtimePayment.UpdateById,
    private readonly removeAirtimePaymentById: storage.call263.airtimePayment.RemoveById
  ) { }

  get = ( filtrationCriteria: storage.call263.airtimePayment.FiltrationCriteria, sortCriteria: storage.call263.airtimePayment.SortCriteria, limit: number, forceThrow?: boolean ): Promise<dataModel.call263.airtimePayment.Super[]> => {

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

  getOne = ( airtimePaymentId: string, forceThrow?: boolean ): Promise<dataModel.call263.airtimePayment.Super> => {

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

  add = ( airtimePayment: storage.call263.airtimePayment.AddDetails, forceThrow?: boolean ): Promise<dataModel.call263.airtimePayment.Super> => {

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

  update = ( airtimePaymentId: string, updates: storage.call263.airtimePayment.UpdateDetails, forceThrow?: boolean ): Promise<dataModel.call263.airtimePayment.Super> => {

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
  emitEvent: eventListener.Emit,
  checkThrow: sharedLogic.moders.CheckThrow,

  getAirtimePayments: storage.call263.airtimePayment.Get,
  getAirtimePaymentById: storage.call263.airtimePayment.GetById,
  addNewAirtimePayments: storage.call263.airtimePayment.AddBatch,
  addNewAirtimePayment: storage.call263.airtimePayment.Add,
  updateAirtimePaymentById: storage.call263.airtimePayment.UpdateById,
  removeAirtimePaymentById: storage.call263.airtimePayment.RemoveById
} ): admin.AirtimePayments => {
  return new AirtimePayments(
    eventsFactory( params.emitEvent ),
    params.checkThrow,

    params.getAirtimePayments,
    params.getAirtimePaymentById,
    params.addNewAirtimePayment,
    params.updateAirtimePaymentById,
    params.removeAirtimePaymentById
  );
}

/******************************************************************************/