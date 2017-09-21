module DataModel {

  /*******************************************/

  export interface DataModel {
    id: string;
    createdAt: Date;
    updatedAt: Date;
  }

  export interface Happening {
    context: string;
    identifier: string;
    tags: string[];
    data: any;
  }

  export type AppName = "core" | "call263" | "grocRound" | "powertel" | "routers";

  /******************************************************************************/

}
