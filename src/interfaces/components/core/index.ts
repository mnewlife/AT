/******************************************************************************/

import * as developer from "./developer";
import * as admin from "./admin";
import * as consumer from "./consumer";

/******************************************************************************/

export { developer, admin, consumer };

/******************************************************************************/

export interface Developer {
  readonly auth: developer.Auth;
  readonly profile: developer.Profile;
  readonly registration: developer.Registration;
}

export interface Admin {
  readonly auth: admin.Auth;
  readonly profile: admin.Profile;
  readonly registration: admin.Registration;
}

export interface Consumer {
  readonly auth: consumer.Auth;
  readonly profile: consumer.Profile;
  readonly registration: consumer.Registration;
}

/******************************************************************************/
