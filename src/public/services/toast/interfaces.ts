/*******************************************************************/

export interface Instance {
  showSimple: ShowSimple;
  showWithAction: ShowWithAction;
}

/*******************************************************************/

export interface ShowSimple {
  ( message: string ): Promise<void>;
}

export interface ShowWithAction {
  ( message: string, action: string ): Promise<boolean>;
}

/*******************************************************************/