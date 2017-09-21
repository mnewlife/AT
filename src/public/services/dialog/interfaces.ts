module DialogServiceInterfaces {

  /*******************************************/

  export interface Instance {
    showAlert: ShowAlert;
    showConfirm: ShowConfirm;
    showPrompt: ShowPrompt;
  }

  /*******************************************/

  export interface ShowAlert {
    ( title: string, textContent: string, ev?: MouseEvent, okText?: string ): ng.IPromise<void>;
  }

  export interface ShowConfirm {
    ( title: string, textContent: string, ev?: MouseEvent, okText?: string, cancelText?: string ): ng.IPromise<boolean>;
  }

  export interface ShowPrompt {
    ( title: string, textContext: string, ev?: MouseEvent, placeholder?: string, okText?: string, cancelText?: string ): ng.IPromise<string>;
  }

  /*******************************************/

}
