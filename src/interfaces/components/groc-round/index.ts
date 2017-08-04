/******************************************************************************/

import * as developer from "./developer";
import * as admin from "./admin";
import * as logistics from "./logistics";
import * as salesRep from "./sales-rep";

/******************************************************************************/

export { developer, admin, logistics, salesRep };

/******************************************************************************/

export interface Developer {
  readonly registration: developer.Registration;
  readonly auth: developer.Auth;
  readonly profile: developer.Profile;
  readonly admins: developer.Admins;
}

export interface Admin {
  readonly registration: admin.Registration;
  readonly auth: admin.Auth;
  readonly profile: admin.Profile;
  readonly admins: admin.Admins;
  readonly logistics: admin.Logistics;
  readonly salesRep: admin.SalesReps;
}

export interface Logistics {
  readonly registration: logistics.Registration;
  readonly auth: logistics.Auth;
  readonly profile: logistics.Profile;
}

export interface SalesRep {
  readonly registration: salesRep.Registration;
  readonly auth: salesRep.Auth;
  readonly profile: salesRep.Profile;
}

/******************************************************************************/
