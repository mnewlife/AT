module ToastServiceInterfaces {

  /*******************************************/

  export interface Instance {
    showSimple: ShowSimple;
    showWithAction: ShowWithAction;
  }

  /*******************************************/

  export interface ShowSimple {
    ( message: string ): ng.IPromise<void>;
  }

  export interface ShowWithAction {
    ( message: string, action: string ): ng.IPromise<boolean>;
  }

  /*******************************************/

}
