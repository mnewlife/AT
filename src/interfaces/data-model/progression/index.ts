/******************************************************************************/

import * as mongoose from "mongoose";
import * as interfaces from "../../../interfaces";

/******************************************************************************/

export interface Super extends Base {
  userId: string;
}

export interface Base extends interfaces.dataModel.DataModel {
  userId: any;
  subject: ProgressionSubject;
  timeMeasure: ProgressionTimeMeasure;
  amounts: ProgressionAmounts;
}

export type ProgressionSubject = "signups" | "orders";
export interface ProgressionTimeMeasure {
  identifier: string;
  label: string;
}
export interface ProgressionAmounts {
  additions: number;
  subtractions: number;
  endAmount: number;
}

/******************************************************************************/
