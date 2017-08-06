/******************************************************************************/

import * as developer from "./developer";
import * as admin from "./admin";
import * as consumer from "./consumer";

/******************************************************************************/

export { developer, admin, consumer };

/******************************************************************************/

export interface Developer { }

export interface Admin {
  readonly channels: admin.Channels;
  readonly airtimePayments: admin.AirtimePayments;
  readonly airtimeTransfers: admin.AirtimeTransfers;
}

export interface Consumer {
  readonly channel: consumer.Channel;
  readonly airtimePayments: consumer.AirtimePayments;
  readonly airtimeTransfers: consumer.AirtimeTransfers;
}

/******************************************************************************/
