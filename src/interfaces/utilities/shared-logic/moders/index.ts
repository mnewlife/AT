/******************************************************************************/

import * as express from "express";
import * as Promise from "bluebird";

import * as interfaces from "../../../../interfaces/index";

/******************************************************************************/

export interface CheckThrow {
  ( forceThrow: boolean ): Promise<any>;
};

/******************************************************************************/
