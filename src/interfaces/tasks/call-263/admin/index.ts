/******************************************************************************/

import * as channels from "./channels";
import * as airtimePayments from "./airtime-payments";
import * as airtimeTransfers from "./airtime-transfers";

/******************************************************************************/

export { channels, airtimePayments, airtimeTransfers };

/******************************************************************************/

export interface Channels {
  readonly get: channels.Get;
  readonly getOne: channels.GetOne;
  readonly add: channels.Add;
  readonly addOne: channels.AddOne;
  readonly update: channels.Update;
  readonly remove: channels.Remove;
}

export interface AirtimePayments {
  readonly get: airtimePayments.Get;
  readonly getOne: airtimePayments.GetOne;
  readonly add: airtimePayments.Add;
  readonly update: airtimePayments.Update;
  readonly remove: airtimePayments.Remove;
}

export interface AirtimeTransfers {
  readonly get: airtimeTransfers.Get;
  readonly getOne: airtimeTransfers.GetOne;
  readonly makeTransfer: airtimeTransfers.MakeTransfer;
  readonly recordTransfer: airtimeTransfers.RecordTransfer;
  readonly update: airtimeTransfers.Update;
  readonly remove: airtimeTransfers.Remove;
}

/******************************************************************************/
