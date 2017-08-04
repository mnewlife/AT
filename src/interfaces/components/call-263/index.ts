/******************************************************************************/

import * as interfaces from "../../../interfaces/index";

import * as developer from "./developer/index";
import * as admin from "./admin/index";
import * as consumer from "./consumer/index";
import * as sharedCode from "./shared-code/index";

/******************************************************************************/

export { developer, admin, consumer, sharedCode };

/******************************************************************************/

export interface Params {
  developer: Developer;
  admin: Admin;
  consumer: Consumer;
}

export interface Developer {
  readonly airtimeTransfers: developer.AirtimeTransfers;
  readonly channels: developer.Channels;
  readonly payments: developer.Payments;
}

export interface Admin {
  readonly airtimeTransfers: admin.AirtimeTransfers;
  readonly channels: admin.Channels;
  readonly payments: admin.Payments;
}

export interface Consumer {
  readonly airtimeTransfers: consumer.AirtimeTransfers;
  readonly channel: consumer.Channel;
  readonly payments: consumer.Payments;
}

export interface SharedCode {}

/******************************************************************************/
