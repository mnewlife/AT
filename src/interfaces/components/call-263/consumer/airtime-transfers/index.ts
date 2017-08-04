/******************************************************************************/

import * as interfaces from "../../../../../interfaces";

/******************************************************************************/

export interface Emitter {
  
}

export interface VerifyAccount {
  ( userId: string, code: string, forceThrow?: boolean ): Promise<void>;
}

/******************************************************************************/