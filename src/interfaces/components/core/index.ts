/******************************************************************************/

import * as components from "../../../interfaces/components/index";

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
  readonly registration : developer.Registration;
  readonly auth : developer.Auth;
  readonly profile : developer.Profile;
}

export interface Admin {
  readonly registration: admin.Registration;
  readonly auth: admin.Auth;
  readonly profile: admin.Profile;
}

export interface Consumer {
  readonly registration: consumer.Registration;
  readonly auth: consumer.Auth;
  readonly profile: consumer.Profile;
}

export interface SharedCode {
  readonly verification: sharedCode.Verification;
}

/******************************************************************************/
