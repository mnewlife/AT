/******************************************************************************/

import * as developer from "./developer";
import * as admin from "./admin";
import * as consumer from "./consumer";

/******************************************************************************/

export { developer, admin, consumer };

/******************************************************************************/

export interface Developer {
  readonly registration: developer.Registration;
  readonly auth: developer.Auth;
  readonly profile: developer.Profile;
  readonly admins: developer.Admins;
}

export interface Admin {
  readonly channels: admin.Channels;
  readonly airtimePayments: admin.AirtimePayments;
  readonly airtimeTransfers: admin.AirtimeTransfers;
}

export interface SalesRep {
  readonly registration: consumer.Registration;
  readonly auth: consumer.Auth;
  readonly profile: consumer.Profile;
}

/******************************************************************************/
