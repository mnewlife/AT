/******************************************************************************/

import * as channel from "./channel";
import * as airtimePayments from "./airtime-payments";
import * as airtimeTransfers from "./airtime-transfers";

/******************************************************************************/

export { channel, airtimePayments, airtimeTransfers };

/******************************************************************************/

export interface Channel {
  readonly getDetails: channel.GetDetails;
  readonly getBalances: channel.GetBalances;
}

export interface AirtimePayments {
  readonly get: airtimePayments.Get;
  readonly getOne: airtimePayments.GetOne;
  readonly makePayment: airtimePayments.MakePayment;
  readonly recordPayment: airtimePayments.RecordPayment;
}

export interface AirtimeTransfers {
  readonly get: airtimeTransfers.Get;
  readonly getOne: airtimeTransfers.GetOne;
}

/******************************************************************************/
