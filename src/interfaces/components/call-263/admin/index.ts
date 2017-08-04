/******************************************************************************/

import * as airtimeTransfers from "./airtime-transfers/index";
import * as channels from "./channels/index";
import * as payments from "./payments/index";

import * as sharedCode from "./shared-code/index";

import * as interfaces from "../../../../interfaces/index";

/******************************************************************************/

export { airtimeTransfers, channels, payments, sharedCode };

/******************************************************************************/

export interface Params {
  airtimeTransfers : AirtimeTransfers;
  channels : Channels;
  payments : Payments;
}

export interface AirtimeTransfers {
  readonly get : airtimeTransfers.Get;
  readonly getOne : airtimeTransfers.GetOne;
}

export interface Channels {
  readonly get : channels.Get;
  readonly getOne : channels.GetOne;
  readonly add : channels.Add;
  readonly update : channels.Update;
  readonly delete : channels.Delete;
}

export interface Payments {
  readonly get : payments.Get;
  readonly getOne : payments.GetOne;
  readonly recordPayment : payments.RecordPayment;
}

export interface SharedCode {}

/******************************************************************************/
