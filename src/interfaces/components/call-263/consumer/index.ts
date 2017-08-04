/******************************************************************************/

import * as interfaces from "../../../../interfaces/index";

import * as airtimeTransfers from "./airtime-transfers/index";
import * as channel from "./channel/index";
import * as payments from "./payments/index";

import * as sharedCode from "./shared-code/index";

/******************************************************************************/

export { airtimeTransfers, channel, payments, sharedCode };

/******************************************************************************/

export interface Params {
  airtimeTransfers: AirtimeTransfers;
  channel: Channel;
  payments: Payments;
}

export interface AirtimeTransfers {
  readonly get: airtimeTransfers.Get;
  readonly getOne: airtimeTransfers.GetOne;
}

export interface Channel {
  readonly getDetails: channel.GetDetails;
  readonly getBalances: channel.GetBalances;
}

export interface Payments {
  readonly get : payments.Get;
  readonly getOne : payments.GetOne;
  readonly makePayment : payments.MakePayment;
}

export interface SharedCode {}

/******************************************************************************/
