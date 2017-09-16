module DialogServiceInterfaces {

  /*******************************************/

  export interface Instance {
    showAlert: ShowAlert;
    showConfirm: ShowConfirm;
  }

  /*******************************************/

  export interface ShowAlert {
    ( title: string, textContent: string, ev: MouseEvent, okText?: string ): ng.IPromise<void>;
  }

  export interface ShowConfirm {
    ( title: string, textContent: string, ev: MouseEvent, okText?: string, cancelText?: string ): ng.IPromise<boolean>;
  }

  /*******************************************/

}
