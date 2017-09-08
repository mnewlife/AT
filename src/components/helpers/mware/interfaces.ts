/******************************************************************************/

import * as root from "../../../interfaces";
import * as components from "../../../components/interfaces";

/******************************************************************************/

export interface Constructor {
  new(): Instance;
}

export interface Instance {
  readonly retrieveMwareLists: RetrieveMwareLists;
}

export interface RetrieveMwareLists {
  ( mware: root.AppMiddleware, subject: string, subjectModule: components.MiddlewareBorn ): void;
}

/******************************************************************************/