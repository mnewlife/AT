/******************************************************************************/

import * as eventListener from "../../../event-listener/interfaces";

import * as auth from "./auth/interfaces";
import * as profile from "./profile/interfaces";
import * as registration from "./registration/interfaces";

/******************************************************************************/

export interface Instance {
  readonly auth: auth.Instance;
  readonly profile: profile.Instance;
  readonly registration: registration.Instance;
}

/******************************************************************************/