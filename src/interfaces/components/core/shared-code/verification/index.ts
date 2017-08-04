/******************************************************************************/

export interface GenerateCode {
  (): Promise<string>;
}

export interface VerifyAccount {
  ( userId: string, code: string ): Promise<void>;
}

/******************************************************************************/
