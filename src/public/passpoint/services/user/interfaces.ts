module UserServiceInterfaces {
  
    /*******************************************/
  
    export interface Instance {
      signIn: SignIn;
      signUp: SignUp;
    }
  
    /*******************************************/

    export interface SignIn {
      ( emailAddress: string, password: string ): ng.IPromise<void>;
    }
    
    export interface SignUp {
      ( emailAddress: string, password: string ): ng.IPromise<void>;
    }

    /*******************************************/
  
  }
  