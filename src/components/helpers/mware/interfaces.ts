/******************************************************************************/

import * as root from "../../../interfaces";
import * as components from "../../../components/interfaces";

/******************************************************************************/

export interface Constructor {
  new(): ClassInstance;
}

export interface ClassInstance {
  readonly retrieveMwareLists: RetrieveMwareLists;
}

export interface RetrieveMwareLists {
  ( mware: root.AppMiddleware, subject: string, subjectModule: components.MiddlewareBorn ): void;
}

/******************************************************************************/