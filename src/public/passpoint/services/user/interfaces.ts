module UserServiceInterfaces {
  
    /*******************************************/
  
    export interface Instance {
      signIn: SignIn;
      signUp: SignUp;
      requestResetCode: RequestResetCode
    }
  
    /*******************************************/

    export interface SignIn {
      ( emailAddress: string, password: string ): ng.IPromise<void>;
    }
    
    export interface SignUp {
      ( emailAddress: string, password: string ): ng.IPromise<void>;
    }

    export interface RequestResetCode {
      ( emailAddress: string ): ng.IPromise<void>;
    }

    /*******************************************/
  
  }
  